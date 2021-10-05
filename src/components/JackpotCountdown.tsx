import { useState, useEffect } from "react";
import Countdown from 'react-countdown';
import { Button, Text, Flex, Box } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { 
    useGetTimeLeft,
    useContractMethod,
    useTotalTime,
    useWinner,
    useWhoWon
} from "../hooks";


export const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})


export default function JackpotCountdown() {
    const timeLeft = useGetTimeLeft();
    const totalTime = useTotalTime();
    const winner = useWinner();
    const whoWon = useWhoWon();
    const { send: jackpotPayout } = useContractMethod("jackpotPayout");
    const [timeLeftState, setTimeLeftState] = useState(timeLeft);
    const [totalTimeState, setTotalTimeState] = useState(totalTime);
    const [userWhoWon, setUserWhoWon] = useState(String(whoWon));
    const [startTime, setStartTime] = useState(Date.now())

    // console.log("totalTime:")
    // console.log(totalTime);
    // <Countdown date={Date.now() + timeLeft*1000} />

    useEffect(() => {
        setTimeLeftState(timeLeft ? timeLeft.toNumber(): -1)
        // console.log("timeLeftState:", timeLeftState);
        setTotalTimeState(totalTime ? totalTime.toNumber(): 0)
        // console.log("totalTimeState:", totalTimeState);
        setUserWhoWon(whoWon ? whoWon : '');
        // console.log("userWhoWon: ", whoWon);
        setStartTime(Date.now())
        },[timeLeft]);

    function payWinner() {
        if (totalTime.toNumber()*1000 <= Date.now()) {
            console.log("WINNER!!!!!!");
            console.log(totalTime);
            jackpotPayout();
        } else {
            console.log("game is still in play");
            console.log(totalTime);
        }
    }

    if (timeLeft === undefined) {
        console.log("TIMER IS UNDEFINED!");
        return(
            <div>
                game not started
            </div>   
        )
    } else if (timeLeft.toNumber() <= 0 && userWhoWon === '0x0000000000000000000000000000000000000000') {
        console.log("TIMER IS AT ZERO!", timeLeft.toNumber());
        return (
            <Flex direction="column" align="center" mt="4">
                <Text color="white" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    {winner}
                </Text>
                <Text color="white" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    won!
                </Text>
            </Flex>
        )
    } else if (timeLeft.toNumber() <= 0 && userWhoWon !== '0x0000000000000000000000000000000000000000') {
        return (
            <Flex direction="column" align="center" mt="4">
                <Text color="white" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    {winner}
                </Text>
                <Text color="white" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    You won!
                </Text>
                <Box align="center">
                    <Button 
                        colorScheme="purple" 
                        size="lg"
                        onClick={payWinner}>
                            Claim Prize!
                    </Button>
                    <Text fontSize="16px">This button sends the eth the {winner}'s address.</Text>
                </Box>  
            </Flex>
        )
    } else {
        console.log("SECONDS REMAINING: ", timeLeft.toNumber());
        console.log("HH:MM:SS REMAINING:" , new Date(timeLeft.toNumber() * 1000).toISOString().substr(11, 8))
        return (
            <Flex direction="column" align="center" mt="4">
                <Text color="white" as="cite" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    {winner}
                </Text>
                <Text color="white" as="cite" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    is winning!
                </Text>
                <span>
                    {/* <Countdown date={Date.now() + timeLeft*1000} /> */}
                    <Countdown date={startTime + timeLeft*1000} />

                </span>
            </Flex>
        )
    }
}

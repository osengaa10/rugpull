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
            jackpotPayout();
        } else {
        }
    }

    if (timeLeft === undefined) {
        return(
            
        <Flex direction="column" align="center" mt="4">
            <Text color="white" as="cite" fontSize={{ base: "15px", md: "32px", lg: "40px" }}>
                Connect to wallet to Polygon network and
            </Text>
            <Text color="white" as="cite" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                see who is pulling the rug! {winner}
            </Text>
            
        </Flex>
        )
    } else if (timeLeft.toNumber() <= 0 && userWhoWon === '0x0000000000000000000000000000000000000000') {
        // console.log("TIMER IS AT ZERO!", timeLeft.toNumber());
        return (
            <Flex direction="column" align="center" mt="4">
                <Text color="white" fontSize={{ base: "15px", md: "32px", lg: "40px" }}>
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
                <Text color="white" fontSize={{ base: "15px", md: "32px", lg: "40px" }}>
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
                    <Text fontSize="15px">This button sends the eth the {winner}'s address.</Text>
                </Box>  
            </Flex>
        )
    } else {
        console.log("HH:MM:SS REMAINING:" , new Date(timeLeft.toNumber() * 1000).toISOString().substr(11, 8))
        return (
            <Flex direction="column" align="center" mt="4">
                <Text color="white" as="cite" fontSize={{ base: "15px", md: "32px", lg: "40px" }}>
                    {winner}
                </Text>
                <Text color="white" as="cite" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    is pulling the rug!
                </Text>
                <span>
                    <Countdown date={startTime + timeLeft*1000} />
                </span>
            </Flex>
        )
    }
}

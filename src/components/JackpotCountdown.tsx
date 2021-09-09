import { useState, useEffect } from "react";
import Countdown from 'react-countdown';
import { Button, Text, Flex, Box } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { 
    useGetTimeLeft,
    useContractMethod,
    useTotalTime,
    useWinner
} from "../hooks";
import { render } from "@testing-library/react";


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
    const { state: jackpotPayoutState, send: jackpotPayout } = useContractMethod("jackpotPayout");
    const [timeLeftState, setTimeLeftState] = useState(timeLeft);
    const [totalTimeState, setTotalTimeState] = useState(totalTime);

    // console.log("totalTime:")
    // console.log(totalTime);
    // <Countdown date={Date.now() + timeLeft*1000} />

    useEffect(() => {
        setTimeLeftState(timeLeft ? timeLeft.toNumber(): -1)
        console.log("timeLeftState:", timeLeftState);
        setTotalTimeState(totalTime ? totalTime.toNumber(): 0)
        console.log("totalTimeState:", totalTimeState);
      });

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
    } else if (timeLeft.toNumber() <= 0) {
        console.log("TIMER IS AT ZERO!", timeLeft.toNumber());
        return (
            <Flex direction="column" align="center" mt="4">
                <Text color="white" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    {winner}
                </Text>
                <Text color="white" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    won!
                </Text>
                <Box align="center">
                    <Button 
                        colorScheme="purple" 
                        size="lg"
                        onClick={payWinner}>
                            payout winner
                    </Button>
                    <Text fontSize="16px">This button sends the eth the {winner}'s address.</Text>
                </Box>  
            </Flex>
        )
    } else {
        console.log("TIMER GREATER THAN ZERO!", timeLeft.toNumber());
        console.log("totalTime: ", totalTime.toNumber());
        return (
            <Flex direction="column" align="center" mt="4">
                <Text color="white" as="cite" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    {winner}
                </Text>
                <Text color="white" as="cite" fontSize={{ base: "24px", md: "40px", lg: "40px" }}>
                    is winning!
                </Text>
                <span>
                    {/* <Countdown date={totalTime ? totalTime.toNumber()*1000 : 0} /> <br/> */}
                    <Countdown date={Date.now() + timeLeft*1000} />
                </span>
            </Flex>
        )
    }
}

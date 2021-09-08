import { useState, useEffect } from "react";
import Countdown from 'react-countdown';
import { Button } from "@chakra-ui/react";
import { 
    useGetTimeLeft,
    useContractMethod,
    useTotalTime
} from "../hooks";
import { render } from "@testing-library/react";


export default function JackpotCountdown() {
    const timeLeft = useGetTimeLeft();
    const totalTime = useTotalTime();
    const { state: jackpotPayoutState, send: jackpotPayout } = useContractMethod("jackpotPayout");
    const [timeLeftState, setTimeLeftState] = useState(timeLeft);

    // console.log("totalTime:")
    // console.log(totalTime);
    // <Countdown date={Date.now() + timeLeft*1000} />

    useEffect(() => {
        setTimeLeftState(timeLeft ? timeLeft.toNumber(): -1)
        console.log("timeLeftState:", timeLeftState);
      }, [timeLeft]);

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
            <div>
                <Button 
                    colorScheme="purple" 
                    size="lg"
                    onClick={payWinner}>
                        payout winner
                </Button>
            </div>  
        )
    } else {
        console.log("TIMER GREATER THAN ZERO!", timeLeft.toNumber());
        return (

            // <span>
                <Countdown date={totalTime ? totalTime.toNumber()*1000 : 0} />
            // </span>
        )
    }
}

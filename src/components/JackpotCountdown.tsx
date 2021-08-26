import { useState, useEffect } from "react";
import Countdown from 'react-countdown';
import { 
    useGetTimeLeft,
    useTotalTime
} from "../hooks";


export default function JackpotCountdown() {
    const timeLeft = useGetTimeLeft();
    const totalTime = useTotalTime();
            // <Countdown date={Date.now() + timeLeft*1000} />

    return(
        <Countdown date={totalTime ? totalTime.toNumber()*1000 : 0} />
    )
}
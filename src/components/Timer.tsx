import { useState, useEffect } from "react";

type Props = {
    seconds: any;
  };

function secondsToDhms(seconds: number) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  
  var dDisplay = "0" + d + ":";
  var hDisplay = h + ":";
  var mDisplay = m + ":";
  var sDisplay = s;
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
  
const Timer = ({ seconds }: Props) => {
    // initialize timeRemaining with the seconds prop
    const [timeRemaining, setTimeRemaining] = useState(seconds);
    console.log("seconds");
    console.log(seconds);
    
    
    useEffect(() => {
      // exit early when we reach 0
      if (!timeRemaining) return;
  
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
  
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeRemaining as a dependency to re-rerun the effect
      // when we update it
    }, [timeRemaining]);
    return (
      <div>
        {timeRemaining}
      </div>
    );
  };

  export default Timer;
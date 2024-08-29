import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Greeting from "./Greeting";

function getCurrentTime() {
    let date = new Date();
    return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
    };
}

function formatTime(time, showSeconds) {
    let hours = time.hours;
    let minutes = time.minutes;
    let seconds = time.seconds;

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (showSeconds) {
        return `${hours}:${minutes}:${seconds}`;
    } else {
        return `${hours}:${minutes}`;
    }
}

function Clocks() {
    let [currentTime, setCurrentTime] = useState("...");

    const settings = useSelector((state) => state.settings.settings);

    useEffect(() => {
        setTime();
        let timeInterval = setInterval(setTime, 1000);
        return () => clearInterval(timeInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings]);

    const setTime = () => {
        let time = getCurrentTime();
        let timeFormatted = formatTime(time, settings.showSecondsInClocks);
        setCurrentTime(timeFormatted);
    };

    return (
        <div className="clocks">
            <Greeting time={getCurrentTime().hours}/>
            <h3 className="time">{currentTime}</h3>
        </div>
    );
}

export default Clocks;

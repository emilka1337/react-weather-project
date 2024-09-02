import React, { useState, useEffect } from "react";
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
    let [currentTime, setCurrentTime] = useState()

    const showSecondsInClocks = useSelector(
        state => state.settings.showSecondsInClocks
    );

    useEffect(() => {
        setTime();
        let timeInterval = setInterval(setTime, 1000);
        return () => clearInterval(timeInterval);
    }, [showSecondsInClocks]);

    const setTime = () => {
        let time = getCurrentTime();
        let timeFormatted = formatTime(time, showSecondsInClocks);
        setCurrentTime(timeFormatted);
    };

    return (
        <div className="clocks">
            <Greeting time={getCurrentTime().hours}/>
            <h3 className="time">{currentTime}</h3>
        </div>
    );
}

export default React.memo(Clocks);

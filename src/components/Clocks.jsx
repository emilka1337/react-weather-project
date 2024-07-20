import { useState, useEffect, useContext } from "react";
import { SettingsContext } from "./App";

function getCurrentTime() {
    let date = new Date();
    return { hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds() };
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

    return showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
}

function defineGreeting(time) {
    let currentHours = time.hours;

    if (currentHours >= 0 && currentHours < 6) {
        return "Good Night";
    } else if (currentHours >= 6 && currentHours < 12) {
        return "Good Morning";
    } else if (currentHours >= 12 && currentHours < 18) {
        return "Have a nice day";
    } else if (currentHours >= 18 && currentHours <= 23) {
        return "Good Evening";
    }
}

function Clocks() {
    let [currentTime, setCurrentTime] = useState("...");
    let [greeting, setGreeting] = useState("...");
    let [appSettings] = useContext(SettingsContext);

    useEffect(() => {
        setTime();
        let timeInterval = setInterval(setTime, 1000);
        return () => clearInterval(timeInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function setTime() {
        let time = getCurrentTime();
        let timeFormatted = formatTime(time, appSettings.showSecondsInClocks);
        setCurrentTime(timeFormatted);

        let definedGreeting = defineGreeting(time);
        setGreeting(definedGreeting);
    }

    return (
        <div className="clocks">
            <h3 className="greeting">{greeting}</h3>
            <h3 className="time">{currentTime}</h3>
        </div>
    );
}

export default Clocks;

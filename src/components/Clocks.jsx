import { useState } from "react";
import { useEffect } from "react";

function getCurrentTime() {
    let date = new Date();
    return { hours: date.getHours(), minutes: date.getMinutes() };
}

function formatTime(time) {
    let minutes = time.minutes;

    if (minutes < 10) {
        minutes = "0" + minutes
    }

    return `${time.hours}:${minutes}`;
}

function defineGreeting(time) {
    let greetings = [
        "Good Night.",
        "Good Morning!",
        "Have a nice day!",
        "Good evening!",
    ];
    let currentHours = time.hours;

    if (currentHours >= 0 && currentHours < 6) {
        return greetings[0];
    } else if (currentHours >= 6 && currentHours < 12) {
        return greetings[1];
    } else if (currentHours >= 12 && currentHours < 18) {
        return greetings[2];
    } else if (currentHours >= 18 && currentHours <= 23) {
        return greetings[3];
    }
}

function Clocks() {
    let [currentTime, setCurrentTime] = useState("...");
    let [greeting, setGreeting] = useState("...");

    useEffect(() => {
        let timeInterval = setInterval(() => {
            let time = getCurrentTime();
            let timeFormatted = formatTime(time);
            setCurrentTime(timeFormatted);

            let definedGreeting = defineGreeting(time);
            setGreeting(definedGreeting);
        }, 1000);

        return () => clearInterval(timeInterval);
    }, []);

    return (
        <div className="clocks">
            <h3 className="greeting">{greeting}</h3>
            <h3 className="time">{currentTime}</h3>
        </div>
    );
}

export default Clocks;
import { useState } from "react";

function formatTime(time) {
    let minutes = time.minutes;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${time.hours}:${minutes}`;
}

function ForecastCell(props) {
    let [active, setActive] = useState(false);

    let date = new Date(props.timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formattedTime = formatTime({ hours, minutes });

    function clickHandler() {
        props.setSelectedWeather(props.cell);
        setActive(true);
    }

    return (
        <div className="forecast-cell" onClick={clickHandler}>
            <h4 className="time">{`${formattedTime}`}</h4>
            <h3 className="temperature">{props.temperature.toFixed(0)}<span className="degree">°</span></h3>
            <div
                className={
                    active ? "active-indicator show" : "active-indicator"
                }
            ></div>
        </div>
    );
}

export default ForecastCell;

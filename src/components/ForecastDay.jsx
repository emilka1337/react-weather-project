const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatTime(time) {
    let minutes = time.minutes;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${time.hours}:${minutes}`;
}

function ForecastDay(props) {
    let date = new Date(props.timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let weekday = date.getDay();
    let formattedTime = formatTime({hours, minutes});

    return (
        <li>
            <div className={props.className} onClick={() => props.changeSelectedWeather(props.index)}>
                <h4 className="weekday">{`${WEEKDAYS[weekday]} ${formattedTime}`}</h4>
                <h3 className="temperature">{props.temperature.toFixed(0)}°</h3>
                <h4 className="forecast">{props.forecast}</h4>
            </div>
        </li>
    );
}

export default ForecastDay;

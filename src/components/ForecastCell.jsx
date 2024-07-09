function formatTime(time) {
    let minutes = time.minutes;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${time.hours}:${minutes}`;
}

function ForecastCell(props) {
    let date = new Date(props.timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formattedTime = formatTime({hours, minutes});

    return (
        <div className="forecast-cell" onClick={() => props.changeSelectedWeather(props.index)}>
            <h4 className="time">{`${formattedTime}`}</h4>
            <h3 className="temperature">{props.temperature.toFixed(0)}°</h3>
            <h4 className="forecast">{props.forecast}</h4>
        </div>
    );
}

export default ForecastCell;

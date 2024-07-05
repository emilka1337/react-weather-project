function ForecastDay(props) {
    return (
        <li>
            <div className="day">
                <h4 className="weekday">{props.weekday}</h4>
                <h3 className="temperature">{props.temperature}°</h3>
                <h4 className="forecast">{props.forecast}</h4>
            </div>
        </li>
    );
}

export default ForecastDay;
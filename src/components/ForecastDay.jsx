import ForecastCell from "./ForecastCell";

function ForecastDay(props) {
    const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <li className="forecast-day">
            <h4>{WEEKDAYS[props.weekday]}</h4>

            {props.forecastCells.map((item, index) => {
                return (
                    <ForecastCell
                        timestamp={item.dt}
                        temperature={item.main.temp}
                        forecast={item.weather.main}
                        key={index}
                        changeSelectedWeather={props.changeSelectedWeather}
                        index={index}
                    />
                );
            })}
        </li>
    );
}

export default ForecastDay;

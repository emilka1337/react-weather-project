import ForecastCell from "./ForecastCell";

function ForecastDay(props) {
    const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <li className="forecast-day">
            <h4>{WEEKDAYS[props.weekday]}</h4>

            {props.day.map((item, index) => {
                return (
                    <ForecastCell
                        timestamp={item.dt}
                        temperature={item.main.temp}
                        forecast={item.weather.main}
                        cell={item}
                        key={index}
                        setSelectedWeather={props.setSelectedWeather}
                        index={index}
                    />
                );
            })}
        </li>
    );
}

export default ForecastDay;

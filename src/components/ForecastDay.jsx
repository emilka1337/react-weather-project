import ForecastCell from "./ForecastCell";

function ForecastDay(props) {
    const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <li className="forecast-day">
            <div className="weekday">
                <h4>{WEEKDAYS[props.weekday]}</h4>
            </div>

            {props.day.map((item, index) => {   
            
                return (
                    <ForecastCell
                        timestamp={item.dt}
                        cellForecast={item}
                        key={index}
                        index={index}
                    />
                );
            })}
        </li>
    );
}

export default ForecastDay;

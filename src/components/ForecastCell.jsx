import { useContext, useRef } from "react";
import { SetSelectedWeatherContext, SettingsContext } from "./App";

function formatTime(time) {
    let minutes = time.minutes;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${time.hours}:${minutes}`;
}

function ForecastCell(props) {
    let setSelectedWeather = useContext(SetSelectedWeatherContext);
    let activeIndicator = useRef();
    let [appSettings] = useContext(SettingsContext);

    let date = new Date(props.timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formattedTime = formatTime({ hours, minutes });

    function clickHandler() {
        document
            .querySelectorAll(".active-indicator")
            .forEach((item) => item.classList.remove("show"));
        activeIndicator.current.classList.add("show")

        setSelectedWeather(props.cellForecast);
    }

    return (
        <div className="forecast-cell" onClick={clickHandler}>
            <h4 className="time">{`${formattedTime}`}</h4>
            <h3 className="temperature">
                {appSettings.temperatureScale == "celsius"
                    ? props.cellForecast.main.temp.toFixed(0)
                    : (props.cellForecast.main.temp * (9 / 5) + 32).toFixed(0)}
                <span className="degree">°</span>
            </h3>
            <h3 className="main">{props.cellForecast.weather[0].main}</h3>
            <div ref={activeIndicator} className="active-indicator"></div>
        </div>
    );
} 

export default ForecastCell;

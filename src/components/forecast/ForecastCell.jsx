import { useContext, useRef } from "react";
import { SetSelectedWeatherContext, SettingsContext } from "../App";

import { ForecastModeContext } from "./DailyForecast";

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
    let forecastMode = useContext(ForecastModeContext);

    let date = new Date(props.timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formattedTime = formatTime({ hours, minutes });

    function clickHandler() {
        document.querySelectorAll(".active-indicator").forEach((item) => item.classList.remove("show"));
        activeIndicator.current.classList.add("show");

        setSelectedWeather(props.cellForecast);
    }

    return (
        <div className="forecast-cell" onClick={clickHandler}>
            <h4 className="time">{`${formattedTime}`}</h4>
            <div className="temperature-container">
                <h3 className={forecastMode == "temperature" ? "temperature show" : "temperature"}>
                    {appSettings.temperatureScale == "celsius"
                        ? props.cellForecast.main.temp.toFixed(0)
                        : (props.cellForecast.main.temp * (9 / 5) + 32).toFixed(0)}
                    <span className="degree">°</span>
                </h3>
                <h3 className={forecastMode == "temperature" ? "main show" : "main"}>
                    {props.cellForecast.weather[0].main}
                </h3>
            </div>
            <div className="wind-container">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={forecastMode == "wind" ? "wind-direction show" : "wind-direction"}
                    viewBox="0 0 16 16"
                    style={{ transform: `rotate(${props.cellForecast.wind.deg}deg)` }}
                >
                    <path
                        fillRule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                    />
                </svg>
                <h3 className={forecastMode == "wind" ? "wind-speed show" : "wind-speed"}>{props.cellForecast.wind.speed}</h3>
            </div>
            <div ref={activeIndicator} className="active-indicator"></div>
        </div>
    );
}

export default ForecastCell;

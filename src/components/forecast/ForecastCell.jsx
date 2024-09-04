import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedWeather } from "../../store/selectedWeatherSlice";
import TemperatureContainer from "./TemperatureContainer";
import WindContainer from "./WindContainer";

function formatTime(time) {
    let minutes = time.minutes;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${time.hours}:${minutes}`;
}

// function defineWindArrowScale(windSpeed) {
//     if (windSpeed <= 4) {
//         return 0.5;
//     } else if (windSpeed > 4 && windSpeed < 8) {
//         return windSpeed / 8;
//     } else if (windSpeed > 8) {
//         return 1.2;
//     }
// }

function ForecastCell({ timestamp, cellForecast, isDefaultActive }) {
    let activeIndicator = useRef();

    const dispatch = useDispatch();
    const forecastMode = useSelector((state) => state.forecastMode);

    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = formatTime({ hours, minutes });

    const clickHandler = () => {
        document
            .querySelectorAll(".active-indicator")
            .forEach((item) => item.classList.remove("show"));
        activeIndicator.current.classList.add("show");
        dispatch(setSelectedWeather(cellForecast));
    };

    return (
        <div className="forecast-cell" onClick={clickHandler}>
            <h4 className="time">{`${formattedTime}`}</h4>
            {forecastMode === "temperature" && (
                <TemperatureContainer
                    temperature={cellForecast.main.temp}
                    main={cellForecast.weather[0].main}
                />
            )}
            {forecastMode == "wind" && (
                <WindContainer
                    speed={cellForecast.wind.speed}
                    degree={cellForecast.wind.deg}
                />
            )}
            <div
                ref={activeIndicator}
                className={isDefaultActive ? "active-indicator show" : "active-indicator"}
            ></div>
        </div>
    );
}

export default React.memo(ForecastCell);

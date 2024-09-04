import React from "react";
import { useSelector } from "react-redux";

function FeelsLikeField({ temperature }) {
    const selectedWeather = useSelector((state) => state.selectedWeather);
    const temperatureInF = useSelector((state) => state.settings.temperatureInF);

    const getFeelsLikeValue = () => {
        if (temperatureInF === false) {
            return selectedWeather.main.feels_like.toFixed(0);
        } else if (temperatureInF == true) {
            return (selectedWeather.main.feels_like * (9 / 5) + 32).toFixed(0);
        } else {
            return 0;
        }
    };

    return (
        <p className="feels-like">
            {`Feels like: ${getFeelsLikeValue()}`}
            <span className="degree">°</span>
        </p>
    );
}

export default React.memo(FeelsLikeField);

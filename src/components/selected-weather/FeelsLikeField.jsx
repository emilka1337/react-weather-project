import React from "react";
import { useSelector } from "react-redux";

function FeelsLikeField() {
    const selectedFeelsLike = useSelector(
        (state) => state.selectedWeather.selectedFeelsLike
    );
    const temperatureInF = useSelector((state) => state.settings.temperatureInF);

    const getFeelsLikeValue = () => {
        if (temperatureInF === false) {
            return selectedFeelsLike.toFixed(0);
        } else if (temperatureInF == true) {
            return (selectedFeelsLike * (9 / 5) + 32).toFixed(0);
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

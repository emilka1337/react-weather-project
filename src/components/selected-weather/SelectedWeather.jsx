import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { setSelectedWeather } from "../../store/selectedWeatherSlice";
import SelectedTemperature from "./SelectedTemperature";
import FeelsLikeField from "./FeelsLikeField";
import MoreWeatherInfo from "./MoreWeatherInfo";

function SelectedWeather() {
    const dispatch = useDispatch();
    const selectedWeather = useSelector((state) => state.selectedWeather);
    const showFeelsLikeField = useSelector((state) => state.settings.showFeelsLikeField);
    const forecast = useSelector((state) => state.forecast);

    // Setting main displaying weather to current weather
    useEffect(() => {
        if (forecast.list[0]) {
            dispatch(setSelectedWeather(forecast.list[0]));
        }
    }, [forecast]);

    if (selectedWeather) {
        return (
            <div className="selected-weather">
                <SelectedTemperature />
                {showFeelsLikeField && <FeelsLikeField />}
                <MoreWeatherInfo />
            </div>
        );
    } else {
        return <Loading />;
    }
}

export default React.memo(SelectedWeather);

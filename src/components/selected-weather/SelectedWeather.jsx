import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { setSelectedWeather } from "../../store/selectedWeatherSlice";
import SelectedTemperature from "./SelectedTemperature";
import FeelsLikeField from "./FeelsLikeField";
import MoreWeatherInfo from "./MoreWeatherInfo";

function SelectedWeather() {
    const dispatch = useDispatch();
    const temperatureInF = useSelector((state) => state.settings.temperatureInF);
    const speedUnitinMS = useSelector((state) => state.settings.speedUnitinMS);
    const showFeelsLikeField = useSelector((state) => state.settings.showFeelsLikeField);
    const selectedWeather = useSelector((state) => state.selectedWeather);
    const forecast = useSelector((state) => state.forecast);

    // Setting main displaying weather to current weather
    useEffect(() => {
        if (forecast.list[0]) {
            dispatch(setSelectedWeather(forecast.list[0]));
        }
    }, [forecast]);

    const getSelectedTemperatureValue = () => {
        if (temperatureInF === false) {
            return selectedWeather.main.temp.toFixed(0);
        } else if (temperatureInF == true) {
            return (selectedWeather.main.temp * (9 / 5) + 32).toFixed(0);
        } else {
            return 0;
        }
    };

    const getFeelsLikeValue = () => {
        if (temperatureInF === false) {
            return selectedWeather.main.feels_like.toFixed(0);
        } else if (temperatureInF == true) {
            return (selectedWeather.main.feels_like * (9 / 5) + 32).toFixed(0);
        } else {
            return 0;
        }
    };

    const getWindSpeedValue = () => {
        let windSpeed = "";

        if (speedUnitinMS === false) {
            windSpeed += (selectedWeather.wind.speed * 3.6).toFixed(0);
        } else if (speedUnitinMS === true) {
            windSpeed += selectedWeather.wind.speed.toFixed(0);
        }

        windSpeed += speedUnitinMS == false ? " km/h" : " m/s";

        return windSpeed;
    };

    if (selectedWeather) {
        return (
            <div className="selected-weather">
                <SelectedTemperature temperature={getSelectedTemperatureValue()} />
                {showFeelsLikeField && (
                    <FeelsLikeField temperature={getFeelsLikeValue()} />
                )}
                <MoreWeatherInfo
                    windSpeed={getWindSpeedValue()}
                    humidity={`${selectedWeather?.main.humidity}%`}
                />
            </div>
        );
    } else {
        return <Loading />;
    }
}

export default React.memo(SelectedWeather);

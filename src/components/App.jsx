import { createContext, useEffect, useState } from "react";
// Components
import CityAndDate from "./CityAndDate";
import DailyForecast from "./DailyForecast";
import SelectedWeather from "./SelectedWeather";
import ErrorAlert from "./ErrorAlert";
import Settings from "./settings/Settings";

export const ErrorContext = createContext();
export const SetSelectedWeatherContext = createContext();
export const SettingsContext = createContext();

function saveForecastData(data) {
    let date = new Date();
    data.timeStamp = +date;
    localStorage.setItem("forecastData", JSON.stringify(data));
}

function getSavedForecastData() {
    return JSON.parse(localStorage.getItem("forecastData"));
}

export function App() {
    let [geolocation, setGeolocation] = useState({ lat: 0, lon: 0 });
    let [forecast, setForecast] = useState({ list: [] });
    let [selectedWeather, setSelectedWeather] = useState(0);
    let [error, setError] = useState(false);
    let [autoRefreshIntervalID, setAutoRefreshIntervalID] = useState();
    const defaultAppSettings = {
        showFeelsLikeField: false,
        temperatureScale: "celsius",
        speedUnit: "km/h"
    };
    let [appSettings, setAppSettings] = useState(
        JSON.parse(localStorage.getItem("weather-app-settings")) ?? defaultAppSettings
    );

    // Defines user geolocation
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setGeolocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (error) => {
                setError(error);
                console.log(error);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    // Fetching forecast after defining user geolocation
    useEffect(() => {
        if (!error && geolocation.lat !== 0 && geolocation.lon !== 0) {
            getForecast(geolocation.lat, geolocation.lon);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geolocation, error]);

    // Setting main displaying weather to current weather
    useEffect(() => {
        setSelectedWeather(forecast.list[0]);
    }, [forecast]);

    // Setting interval to automatically update weather every 5 minutes
    useEffect(() => {
        autoRefreshIntervalID && clearInterval(autoRefreshIntervalID);

        setAutoRefreshIntervalID(
            setInterval(() => {
                getForecast(geolocation.lat, geolocation.lon);
            }, 300 * 1000)
        );

        return () => clearInterval(autoRefreshIntervalID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geolocation.lat, geolocation.lon]);

    function getForecast(lat, lon) {
        try {
            let savedForecastData = getSavedForecastData();
            let date = new Date();
            let currentMilliseconds = +date;

            if (!savedForecastData || currentMilliseconds - savedForecastData.timeStamp > 300 * 1000) {
                fetchForecast(lat, lon);
            } else {
                setForecast(savedForecastData);
            }
        } catch (error) {
            setError(error);
        }
    }

    async function fetchForecast(lat, lon) {
        let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e13101adaa937ed23720689cf95cba15&units=metric`;
        let response = await fetch(forecastURL);
        let data = await response.json();
        setForecast(data);
        saveForecastData(data);
    }

    return (
        <SettingsContext.Provider value={[appSettings, setAppSettings, defaultAppSettings]}>
            <ErrorContext.Provider value={[error, setError]}>
                <div className="app">
                    <div className="left">
                        <CityAndDate geolocation={geolocation} />
                        <SelectedWeather info={selectedWeather} />
                        <SetSelectedWeatherContext.Provider value={setSelectedWeather}>
                            <DailyForecast forecast={forecast} />
                        </SetSelectedWeatherContext.Provider>
                    </div>

                    <div className="right">
                        <Settings />
                    </div>
                    <ErrorAlert error={error} />
                </div>
            </ErrorContext.Provider>
        </SettingsContext.Provider>
    );
}

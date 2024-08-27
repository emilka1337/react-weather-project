import { createContext, useEffect, useState } from "react";
// Components
import CityAndDate from "./CityAndDate";
import DailyForecast from "./forecast/DailyForecast";
import SelectedWeather from "./SelectedWeather";
import ErrorAlert from "./alerts/ErrorAlert";
import Settings from "./settings/Settings";
import WarningAlert from "./alerts/WarningAlert";
// Contexts
export const ErrorContext = createContext();
export const WarningContext = createContext();
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

class DefaultAppSettings {
    constructor(darkMode, showFeelsLikeField, temperatureScale, speedUnit, showSecondsInClocks) {
        this.darkMode = darkMode ?? window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false;
        this.showFeelsLikeField = showFeelsLikeField ?? false;
        this.temperatureScale = temperatureScale ?? "celsius";
        this.speedUnit = speedUnit ?? "km/h";
        this.showSecondsInClocks = showSecondsInClocks ?? false;
    }
}

export function App() {
    let [geolocation, setGeolocation] = useState({ lat: 0, lon: 0 });
    let [forecast, setForecast] = useState({ list: [] });
    let [selectedWeather, setSelectedWeather] = useState(0);
    let [error, setError] = useState(false);
    let [warning, setWarning] = useState(false);
    let [autoRefreshIntervalID, setAutoRefreshIntervalID] = useState();
    const defaultAppSettings = new DefaultAppSettings;
    let [appSettings, setAppSettings] = useState(
        JSON.parse(localStorage.getItem("weather-app-settings")) ?? defaultAppSettings
    );

    useEffect(() => {
        // Checks if new settings added in new app releases and adds it to all settings
        updateSettingsIfNewSettingsAdded();
        
        // Defines user geolocation
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

    let getForecast = (lat, lon) => {
        try {
            let savedForecastData = getSavedForecastData();
            let date = new Date();
            let currentMilliseconds = +date;

            if (!savedForecastData || currentMilliseconds - savedForecastData.timeStamp > 300 * 1000) {
                fetchForecast(lat, lon);
            } else {
                setForecast(savedForecastData);
            }
        } catch {
            let savedForecastData = getSavedForecastData();
            console.log(savedForecastData);
            setForecast(savedForecastData);
            setWarning({
                text: "Failed to load weather data. Old data will be displayed instead. Try to reload page.",
            });
        }
    };

    let fetchForecast = async (lat, lon) => {
        let forecastURL = `${import.meta.env.VITE_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
        let response = await fetch(forecastURL);
        console.log(response);
        let data = await response.json();
        setForecast(data);
        saveForecastData(data);
    };

    let updateSettingsIfNewSettingsAdded = () => {
        if (localStorage.getItem("weather-app-settings")) {
            for (let i in defaultAppSettings) {
                if (appSettings[i] === undefined) {
                    setAppSettings({
                        ...appSettings,
                        i: defaultAppSettings[i],
                    });
                    localStorage.setItem("weather-app-settings", JSON.stringify(appSettings));
                }
            }
        }
    };

    return (
        <SettingsContext.Provider value={[appSettings, setAppSettings, defaultAppSettings]}>
            <ErrorContext.Provider value={[error, setError]}>
                <WarningContext.Provider value={[warning, setWarning]}>
                    <div className={appSettings.darkMode ? "app dark" : "app"}>
                        <div className="widget">
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
                            <WarningAlert warning={warning} />
                        </div>
                    </div>
                </WarningContext.Provider>
            </ErrorContext.Provider>
        </SettingsContext.Provider>
    );
}

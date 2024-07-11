import { createContext, useEffect, useState } from "react";
// Components
import CityAndDate from "./CityAndDate";
import DailyForecast from "./DailyForecast";
import SelectedWeather from "./SelectedWeather";
import Clocks from "./Clocks";
import ErrorAlert from "./ErrorAlert";

export const ErrorContext = createContext();
export const SetSelectedWeatherContext = createContext();

export function App() {
    let [geolocation, setGeolocation] = useState({ lat: 0, lon: 0 });
    let [forecast, setForecast] = useState({ list: [] });
    let [selectedWeather, setSelectedWeather] = useState(0);
    let [error, setError] = useState(false);
    let [autoRefreshIntervalID, setAutoRefreshIntervalID] = useState();

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
            fetchForecast(geolocation.lat, geolocation.lon);
        }
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
                fetchForecast(geolocation.lat, geolocation.lon);
            }, 300 * 1000)
        );

        return () => clearInterval(autoRefreshIntervalID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geolocation.lat, geolocation.lon]);

    async function fetchForecast(lat, lon) {
        try {
            let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e13101adaa937ed23720689cf95cba15&units=metric`;
            let response = await fetch(forecastURL);
            let data = await response.json();
            setForecast(data);
        } catch (error) {
            setError(error);
        }
    }

    return (
        <ErrorContext.Provider value={[error, setError]}>
            <div className="app">
                <div className="left">
                    <CityAndDate geolocation={geolocation} />
                    <SelectedWeather info={selectedWeather} />
                    <SetSelectedWeatherContext.Provider
                        value={setSelectedWeather}
                    >
                        <DailyForecast forecast={forecast} />
                    </SetSelectedWeatherContext.Provider>
                </div>

                <div className="right">
                    <Clocks />
                </div>
                <ErrorAlert error={error} />
            </div>
        </ErrorContext.Provider>
    );
}

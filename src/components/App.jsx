import { createContext, useEffect, useState } from "react";
// Components
import CityAndDate from "./CityAndDate";
import DailyForecast from "./DailyForecast";
import SelectedWeather from "./SelectedWeather";
import Clocks from "./Clocks";
import ErrorAlert from "./ErrorAlert";

export const ErrorContext = createContext();
export const SetSelectedWeatherContext = createContext();

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
    let [notificationsPermission, setNotificationsPermission] = useState();

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

    useEffect(() => {
        requestNotificationsPermission();

        if (notificationsPermission == "grante") {
            new Notification("Спасибо за разрешение!", {
                body: "Постараемся не надоедать вам :)",
                icon: "https://icons.veryicon.com/png/o/miscellaneous/test-6/weather-91.png",
                badge: "https://icons.veryicon.com/png/o/miscellaneous/test-6/weather-91.png",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notificationsPermission]);

    function requestNotificationsPermission() {
        Notification.requestPermission()
            .then((result) => {
                setNotificationsPermission(result);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                console.log(notificationsPermission);
            });
    }

    function getForecast(lat, lon) {
        try {
            let savedForecastData = getSavedForecastData();
            let date = new Date();
            let currentMilliseconds = +date;

            if (
                !savedForecastData ||
                currentMilliseconds - savedForecastData.timeStamp > 300 * 1000
            ) {
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

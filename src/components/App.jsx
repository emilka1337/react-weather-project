import React, { createContext, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedWeather } from "../store/selectedWeatherSlice";
// Components
import CityAndDate from "./city-and-date/CityAndDate";
import DailyForecast from "./forecast/DailyForecast";
import SelectedWeather from "./SelectedWeather";

const Settings = React.lazy(() => import("./settings/Settings"));

function saveForecastData(data) {
    let date = new Date();
    data.timeStamp = +date;
    localStorage.setItem("forecastData", JSON.stringify(data));
}

function getSavedForecastData() {
    return JSON.parse(localStorage.getItem("forecastData"));
}

function App() {
    let [geolocation, setGeolocation] = useState({ lat: 0, lon: 0 });
    let [forecast, setForecast] = useState({ list: [] });
    let [autoRefreshIntervalID, setAutoRefreshIntervalID] = useState();

    const darkMode = useSelector((state) => state.settings.darkMode);
    const selectedWeather = useSelector((state) => state.selectedWeather);
    const dispatch = useDispatch();

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
                // dispatch(addError({ error }));
                console.log(error);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    // Fetching forecast after defining user geolocation
    useEffect(() => {
        if (geolocation.lat !== 0 && geolocation.lon !== 0) {
            getForecast(geolocation.lat, geolocation.lon);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geolocation]);

    // Setting main displaying weather to current weather
    useEffect(() => {
        if (forecast.list[0]) {
            dispatch(setSelectedWeather(forecast.list[0]));
        }
    }, [forecast]);

    let getForecast = (lat, lon) => {
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
        } catch {
            let savedForecastData = getSavedForecastData();
            console.log(savedForecastData);
            setForecast(savedForecastData);
        }
    };

    let fetchForecast = async (lat, lon) => {
        let forecastURL = `${
            import.meta.env.VITE_BASE_URL
        }/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
            import.meta.env.VITE_API_KEY
        }&units=metric`;
        let response = await fetch(forecastURL);
        let data = await response.json();
        setForecast(data);
        saveForecastData(data);
    };

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <div className="widget">
                <div className="left">
                    <CityAndDate geolocation={geolocation} />
                    <SelectedWeather info={selectedWeather} />
                    <DailyForecast forecast={forecast} />
                </div>
                <div className="right">
                    <Suspense>
                        <Settings />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

App.whyDidYouRender = true;

export default App;

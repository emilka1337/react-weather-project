import React, { createContext, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import CityAndDate from "./city-and-date/CityAndDate";
import DailyForecast from "./forecast/DailyForecast";
import SelectedWeather from "./selected-weather/SelectedWeather";
import { setGeolocation } from "../store/geolocationSlice";
import { setForecast } from "../store/forecastSlice";
import { fetchForecast } from "../store/forecastThunk";

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
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.settings.darkMode);
    const geolocation = useSelector((state) => state.geolocation);
    const cityName = useSelector(state => state.selectedCity)

    // Defines user geolocation
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(
                    setGeolocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    })
                );
            },
            (error) => {
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

    let getForecast = (lat, lon) => {
        try {
            let savedForecastData = getSavedForecastData();
            let currentMilliseconds = Date.now();

            if (
                !savedForecastData ||
                currentMilliseconds - savedForecastData.timeStamp > 300 * 1000 ||
                savedForecastData.payload.city.name != cityName
            ) {
                const data = dispatch(fetchForecast({ lat, lon }));
                data.then((data) => {
                    saveForecastData(data);
                    dispatch(setForecast(data))
                });
            } else {
                dispatch(setForecast(savedForecastData));
            }
        } catch {
            setForecast(getSavedForecastData());
        }
    };

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <div className="widget">
                <div className="left">
                    <CityAndDate />
                    <SelectedWeather />
                    <DailyForecast />
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

export default App;

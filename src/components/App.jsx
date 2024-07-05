// API request:
// current
// api.openweathermap.org/data/2.5/weather?lat=40&lon=50&appid=e13101adaa937ed23720689cf95cba15&units=metric
// 5 day
// api.openweathermap.org/data/2.5/forecast?lat=40&lon=50&appid=e13101adaa937ed23720689cf95cba15&units=metric

import { useEffect, useState } from "react";
import CityAndDate from "./CityAndDate";
import Clocks from "./Clocks";
import DailyForecast from "./DailyForecast";
import SelectedWeather from "./SelectedWeather";

function App() {
    let [geolocation, setGeolocation] = useState({ lat: 0, lon: 0 });
    let [forecast, setForecast] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setGeolocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (error) => {
                alert(
                    "Error while getting your geolocation. Open console for more info."
                );
                console.log(error);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        if (geolocation.lat !== 0 && geolocation.lon !== 0) {
            fetchForecast(geolocation.lat, geolocation.lon);
        }
    }, [geolocation]);

    let fetchForecast = async (lat, lon) => {
        let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e13101adaa937ed23720689cf95cba15&units=metric`;
        let response = await fetch(forecastURL);
        let data = await response.json();
        setForecast(data);
        console.log(data);
    };

    return (
        <div className="app">
            <div className="left">
                <CityAndDate geolocation={geolocation} />
                <SelectedWeather />
                <DailyForecast />
            </div>

            <div className="right">
                <Clocks />
            </div>
        </div>
    );
}

export default App;

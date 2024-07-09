import { useEffect, useState } from "react";
// Components
import CityAndDate from "./CityAndDate";
import DailyForecast from "./DailyForecast";
import SelectedWeather from "./SelectedWeather";
import Clocks from "./Clocks";

function App() {
    let [geolocation, setGeolocation] = useState({ lat: 0, lon: 0 });
    let [forecast, setForecast] = useState({ list: [] });
    let [selectedWeather, setSelectedWeather] = useState(0);

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
            }
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
        setSelectedWeather(0);
    };

    return (
        <div className="app">
            <div className="left">
                <CityAndDate geolocation={geolocation} />
                <SelectedWeather info={forecast.list[selectedWeather]} />
                <DailyForecast
                    forecast={forecast}
                    changeSelectedWeather={setSelectedWeather}
                    selectedWeather={selectedWeather}
                />
            </div>

            <div className="right">
                <Clocks />
            </div>
        </div>
    );
}

export default App;

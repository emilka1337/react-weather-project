import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "./App";
import Clocks from "./Clocks";

function CityAndDate(props) {
    let [cityName, setCityName] = useState("Loading...");
    let [setError] = useContext(ErrorContext);

    useEffect(() => {
        const fetchCityName = async () => {
            const requestURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${props.geolocation.lat}&lon=${props.geolocation.lon}&limit=5&appid=e13101adaa937ed23720689cf95cba15`;
            const response = await fetch(requestURL);
            if (response.ok) {
                const data = await response.json();
                if (data[0]) {
                    setCityName(data[0].name);
                }
            } else {
                setError(new Error("Failed to fetch city name"))
            }

        };

        fetchCityName();
    }, [props.geolocation.lat, props.geolocation.lon, setError]);

    return (
        <div className="city-and-date">
            <h3 className="city-name">{cityName}</h3>
            {/* <h3 className="date">05.07.2024</h3> */}
            <Clocks />
        </div>
    );
}

export default CityAndDate;

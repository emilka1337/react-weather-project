import { useEffect, useState } from "react";

function CityAndDate(props) {
    let [cityName, setCityName] = useState("Loading...");

    useEffect(() => {
        const fetchCityName = async () => {
            const requestURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${props.geolocation.lat}&lon=${props.geolocation.lon}&limit=5&appid=e13101adaa937ed23720689cf95cba15`;
            const response = await fetch(requestURL);
            const data = await response.json();

            setCityName(data[0].local_names.en);
        };

        fetchCityName();
    }, [props.geolocation.lat, props.geolocation.lon]);

    return (
        <div className="city-and-date">
            <h3 className="city-name">{cityName}</h3>
            <h3 className="date">05.07.2024</h3>
        </div>
    );
}

export default CityAndDate;

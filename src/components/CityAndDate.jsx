import { useEffect, useState } from "react";

function CityAndDate(props) {
    let [cityName, setCityName] = useState("Loading...");

    useEffect(() => {
        fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${props.geolocation.lat}&lon=${props.geolocation.lon}&limit=5&appid=e13101adaa937ed23720689cf95cba15`
        ).then((resolve) => {
            resolve.json().then((data) => {
                console.log(data);
                console.log(data.name);
                setCityName(data[0].name);
            });
        });
    }, [props.geolocation.lat, props.geolocation.lon]);

    return (
        <div className="city-and-date">
            <h3 className="city-name">{cityName}</h3>
            <h3 className="date">05.07.2024</h3>
        </div>
    );
}

export default CityAndDate;
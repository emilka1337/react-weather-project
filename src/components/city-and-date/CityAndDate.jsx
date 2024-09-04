import React, { useEffect, useState } from "react";
import Clocks from "./Clocks";
import axios from "axios";

const saveCityName = (cityName) =>
    localStorage.setItem("last-saved-city-name", JSON.stringify(cityName));

const loadLastSavedCityName = () =>
    JSON.parse(localStorage.getItem("last-saved-city-name"));

function CityAndDate(props) {
    let [cityName, setCityName] = useState("Loading...");

    useEffect(() => {
        fetchCityName(props.geolocation.lat, props.geolocation.lon);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.geolocation.lat, props.geolocation.lon]);

    const fetchCityName = async (lat, lon) => {
        if (!lat || !lon) return;

        const requestURL = `${
            import.meta.env.VITE_BASE_URL
        }geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${
            import.meta.env.VITE_API_KEY
        }`;

        axios
            .get(requestURL)
            .then((response) => {
                saveCityName(response.data[0].name);
                setCityName(response.data[0].name);
            })
            .catch(() => {
                let cityName =
                    loadLastSavedCityName() ?? "Sorry, something went wrong :(";
                setCityName(cityName);
            });
    };

    return (
        <div className="city-and-date">
            <h3 className="city-name">{cityName}</h3>
            <Clocks />
        </div>
    );
}

export default React.memo(CityAndDate);

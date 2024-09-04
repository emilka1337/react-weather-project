import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const saveCityName = (cityName) =>
    localStorage.setItem("last-saved-city-name", JSON.stringify(cityName));

const loadLastSavedCityName = () =>
    JSON.parse(localStorage.getItem("last-saved-city-name"));

function City() {
    let [cityName, setCityName] = useState("Loading...");
    const geolocation = useSelector(state => state.geolocation)

    useEffect(() => {
        fetchCityName(geolocation.lat, geolocation.lon);
    }, [geolocation.lat, geolocation.lon]);

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

    return <h3 className="city-name">{cityName}</h3>;
}

export default City;

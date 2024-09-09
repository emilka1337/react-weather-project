import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CitySearch = React.lazy(() => import("./CitySearch"));

const saveCityName = (cityName) =>
    localStorage.setItem("last-saved-city-name", JSON.stringify(cityName));

const loadLastSavedCityName = () =>
    JSON.parse(localStorage.getItem("last-saved-city-name"));

function City() {
    let [cityName, setCityName] = useState("Loading...");
    let [showCitySearch, setShowCitySearch] = useState(false);
    const geolocation = useSelector((state) => state.geolocation);

    useEffect(() => {
        fetchCityNameByCoords(geolocation.lat, geolocation.lon);
    }, [geolocation.lat, geolocation.lon]);

    const fetchCityNameByCoords = async (lat, lon) => {
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
        <div className="city">
            <h3 className="city-name">{cityName}</h3>
            <button
                className="edit-city-toggler"
                onClick={() => setShowCitySearch(!showCitySearch)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                </svg>
            </button>
            <CitySearch showCitySearch={showCitySearch} />
        </div>
    );
}

export default React.memo(City);

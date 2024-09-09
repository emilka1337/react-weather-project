import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedCity } from "../../store/selectedCitySlice";
import { setGeolocation } from "../../store/geolocationSlice";

function CitiesList({ citiesList }) {
    const dispatch = useDispatch();

    const handleCityClick = (city) => {
        dispatch(setSelectedCity(city.name));
        dispatch(setGeolocation({ lat: city.lat, lon: city.lon }));
    };

    return (
        <ul className="cities-list">
            {citiesList?.data.length > 0 &&
                citiesList.data.map((city, index) => {
                    return (
                        <li key={index}>
                            <button onClick={() => handleCityClick(city)}>
                                {city.name}, {city.country}
                            </button>
                        </li>
                    );
                })}
        </ul>
    );
}

export default React.memo(CitiesList);

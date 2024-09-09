import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchedCitiesList from "./SearchedCitiesList";
import StarredCitiesList from "./StarredCitiesList";

function CitySearch({ showCitySearch }) {
    const [inputValue, setInputValue] = useState("");
    const [citiesList, setCitiesList] = useState({ data: [] });

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (inputValue) {
                const requestURL = `${
                    import.meta.env.VITE_BASE_URL
                }geo/1.0/direct?q=${inputValue}&limit=3&appid=${
                    import.meta.env.VITE_API_KEY
                }`;

                inputValue && axios.get(requestURL).then((data) => {
                    setCitiesList(data);
                });
            } else {
                setCitiesList({ data: [] });
            }
        }, 500);

        return () => clearTimeout(timeoutID);
    }, [inputValue]);

    return (
        <section className={showCitySearch ? "city-search show" : "city-search"}>
            <input
                type="text"
                placeholder="Search city..."
                value={inputValue}
                onChange={handleInputChange}
            />
            <StarredCitiesList />
            <SearchedCitiesList citiesList={citiesList} />
        </section>
    );
}

export default React.memo(CitySearch);

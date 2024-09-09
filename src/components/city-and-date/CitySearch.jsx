import React, { useEffect, useState } from "react";
import axios from "axios";

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

    useEffect(() => {
        console.log(citiesList);
    }, [citiesList]);

    return (
        <section className={showCitySearch ? "city-search show" : "city-search"}>
            <h5>Search</h5>
            <input
                type="text"
                placeholder="Type here..."
                value={inputValue}
                onChange={handleInputChange}
            />
            <ul>
                {citiesList?.data.length > 0 &&
                    citiesList.data.map((item, index) => {
                        return (
                            <li key={index}>
                                <button>{item.name}</button>
                            </li>
                        );
                    })}
            </ul>
        </section>
    );
}

export default React.memo(CitySearch);

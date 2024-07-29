import { createContext, useContext, useEffect, useState } from "react";
import ForecastDay from "./ForecastDay";
import { ErrorContext } from "../App";

export const ForecastModeContext = createContext();

function extractWeekDayFromTimestamp(ts) {
    return new Date(ts * 1000).getDay();
}

function countElementsInArrayOfArrays(arr) {
    let result = 0;

    for (let elem of arr) {
        result += elem.length;
    }

    return result;
}

function separateListByWeekdays(list) {
    let newList = new Array(...list);
    newList.map((item) => (item.weekday = extractWeekDayFromTimestamp(item.dt)));

    let result = [];
    let currentWeekday = newList[0].weekday;

    while (countElementsInArrayOfArrays(result) < 40) {
        result.push(newList.filter((item) => item.weekday == currentWeekday));

        if (currentWeekday < 6) {
            currentWeekday++;
        } else {
            currentWeekday = 0;
        }
    }

    return result;
}

function defineTomorrowForecast(tomorrowWeatherArray) {
    const minTemp = Math.min(...tomorrowWeatherArray.map((item) => item.main.temp));
    const maxTemp = Math.max(...tomorrowWeatherArray.map((item) => item.main.temp));
    const maxWind = Math.max(...tomorrowWeatherArray.map((item) => item.wind.speed));

    return { minTemp, maxTemp, maxWind };
}

function showTomorrowforecastNotification(tomorrowForecast) {
    return new Notification("Tomorrow's weather", {
        body: `💨Max wind: ${(tomorrowForecast.maxWind * 3.6).toFixed(
            0
        )} km/h\n🔥Max temperature: ${tomorrowForecast.maxTemp.toFixed(
            0
        )}°\n❄Min temperature: ${tomorrowForecast.minTemp.toFixed(0)}°`,
        icon: "https://icons.iconarchive.com/icons/dtafalonso/win-10x/512/Weather-icon.png",
        badge: "https://icons.veryicon.com/png/o/miscellaneous/test-6/weather-91.png",
    });
}

function DailyForecast(props) {
    let [notificationShowed, setNotificationShowed] = useState(false);
    let [separatedList, setSeparatedList] = useState([]);
    let [notificationsPermission, setNotificationsPermission] = useState("denied");
    let [forecastMode, setForecastMode] = useState("temperature");

    let [setError] = useContext(ErrorContext);

    useEffect(() => {
        Notification.requestPermission()
            .then((result) => {
                setNotificationsPermission(result);
                console.log(notificationsPermission);
            })
            .catch((error) => {
                setError(error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (props.forecast.list.length > 0 && separatedList.length < 5) {
            setSeparatedList(separateListByWeekdays(props.forecast.list));
        }
    }, [props.forecast.list, separatedList]);

    useEffect(() => {
        if (notificationsPermission == "granted" && notificationShowed === false && separatedList.length > 0) {
            let tomorrowForecast = defineTomorrowForecast(separatedList[1]);
            setNotificationShowed(true);
            setTimeout(function () {
                showTomorrowforecastNotification(tomorrowForecast);
            }, 5000);

            console.log("notification");
        }
    }, [notificationShowed, notificationsPermission, separatedList]);

    const temperatureButtonClick = () => setForecastMode("temperature")
    const windButtonClick = () => setForecastMode("wind")

    return (
        <>
            <nav className="forecast-mode-toggle-panel">
                <ul>
                    <li>
                        <button
                            className={
                                forecastMode == "temperature" ? "forecast-mode-toggler active" : "forecast-mode-toggler"
                            }
                            onClick={temperatureButtonClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-thermometer-half"
                                viewBox="0 0 16 16"
                            >
                                <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                                <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button
                            className={
                                forecastMode == "wind" ? "forecast-mode-toggler active" : "forecast-mode-toggler"
                            }
                            onClick={windButtonClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-wind"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
            <ul className="daily-forecast">
                <ForecastModeContext.Provider value={forecastMode}>
                    {separatedList.map((day, index) => {
                        return <ForecastDay day={day} weekday={day[0].weekday} key={index} />;
                    })}
                </ForecastModeContext.Provider>
            </ul>
        </>
    );
}

export default DailyForecast;

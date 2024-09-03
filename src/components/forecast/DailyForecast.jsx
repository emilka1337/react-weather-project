import React, { useContext, useEffect, useState } from "react";
import ForecastDay from "./ForecastDay";
import ForecastModeTogglePanel from "./ForecastModeTogglePanel";
import { useSelector } from "react-redux";
// import { ForecastContext } from "../App";

// export const ForecastModeContext = createContext();

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
    let newList = structuredClone(list);
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

function DailyForecast() {
    let [notificationShowed, setNotificationShowed] = useState(false);
    let [separatedList, setSeparatedList] = useState([]);
    let [notificationsPermission, setNotificationsPermission] = useState("denied");

    const forecast = useSelector((state) => state.forecast);
    

    useEffect(() => {
        Notification.requestPermission()
            .then((result) => {
                setNotificationsPermission(result);
            })
            .catch((error) => {
                // setError(error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (forecast.list.length > 0 && separatedList.length < 5) {
            setSeparatedList(separateListByWeekdays(forecast.list));
        }
    }, [forecast]);

    useEffect(() => {
        if (
            notificationsPermission == "granted" &&
            notificationShowed === false &&
            separatedList.length > 0
        ) {
            let tomorrowForecast = defineTomorrowForecast(separatedList[1]);
            setNotificationShowed(true);
            setTimeout(function () {
                showTomorrowforecastNotification(tomorrowForecast);
            }, 5000);

            console.log("notification");
        }
    }, [notificationShowed, notificationsPermission, separatedList]);

    return (
        <>
            <ForecastModeTogglePanel />
            <ul className="daily-forecast">
                {separatedList.map((day, index) => {
                    return (
                        <ForecastDay
                            day={day}
                            weekday={day[0].weekday}
                            key={index}
                            index={index}
                        />
                    );
                })}
            </ul>
        </>
    );
}

export default React.memo(DailyForecast);

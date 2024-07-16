import { useEffect, useState } from "react";
import ForecastDay from "./ForecastDay";

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
    newList.map(
        (item) => (item.weekday = extractWeekDayFromTimestamp(item.dt))
    );

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
    const minTemp = Math.min(
        ...tomorrowWeatherArray.map((item) => item.main.temp)
    );
    const maxTemp = Math.max(
        ...tomorrowWeatherArray.map((item) => item.main.temp)
    );
    const maxWind = Math.max(
        ...tomorrowWeatherArray.map((item) => item.wind.speed)
    );

    return { minTemp, maxTemp, maxWind };
}

function showTomorrowforecastNotification(tomorrowForecast) {
    return new Notification("Tomorrow's weather", {
        body: `Max wind: ${(tomorrowForecast.maxWind * 3.6).toFixed(
            0
        )} km/h\nMax temperature: ${tomorrowForecast.maxTemp.toFixed(
            0
        )}°\nMin temperature: ${tomorrowForecast.minTemp.toFixed(0)}°`,
        icon: "https://icons.iconarchive.com/icons/dtafalonso/win-10x/512/Weather-icon.png",
        badge: "https://icons.veryicon.com/png/o/miscellaneous/test-6/weather-91.png",
    });
}

function DailyForecast(props) {
    let [notificationShowed, setNotificationShowed] = useState(false); // ПОМЕНЯТЬ ПОТОМ НА TRUE ЧТОБЫ РАБОТАЛИ УВЕДЫ
    let [separatedList, setSeparatedList] = useState([]);

    useEffect(() => {
        if (props.forecast.list.length > 0 && separatedList.length < 5) {
            setSeparatedList(separateListByWeekdays(props.forecast.list));
        }
    }, [props.forecast.list, separatedList]);

    useEffect(() => {
        if (
            props.notificationsPermission == "granted" &&
            notificationShowed === false &&
            separatedList.length > 0
        ) {
            let tomorrowForecast = defineTomorrowForecast(separatedList[1]);
            setNotificationShowed(true);
            setTimeout(function() {
                showTomorrowforecastNotification(tomorrowForecast);
            }, 5000);

            console.log("notification");
        }
    }, [notificationShowed, props.notificationsPermission, separatedList]);

    return (
        <ul className="daily-forecast">
            {separatedList.map((day, index) => {
                return (
                    <ForecastDay
                        day={day}
                        weekday={day[0].weekday}
                        key={index}
                    />
                );
            })}
        </ul>
    );
}

export default DailyForecast;

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
    let result = [];
    let currentWeekday = list[0].weekday;

    while (countElementsInArrayOfArrays(result) < 40) {
        result.push(list.filter((item) => item.weekday == currentWeekday));

        if (currentWeekday < 6) {
            currentWeekday++;
        } else {
            currentWeekday = 0;
        }
    }

    return result;
}

function DailyForecast(props) {
    let days;

    if (props.forecast.list.length > 0) {
        let list = new Array(...props.forecast.list);
        list.map(
            (item) => (item.weekday = extractWeekDayFromTimestamp(item.dt))
        );

        let separatedList = separateListByWeekdays(list);
        console.log(separatedList);

        days = separatedList.map((day, index) => {
            return (
                <ForecastDay
                    forecastCells={day}
                    weekday={day[0].weekday}
                    key={index}
                    changeSelectedWeather={props.changeSelectedWeather}
                />
            );
        });
    }

    return <ul className="daily-forecast">{days}</ul>;
}

export default DailyForecast;

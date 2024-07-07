import ForecastDay from "./ForecastDay";

function DailyForecast(props) {
    let elements =
        props.forecast.list.length > 0 &&
        props.forecast.list.map((item, index) => {
            return (
                <ForecastDay
                    timestamp={item.dt}
                    temperature={item.main.temp}
                    forecast={item.weather.main}
                    key={index}
                    changeSelectedWeather={props.changeSelectedWeather}
                    index={index}
                    className={
                        props.selectedWeather == index ? "selected day" : "day"
                    }
                />
            );
        });

    return (
        <div className="daily-forecast">
            <ul>{elements}</ul>
        </div>
    );
}

export default DailyForecast;

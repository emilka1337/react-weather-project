import ForecastDay from "./ForecastDay";

function DailyForecast(props) {
    console.log(props.forecast);

    return (
        <div className="daily-forecast">
            <ul>
                {/* {props.forecast.list.map((item) => {
                    <ForecastDay weekday={item.dt} temperature={item.main.temp} forecast={item.weather.main}/>
                })} */}
                {/* <ForecastDay weekday="Today" temperature="32" forecast="Sunny"/>
                <ForecastDay weekday="Today" temperature="32" forecast="Sunny"/>
                <ForecastDay weekday="Today" temperature="32" forecast="Sunny"/>
                <ForecastDay weekday="Today" temperature="32" forecast="Sunny"/>
                <ForecastDay weekday="Today" temperature="32" forecast="Sunny"/> */}
            </ul>
        </div>
    );
}

export default DailyForecast;
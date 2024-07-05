import ForecastDay from "./ForecastDay";

function DailyForecast() {
    return (
        <div className="daily-forecast">
            <ul>
                <ForecastDay weekday="Today" temperature="32" forecast="Sunny"/>
                <ForecastDay weekday="Today" temperature="32" forecast="Sunny"/>
                <ForecastDay weekday="Today" temperature="32" forecast="Sunny"/>
                <ForecastDay weekday="Today" temperature="32" forecast="Sunny"/>
                <ForecastDay weekday="Today" temperature="32" forecast="Sunny"/>
            </ul>
        </div>
    );
}

export default DailyForecast;
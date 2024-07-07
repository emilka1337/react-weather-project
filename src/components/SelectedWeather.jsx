function SelectedWeather(props) {
    return (
        <div className="selected-weather">
            <h1 className="selected-temperature">
                {props.info && (props.info.main.temp).toFixed(0) || "0"}
                <span className="degree">°</span>
            </h1>
            <div className="more-info">
                <h3 className="wind">
                    {props.info &&
                        (props.info.wind.speed * 3.6).toFixed(1) + " km/h"}
                </h3>
                <h2 className="sky">
                    {props.info && props.info.weather[0].main}
                </h2>
                <h3 className="humidity">
                    {props.info && props.info.main.humidity + "%"}
                </h3>
            </div>
        </div>
    );
}

export default SelectedWeather;

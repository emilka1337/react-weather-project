function SelectedWeather() {
    return (
        <div className="selected-weather">
            <h1 className="selected-temperature">
                20<span className="degree">°</span>
            </h1>
            <div className="more-info">
                <h3 className="wind">100 km/h</h3>
                <h2 className="sky">Tornado</h2>
                <h3 className="humidity">32%</h3>
            </div>
        </div>
    );
}

export default SelectedWeather;
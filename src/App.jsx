// API request:
// https://api.openweathermap.org/data/2.5/weather?lat=40&lon=50&appid=e13101adaa937ed23720689cf95cba15

import Clocks from "./Clocks";

function App() {
    return (
        <div className="app">
            <div className="left">
                <div className="city-and-date">
                    <h3 className="city-name">Milan</h3>
                    <h3 className="date">05.07.20024</h3>
                </div>
                <div className="selected-weather">
                    <h1 className="selected-temperature">20<span className="degree">°</span></h1>
                    <div className="more-info">
                        <h3 className="wind">100 km/h</h3>
                        <h2 className="sky">Tornado</h2>
                        <h3 className="humidity">146%</h3>
                    </div>
                </div>
                <div className="daily-forecast">
                    <ul>
                        <li>
                            <div className="day">
                                <h4 className="weekday">Today</h4>
                                <h3 className="temperature">146°</h3>
                                <h4 className="forecast">Sunny</h4>
                            </div>
                        </li>
                        <li>
                            <div className="day">
                                <h4 className="weekday">Today</h4>
                                <h3 className="temperature">146°</h3>
                                <h4 className="forecast">Sunny</h4>
                            </div>
                        </li>
                        <li>
                            <div className="day">
                                <h4 className="weekday">Today</h4>
                                <h3 className="temperature">146°</h3>
                                <h4 className="forecast">Sunny</h4>
                            </div>
                        </li>
                        <li>
                            <div className="day">
                                <h4 className="weekday">Today</h4>
                                <h3 className="temperature">146°</h3>
                                <h4 className="forecast">Sunny</h4>
                            </div>
                        </li>
                        <li>
                            <div className="day">
                                <h4 className="weekday">Today</h4>
                                <h3 className="temperature">146°</h3>
                                <h4 className="forecast">Sunny</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="right">
                <Clocks />
            </div>
        </div>
    );
}

export default App;
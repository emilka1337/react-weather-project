import { useSelector } from "react-redux";

function TemperatureContainer({ temperature, main }) {
    const temperatureInF = useSelector((state) => state.settings.temperatureInF);

    return (
        <div className="temperature-container">
            <h3 className="temperature">
                {temperatureInF === false
                    ? temperature.toFixed(0)
                    : (temperature * (9 / 5) + 32).toFixed(0)}
                <span className="degree">°</span>
            </h3>
            <h3 className="main">{main}</h3>
        </div>
    );
}

export default TemperatureContainer;

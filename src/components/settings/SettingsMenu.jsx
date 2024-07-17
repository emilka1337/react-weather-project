import { useContext } from "react";
import { SettingsContext } from "../App";

function SettingsMenu(props) {
    let [appSettings, setAppSettings] = useContext(SettingsContext);

    const saveSettings = (settings) => {
        localStorage.setItem("weather-app-settings", JSON.stringify(settings));
    };

    const feelsLikeSettingClick = () => {
        let newSettings = {
            ...appSettings,
            showFeelsLikeField: !appSettings.showFeelsLikeField,
        };
        setAppSettings(newSettings);
        saveSettings(newSettings);
    };

    const temperatureScaleSettingSlick = () => {
        let newTempScaleSetting = appSettings.temperatureScale == "celsius" ? "fahrenheit" : "celsius";

        let newSettings = {
            ...appSettings,
            temperatureScale: newTempScaleSetting,
        };
        setAppSettings(newSettings);
        saveSettings(newSettings);
    };

    return (
        <div className={props.showSettings ? "settings-menu show" : "settings-menu"}>
            <ul>
                <li>
                    <h5>Show &quot;Feels like&quot; field under the main temperature</h5>
                    <button onClick={feelsLikeSettingClick}>{appSettings.showFeelsLikeField ? "ON" : "OFF"}</button>
                </li>
                <li>
                    <h5>Temperature scale</h5>
                    <button onClick={temperatureScaleSettingSlick}>
                        {appSettings.temperatureScale == "celsius" ? "C°" : "F°"}
                    </button>
                </li>
                <li>
                    <h5>Setting Name</h5>
                    <button>ON</button>
                </li>
                <li>
                    <h5>Setting Name</h5>
                    <button>ON</button>
                </li>
            </ul>
        </div>
    );
}

export default SettingsMenu;

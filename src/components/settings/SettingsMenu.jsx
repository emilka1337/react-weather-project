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

    const temperatureScaleSettingClick = () => {
        let newTempScaleSetting = appSettings.temperatureScale == "celsius" ? "fahrenheit" : "celsius";

        let newAppSettings = {
            ...appSettings,
            temperatureScale: newTempScaleSetting,
        }
        setAppSettings(newAppSettings);
        saveSettings(newAppSettings);
    };

    const speedUnitSettingClick = () => {
        let newspeedUnit = appSettings.speedUnit == "m/s" ? "km/h" : "m/s";

        let newAppSettings = {
            ...appSettings,
            speedUnit: newspeedUnit
        }
        setAppSettings(newAppSettings);
        saveSettings(newAppSettings)
    }

    return (
        <div className={props.showSettings ? "settings-menu show" : "settings-menu"}>
            <ul>
                <li>
                    <h5>Show &quot;Feels like&quot; field under the main temperature</h5>
                    <button
                        onClick={feelsLikeSettingClick}
                        className={appSettings.showFeelsLikeField ? "toggler toggled" : "toggler"}
                    >
                        <div className="circle"></div>
                    </button>
                </li>
                <li>
                    <h5>Temperature in F°</h5>
                    <button
                        onClick={temperatureScaleSettingClick}
                        className={appSettings.temperatureScale == "fahrenheit" ? "toggler toggled" : "toggler"}
                    >
                        <div className="circle"></div>
                    </button>
                </li>
                <li>
                    <h5>Wind speed in m/s</h5>
                    <button
                        onClick={speedUnitSettingClick}
                        className={appSettings.speedUnit == "m/s" ? "toggler toggled" : "toggler"}
                    >
                        <div className="circle"></div>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default SettingsMenu;

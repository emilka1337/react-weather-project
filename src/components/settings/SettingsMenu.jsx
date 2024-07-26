import { useContext, useState } from "react";
import { SettingsContext } from "../App";

function SettingsMenu(props) {
    let [appSettings, setAppSettings, defaultAppSettings] = useContext(SettingsContext);
    let [settingsResetted, setSettingsResetted] = useState(false);

    const saveSettings = (settings) => {
        localStorage.setItem("weather-app-settings", JSON.stringify(settings));
    };

    //#region Settings click event listeners
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
        };
        setAppSettings(newAppSettings);
        saveSettings(newAppSettings);
    };

    const speedUnitSettingClick = () => {
        let newspeedUnit = appSettings.speedUnit == "m/s" ? "km/h" : "m/s";

        let newAppSettings = {
            ...appSettings,
            speedUnit: newspeedUnit,
        };
        setAppSettings(newAppSettings);
        saveSettings(newAppSettings);
    };

    const showSecondsInClocksClick = () => {
        let newAppSettings = {
            ...appSettings,
            showSecondsInClocks: !appSettings.showSecondsInClocks,
        };
        setAppSettings(newAppSettings);
        saveSettings(newAppSettings);
    };

    const resetSettingsClick = () => {
        setAppSettings(defaultAppSettings);
        localStorage.removeItem("weather-app-settings");
        setSettingsResetted(true);
        setTimeout(() => setSettingsResetted(false), 3000);
    };
    //#endregion
    
    return (
        <div className={props.showSettings ? "settings-menu show" : "settings-menu"}>
            <ul>
                <li onClick={feelsLikeSettingClick}>
                    <h5>&quot;Feels like&quot; field</h5>
                    <button className={appSettings.showFeelsLikeField ? "toggler toggled" : "toggler"}>
                        <div className="circle"></div>
                    </button>
                </li>
                <li onClick={temperatureScaleSettingClick}>
                    <h5>Temperature in F°</h5>
                    <button className={appSettings.temperatureScale == "fahrenheit" ? "toggler toggled" : "toggler"}>
                        <div className="circle"></div>
                    </button>
                </li>
                <li onClick={speedUnitSettingClick}>
                    <h5>Wind speed in m/s</h5>
                    <button className={appSettings.speedUnit == "m/s" ? "toggler toggled" : "toggler"}>
                        <div className="circle"></div>
                    </button>
                </li>
                <li onClick={showSecondsInClocksClick}>
                    <h5>Show seconds in clocks</h5>
                    <button className={appSettings.showSecondsInClocks ? "toggler toggled" : "toggler"}>
                        <div className="circle"></div>
                    </button>
                </li>
                <li>
                    <h5>
                        Reset Settings <br />
                        <span>(try this if something not working properly)</span>
                    </h5>
                    <button
                        className={settingsResetted ? "reset-button resetted" : "reset-button"}
                        onClick={resetSettingsClick}
                    >
                        {settingsResetted ? "OK" : "Reset"}
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default SettingsMenu;

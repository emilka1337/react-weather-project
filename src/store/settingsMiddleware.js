const saveSettings = (settings) => {
    localStorage.setItem("weather-app-settings", JSON.stringify(settings));
};

const settingsMiddleware = (store) => {
    return (next) => {
        return (action) => {
            next(action);

            if (action.type.startsWith('settings/') && action.type != "settings/resetSettings") {
                console.log(action.type);
                const currentSettings = store.getState();
                saveSettings(currentSettings.settings.settings)
            } else if (action.type == "settings/resetSettings") {
                localStorage.removeItem("weather-app-settings");
            }
        }
    }
}

export default settingsMiddleware;

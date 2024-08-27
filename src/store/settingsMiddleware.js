const saveSettings = (settings) => {
    localStorage.setItem("weather-app-settings", JSON.stringify(settings));
};

const settingsMiddleware = (store) => {
    return (next) => {
        return (action) => {
            next(action);

            if (action.type.startsWith('settings/')) {
                const currentSettings = store.getState();
                saveSettings(currentSettings.settings.settings)
            }
        }
    }
}

export default settingsMiddleware;

const saveSettings = (settings) => {
    localStorage.setItem("weather-app-settings", JSON.stringify(settings));
};

const settingsMiddleware = (store) => {
    return (next) => {
        return (action) => {
            // console.log(action);
            // const result = next(action)
            // console.log(result);

            if (action.type.startsWith('settings/')) {
                const currentSettings = store.getState();
                saveSettings(currentSettings.settings.settings)
            }

            return next(action);
        }
    }
}

export default settingsMiddleware;

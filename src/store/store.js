import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./settingsSlice";
import settingsMiddleware from "./settingsMiddleware";
import alertsSlice from "./alertsSlice";
import selectedWeatherSlice from "./selectedWeatherSlice";
import forecastModeSlice from "./forecastModeSlice";
import geolocationSlice from "./geolocationSlice";

const store = configureStore({
    reducer: {
        settings: settingsSlice,
        alerts: alertsSlice,
        selectedWeather: selectedWeatherSlice,
        forecastMode: forecastModeSlice,
        geolocation: geolocationSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(settingsMiddleware),
})

export default store
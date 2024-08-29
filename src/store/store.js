import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./settingsSlice";
import settingsMiddleware from "./settingsMiddleware";
import alertsSlice from "./alertsSlice";
import selectedWeatherSlice from "./selectedWeatherSlice";

const store = configureStore({
    reducer: {
        settings: settingsSlice,
        alerts: alertsSlice,
        selectedWeather: selectedWeatherSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(settingsMiddleware),
})

export default store
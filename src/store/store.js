import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./settingsSlice";
import settingsMiddleware from "./settingsMiddleware";
import alertsSlice from "./alertsSlice";

const store = configureStore({
    reducer: {
        settings: settingsSlice,
        alerts: alertsSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(settingsMiddleware),
})

export default store
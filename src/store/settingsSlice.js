import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        settings:
            JSON.parse(localStorage.getItem("weather-app-settings"))
            ??
            {
                darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false,
                showFeelsLikeField: false,
                temperatureInF: false,
                speedUnitinMS: false,
                showSecondsInClocks: false,
            }
    },
    reducers: {
        toggleDarkMode(state, action) {
            state.settings.darkMode = !state.settings.darkMode;
        },
        toggleFeelsLikeField(state, action) {
            state.settings.showFeelsLikeField = !state.settings.showFeelsLikeField;
        },
        toggleTemperatureScale(state, action) {
            state.settings.temperatureInF = !state.settings.temperatureInF;
        },
        toggleSpeedUnit(state, action) {
            state.settings.speedUnitinMS = !state.settings.speedUnitinMS;
        },
        toggleSecondsInClock(state, action) {
            state.settings.showSecondsInClocks = !state.settings.showSecondsInClocks;
        },
        resetSettings(state, action) {
            state.settings = settingsSlice.getInitialState().settings;
        }
    }
})

export const { toggleDarkMode, toggleFeelsLikeField, toggleTemperatureScale, toggleSpeedUnit, toggleSecondsInClock, resetSettings } = settingsSlice.actions
export default settingsSlice.reducer
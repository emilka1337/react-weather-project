import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("weather-app-settings")) ?? {
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false,
    showFeelsLikeField: false,
    temperatureInF: false,
    speedUnitinMS: false,
    showSecondsInClocks: false,
}

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        ...initialState
    },
    reducers: {
        toggleDarkMode(state, action) {
            state.darkMode = !state.darkMode;
        },
        toggleFeelsLikeField(state, action) {
            state.showFeelsLikeField = !state.showFeelsLikeField;
        },
        toggleTemperatureScale(state, action) {
            state.temperatureInF = !state.temperatureInF;
        },
        toggleSpeedUnit(state, action) {
            state.speedUnitinMS = !state.speedUnitinMS;
        },
        toggleSecondsInClock(state, action) {
            state.showSecondsInClocks = !state.showSecondsInClocks;
        },
        resetSettings(state, action) {
            console.log(initialState)

            for (let key in initialState) {
                state[key] = initialState[key]
            }
        }
    }
})


export const { toggleDarkMode, toggleFeelsLikeField, toggleTemperatureScale, toggleSpeedUnit, toggleSecondsInClock, resetSettings } = settingsSlice.actions
export default settingsSlice.reducer
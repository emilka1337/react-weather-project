import { createSlice } from "@reduxjs/toolkit";

const selectedWeatherSlice = createSlice({
    name: "selectedWeather",
    initialState: {
        selectedWeather: 0
    },
    reducers: {
        setSelectedWeather(state, action) {
            state.selectedWeather = action.payload;
        }
    }
})

export const { setSelectedWeather } = selectedWeatherSlice.actions
export default selectedWeatherSlice.reducer
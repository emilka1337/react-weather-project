import { createSlice } from "@reduxjs/toolkit";

const selectedWeatherSlice = createSlice({
    name: "selectedWeather",
    initialState: 0,
    reducers: {
        setSelectedWeather: (state, action) => action.payload
    }
})

export const { setSelectedWeather } = selectedWeatherSlice.actions
export default selectedWeatherSlice.reducer
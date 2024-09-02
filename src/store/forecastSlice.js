import { createSlice } from "@reduxjs/toolkit";

const forecastSlice = createSlice({
    name: "forecastSlice",
    initialState: {
        list: []
    },
    reducers: {
        setForecast(state, action) {
            console.log(action.payload);
            state.list = action.payload.list
        }
    }
})

export const { setForecast } = forecastSlice.actions
export default forecastSlice.reducer
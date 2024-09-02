import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (lat, lon) => {
    let forecastURL = `${import.meta.env.VITE_BASE_URL
        }/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY
        }&units=metric`;
    let response = await fetch(forecastURL);
    let data = await response.json();

    console.log(data);
    return data
});
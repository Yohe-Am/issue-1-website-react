
import { createSlice } from '@reduxjs/toolkit';

const baseURL = "http://localhost:8080";

export const clientSlice = createSlice({
    name: 'main',
    initialState: {
        baseURL,
    }
});

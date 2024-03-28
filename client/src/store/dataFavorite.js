import { createSlice } from '@reduxjs/toolkit';
import {removeFromFavourites, updateData} from './actions';

const dataFavorite = createSlice({
    name: 'data',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateData.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(removeFromFavourites.fulfilled, (state, action) => {
                delete state[action.payload];
            });
    }
});

export default dataFavorite.reducer;



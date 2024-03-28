import { createSlice } from '@reduxjs/toolkit';
import { removeHotelList, updateHotelListData} from './actions';

const dataHotelList = createSlice({
    name: 'dataHotelList',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateHotelListData.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(removeHotelList.fulfilled, (state, action) => {
                delete state[action.payload];
            });
    }
});

export default dataHotelList.reducer;



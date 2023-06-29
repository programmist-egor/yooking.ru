import {createSlice} from "@reduxjs/toolkit";

const main = createSlice({
    name: 'main',
    initialState: {
        modalLang: false,
        modalMenu: false,
        modalSort: false,
        hotelCityId: null
    },
    reducers: {
        modalLangHandler(state, action) {
            state.modalLang = state.modalLang = action.payload
        },
        modalMenuHandler(state, action) {
            state.modalMenu = state.modalMenu = action.payload
        },
        modalSortHandler(state, action) {
            state.modalSort = state.modalSort = action.payload
        },
        handlerHotelCityId(state, action) {
            state.hotelCityId = state.hotelCityId = action.payload
        },
    }
});

export const {
    modalLangHandler,
    modalMenuHandler,
    handlerHotelCityId,
    modalSortHandler
} = main.actions;
export default main.reducer;
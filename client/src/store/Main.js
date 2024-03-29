import {createSlice} from "@reduxjs/toolkit";
import ru from "../assets/image/flags/ru.png"
const main = createSlice({
    name: 'main',
    initialState: {
        modalLang: false,
        modalMenu: false,
        modalSort: false,
        hotelCityId: null,
        loading: true,
        loadingUserMenu: false,
        countHotels: 0,
        langChoose: {id: 1, name: "Русский", img: ru},
        followUs: "",
        resultFollow: ""
    },
    reducers: {
        modalLangHandler(state, action) {
            state.modalLang = state.modalLang = action.payload
            state.modalMenu = state.modalMenu = false
        },
        modalMenuHandler(state, action) {
            state.modalLang = state.modalLang = false
            state.modalMenu = state.modalMenu = action.payload
        },
        modalSortHandler(state, action) {
            state.modalSort = state.modalSort = action.payload
        },
        handlerHotelCityId(state, action) {
            state.hotelCityId  = action.payload
        },
        handlerLoadingStartPage(state, action) {
            state.loading  = action.payload
        },
        handlerLoadingUserMenu(state, action) {
            state.loadingUserMenu  = action.payload
        },
        handlerCountHotels(state, action) {
            state.countHotels = state.countHotels = action.payload
        },
        handlerLangChoose(state, action) {
            state.langChoose  = action.payload
        },
        handlerFollowUs(state, action) {
            state.followUs = state.followUs = action.payload
        },
        handlerResultFollow(state, action) {
            state.resultFollow = state.resultFollow = action.payload
        },
    }
});

export const {
    modalLangHandler,
    handlerLoadingStartPage,
    handlerLoadingUserMenu,
    modalMenuHandler,
    handlerCountHotels,
    handlerLangChoose,
    handlerFollowUs,
    handlerResultFollow
} = main.actions;
export default main.reducer;
import {createSlice} from "@reduxjs/toolkit";

const hotels_list = createSlice({
    name: 'hotels_list',
    initialState: {
        metroShow: false,
        dataHotelsList: [],
        filteredHotels: null,
        copyDataHotelsList: [],
        loadingHotelList: false,
        loadingPageCityHotel: false,
        loadingList: {res: false, time: 6000},
        resultLoadData: true,
        itemPage: 0,
        countPage: null,
        showPlaceMark: false,
        showHotelMap: {lat: 0, lon: 0, zoom: 0},
        loadingMap: false
    },
    reducers: {
        showMetroHandler(state, action) {
            state.metroShow = state.metroShow = action.payload
        },
        showHotelMapHandler(state, action) {
            state.showHotelMap = state.showHotelMap = action.payload
        },
        showPlaceMarkHandler(state, action) {
            state.showPlaceMark = action.payload
        },
        resultLoadDataHandler(state, action) {
            state.resultLoadData = action.payload
        },
        pageSwitchingHandler(state, action) {
            state.itemPage = action.payload
        },
        loadingHotelListHandler(state, action) {
            state.loadingHotelList = action.payload
        },
        loadingPageCityHotelHandler(state, action) {
            state.loadingPageCityHotel = action.payload
        },
        loadingMapHandler(state, action) {
            state.loadingMap = action.payload
        },
        countPageHandler(state, action) {
            state.countPage = action.payload
        },
        setFilteredHotels(state, action) {
            state.filteredHotels = action.payload
        },
        loadingListHandler(state, action) {
            if (action.payload.type === "hotelList") {
                state.loadingList = action.payload.value
            }
            if (action.payload.type === "choosePage") {
                state.loadingList = action.payload.value
            }
        },
        dataHotelsListHandler(state, action) {
            console.log("HOTEL LIST", action.payload);
            if (action.payload.length === 0) {
                state.resultLoadData = false
            } else {
                state.dataHotelsList = action.payload
            }
        },
        copyDataHotelsListHandler(state, action) {
            state.copyDataHotelsList = action.payload
        },
        addFavoriteHandler(state, action) {
            const newArray = state.dataHotelsList.map(item => {
                if (item.id === action.payload.numberPage) {
                    item.hotels.map(i => {
                        if (i.hotelId === action.payload.id) {
                            i.favorite = !i.favorite
                        }
                    })
                }
                return item
            })
            state.dataHotelsList = state.dataHotelsList = newArray
        },
    }
});

export const {
    showMetroHandler,
    loadingPageCityHotelHandler,
    loadingHotelListHandler,
    addFavoriteHandler,
    dataHotelsListHandler,
    loadingListHandler,
    resultLoadDataHandler,
    pageSwitchingHandler,
    showHotelMapHandler,
    loadingMapHandler,
    showPlaceMarkHandler,
    countPageHandler,
    copyDataHotelsListHandler,
    setFilteredHotels
} = hotels_list.actions;
export default hotels_list.reducer;


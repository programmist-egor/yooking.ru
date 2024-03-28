import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import main from "./Main";
import filter from "./Filter";
import search from "./Search";
import hotels_list from "./HotelsList";
import hotels_item from "./HotelItem";
import client__data from "./ClientData"
import dataFavorite from "./dataFavorite"
import dataBooking from "./dataBooking";
import dataHotelList from "./dataHotelList"
import authReducer  from "./authSlice"

export default configureStore( {
    reducer: {
        main: main,
        filter: filter,
        search: search,
        hotels_list: hotels_list,
        hotels_item: hotels_item,
        client__data: client__data,
        data: dataFavorite,
        dataBooking: dataBooking,
        dataHotelList: dataHotelList,
        auth: authReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

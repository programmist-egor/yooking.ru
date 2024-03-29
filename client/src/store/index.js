import {configureStore} from "@reduxjs/toolkit";
import main from "./Main";
import filter from "./Filter";
import search from "./Search";
import hotels_list from "./HotelsList";
import hotels_item from "./HotelItem";
import client__data from "./ClientData"
import dataBooking from "./dataBooking";
import authReducer  from "./authSlice";

export default configureStore( {
    reducer: {
        main: main,
        filter: filter,
        search: search,
        hotels_list: hotels_list,
        hotels_item: hotels_item,
        client__data: client__data,
        dataBooking: dataBooking,
        auth: authReducer
    },

})

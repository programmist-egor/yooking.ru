import {createSlice} from "@reduxjs/toolkit";
import getCookie from "../components/hooks/getCookie";
import {ref, update} from "firebase/database";
import {database} from "../firebase";

const client__data = createSlice({
    name: 'main',
    initialState: {
        dateClient:
            {
                auth: false,
                email: "",
                name: "",
                phone: "",
                token: "",
                userid: ""
            },
        link: "/",
        bookingDetail: [],
        dataHotel: [],
        uid: "",
        phoneUser: "",
        checkIn: "",
        checkOut: "",
        countNight: 0,
        checkInput: false,
        finishedBooking: false,
        bookingUserData: [],
        favoriteUserData: [],
        favoriteUserDataDB: [],
        loaderFavoriteAndBooking: false
    },
    reducers: {
        dateClientHandler(state, action) {
            state.dateClient = action.payload
        },
        setClientHandler(state, action) {
            if(action.payload.id === "name") {
                state.dateClient.name = action.payload.value
            }
            if(action.payload.id === "phone") {
                state.dateClient.phone = action.payload.value
            }
            if(action.payload.id === "email") {
                state.dateClient.email = action.payload.value
            }
        },
        dataHotelUserHandler(state, action) {
            state.dataHotel = state.dataHotel = action.payload
        },
        loaderFavoriteAndBookingHandler(state, action) {
            state.loaderFavoriteAndBooking = action.payload
        },
        phoneUserHandler(state, action) {
            state.phoneUser = action.payload
        },
        linkUserHandler(state, action) {
            state.link = action.payload
        },
        setUidHandler(state, action) {
            state.uid = action.payload
        },
        bookingDetailHandler(state, action) {
            state.bookingDetail = action.payload
        },
        authorizationHandler(state, action) {
            state.authorization = action.payload
        },
        checkInHandler(state, action) {
            state.checkIn = action.payload
        },
        checkOutHandler(state, action) {
            state.checkOut = action.payload
        },
        checkHandler(state, action) {
            state.checkInput = action.payload
        },
        finishedBookingHandler(state, action) {
            state.finishedBooking = action.payload
        },
        //Добавление забронированных отелей
        bookingUserDataHandler(state, action) {
            const newArray = state.bookingUserData
            newArray.push(action.payload)
            state.bookingUserData = newArray
        },
        favoriteUserDataDB(state, action) {
            state.favoriteUserDataDB = action.payload
        },
        //Удаление забронированных отелей
        delBookingUserDataHandler(state, action) {
            const newArray = state.bookingUserData
            const idx = newArray.findIndex(index => index.value.idObject === action.payload)
            //Удаление массива по индексу
            newArray.splice(idx, 1);
            state.bookingUserData = newArray
        },
        //Добавление забронированных отелей
        addFavoriteUserDataHandler(state, action) {
            const newArray = state.favoriteUserData
            newArray.push(action.payload)

            state.favoriteUserData = newArray
        },
        //Добавление забронированных отелей
        delFavoriteUserDataHandler(state, action) {
            const newArray = state.favoriteUserData
            const idx = newArray.findIndex(index => index.idObject === action.payload)
            //Удаление массива по индексу
            newArray.splice(idx, 1);

            console.log("Данные обновлены")
            state.favoriteUserData = newArray
        },
    }
});

export const {
    dateClientHandler,
    bookingDetailHandler,
    loaderFavoriteAndBookingHandler,
    favoriteUserDataDB,
    setUidHandler,
    phoneUserHandler,
    linkUserHandler,
    setClientHandler,
    addFavoriteUserDataHandler,
    delFavoriteUserDataHandler,
    delBookingUserDataHandler,
    finishedBookingHandler,
    bookingUserDataHandler,
    checkHandler,
    checkInHandler,
    checkOutHandler,
    authorizationHandler,
    dataHotelUserHandler,
} = client__data.actions;
export default client__data.reducer;
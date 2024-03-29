import {createSlice} from "@reduxjs/toolkit";
import { dateFormater, monthText} from "../utils/dataFormater";

const search = createSlice({
    name: 'search',
    initialState: {
        showListSearch: false,
        showCalendar: false,
        showGuest: false,
        banner: null,
        cityOrHotel: {
            city: {city: "", hotelId: "", location: {}},
            dataRange:{checkIn: new Date().getDate(), checkOut: new Date().getDate() + 2, month: monthText(new Date().getMonth()), countNight: 2},
            guest: {adult: 1, child: []},
            checkIn: dateFormater(new Date()),
            checkOut: dateFormater(new Date(new Date().setDate(new Date().getDate() + 2))),
        },
        checkIn: "",
        checkOut: ""
    },
    reducers: {
        setBannerHandler(state, action) {
            state.banner =  action.payload
        },
        showListSearchHandler(state, action) {
            state.showListSearch = state.showListSearch = action.payload
        },
        initDateRangeHandler(state, action) {
            const start = new Date().getDate()
            const end = new Date().getDate() + 2
            const month = new Date().getMonth()


            const dayMonth = (value) => {
                switch (value) {
                    case 0:
                        return "янв.";
                    case 1:
                        return "фев.";
                    case 2:
                        return "мар.";
                    case 3:
                        return "апр.";
                    case 4:
                        return "май.";
                    case 5:
                        return "июн.";
                    case 6:
                        return "июл.";
                    case 7:
                        return "авг.";
                    case 8:
                        return "сен.";
                    case 9:
                        return "окт.";
                    case 10:
                        return "ноя.";
                    case 11:
                        return "дек.";
                }
            }

            state.cityOrHotel.dataRange = {checkIn: start, checkOut: end, month: dayMonth(month), countNight: 2}
        },
        checkOutHandler(state, action) {
            state.checkOut = state.checkOut = action.payload
        },
        checkInHandler(state, action) {
            state.checkIn = state.checkIn = action.payload
        },
        showGuestHandler(state, action) {
            state.showGuest = state.showGuest = action.payload
        },
        showCalendarHandler(state, action) {
            state.showCalendar = state.showCalendar = action.payload
        },
        cityOrHotelHandler(state, action) {
            state.cityOrHotel.city = action.payload
        },
        cityOrHotelInput(state, action) {
            state.cityOrHotel.city = action.payload
        },
        requestParameterHandler(state, action) {
            state.cityOrHotel = action.payload
        },
        handlerDataRange(state, action) {
            state.cityOrHotel.dataRange = action.payload.dataRange
            state.cityOrHotel.checkIn = action.payload.checkIn
            state.cityOrHotel.checkOut = action.payload.checkOut
        },
        handlerAddGuest(state, action) {
            if (state.cityOrHotel.guest.adult >= 6) {
                state.cityOrHotel.guest.adult = 6
            } else {
                state.cityOrHotel.guest.adult += action.payload
            }
        },
        handlerDelGuest(state, action) {
            if (state.cityOrHotel.guest.adult <= 1) {
                state.cityOrHotel.guest.adult = 1
            } else {
                state.cityOrHotel.guest.adult -= action.payload
            }

        },
        handlerAddChild(state, action) {
            if (state.cityOrHotel.guest.child.length >= 5) {
                state.cityOrHotel.guest.child.length = 5
            } else {
                const newArray = state.cityOrHotel.guest.child
                newArray.push({id: action.payload, old: 'Возраст'});
                state.cityOrHotel.guest.child = newArray
            }
        },
        handlerDelChild(state, action) {
            if (state.cityOrHotel.guest.child.length <= 0) {
                state.cityOrHotel.guest.child.length = 0
            } else {
                const newArray = state.cityOrHotel.guest.child
                newArray.pop();
                state.cityOrHotel.guest.child = newArray
            }

        },
        handlerEditOldChild(state, action) {
            const newArray = state.cityOrHotel.guest.child.map(item => {
                if (action.payload.idChild === item.id) {
                    item.old = action.payload.old
                }
                return item
            })
            state.cityOrHotel.guest.child = newArray
        },
    }
});

export const {
    setBannerHandler,
    requestParameterHandler,
    showListSearchHandler,
    cityOrHotelHandler,
    showCalendarHandler,
    handlerDataRange,
    showGuestHandler,
    handlerEditOldChild,
    handlerAddGuest,
    handlerDelGuest,
    handlerAddChild,
    handlerDelChild,
    checkOutHandler,
    checkInHandler,
    cityOrHotelInput,
    initDateRangeHandler
} = search.actions;
export default search.reducer;
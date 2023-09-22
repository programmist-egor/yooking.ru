import {createSlice} from "@reduxjs/toolkit";

const hotels_item = createSlice({
    name: 'hotels_item',
    initialState: {
        dataHotel: null,
        showCalendar: false,
        showGuest: false,
        cityOrHotel: {
            hotelAndCity: {city: {name: "", id: 0, countHotels: 0, location: {},}, hotel: {name: "", location: {}, id: 0}},
            dataRange: {checkIn: "", checkOut: "", month: "", countNight: 6},
            guest: {adult: 1, child: []}
        },
        checkIn: "",
        checkOut: "",
        loadingList: {res: false, time: 6000},
        mobileCodeModal: false,
        //Таймер
        isCounting: false,
    },
    reducers: {
        dataHotelHandler(state, action) {
            state.dataHotel = state.dataHotel = action.payload
        },
        showListSearchHandler(state, action) {
            state.showListSearch = state.showListSearch = action.payload
        },
        mobileCodeModalHandler(state, action) {
            state.mobileCodeModal = action.payload
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
            if (action.payload.cityAndHotel === "city") {
                state.cityOrHotel.hotelAndCity.city = action.payload.value
            } else {
                state.cityOrHotel.hotelAndCity.hotel = action.payload.value
            }

        },
        cityOrHotelInput(state, action) {
            state.cityOrHotel.hotelAndCity.city.name = action.payload
        },
        handlerDataRange(state, action) {
            console.log(action.payload);
            state.cityOrHotel.dataRange  = {checkIn: action.payload.checkIn, checkOut: action.payload.checkOut, month: action.payload.month, countNight: action.payload.countNight}
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
        loadingListHandler(state, action) {
            if (action.payload.type === "hotelList") {
                state.loadingList = action.payload.value
            }
            if (action.payload.type === "choosePage") {
                state.loadingList = action.payload.value
            }
        },
        handlerIsCounting(state, action) {
            state.isCounting = state.isCounting = action.payload
        },
    }
});

export const {
    dataHotelHandler,
    showListSearchHandler,
    initDateRangeHandler,
    checkOutHandler,
    checkInHandler,
    loadingListHandler,
    showCalendarHandler,
    handlerDataRange,
    showGuestHandler,
    handlerEditOldChild,
    handlerAddGuest,
    handlerDelGuest,
    handlerAddChild,
    handlerDelChild,
    handlerIsCounting,
    cityOrHotelInput,
    mobileCodeModalHandler

} = hotels_item.actions;
export default hotels_item.reducer;


import {createSlice} from "@reduxjs/toolkit";

const filter = createSlice({
    name: 'filter',
    initialState: {
        rangeValueStart: 0,
        rangeValueEnd: 100000,
        initFilter: null,
        typeObject: [],
        reviewScore: [],
        distance: [],
        stars: [],
        politicalCancel: [],
        nutrition: [],
        shortFacilities: [],
        listFilter: [
            {
                id: 0, header: "Варианты жилья", options: [
                    {id: 0, name: "Отели", result: false, value: "hotel", count: ""},
                    {id: 1, name: "Хостелы", result: false, value: "hostel", count: ""},
                    {id: 2, name: "Апартаменты, квартиры", result: false, value: "apartment", count: ""},
                    {id: 3, name: "Апарт-отели", result: false, value: "apartmen_hotel", count: ""},
                    {id: 4, name: "Гостевые дома", result: false, value: "guest_house", count: ""},
                ]
            },
            {
                id: 1, header: "Количество звезд", options: [
                    {id: 0, name: "Без звезд", result: false, value: "без звезд", count: ""},
                    {id: 1, name: "1 звезда", result: false, value: "1 звезда", count: ""},
                    {id: 2, name: "2 звезды", result: false, value: "2 звезды", count: ""},
                    {id: 3, name: "3 звезды", result: false, value: "3 звезды", count: ""},
                    {id: 4, name: "4 звезды", result: false, value: "4 звезды", count: ""},
                    {id: 5, name: "5 звезд", result: false, value: "5 звезд", count: ""},
                ]
            },
            {
                id: 2, header: "Оценка по отзывам", options: [
                    {id: 0, name: "Превосходно 9+", result: false, value: 9, count: ""},
                    {id: 1, name: "Очень хорошо 8+", result: false, value: 8, count: ""},
                    {id: 2, name: "Хорошо 7+", result: false, value: 7, count: ""},
                    {id: 3, name: "Достаточно хорошо 6+", result: false, value: 6, count: ""},
                ]
            },
            {
                id: 3, header: "Расстояние от центра города", options: [
                    {id: 0, name: "Меньше 1 км", result: false, value: 1, count: ""},
                    {id: 1, name: "Меньше 3 км", result: false, value: 3, count: ""},
                    {id: 2, name: "Меньше 5 км", result: false, value: 5, count: ""},
                ]
            },
            {
                id: 4, header: "Политика отмены", options: [
                    {id: 0, name: "Без предоплаты", result: false, value: "withoutPrepayment", count: ""},
                    {id: 1, name: "Оплата заранее", result: false, value: "paymentInAdvance", count: ""},
                    {id: 2, name: "Бесплатная отмена", result: false, value: "freeCancellation", count: ""},
                ]
            },
            {
                id: 5, header: "Питание", options: [
                    {id: 0, name: "Завтрак включен", result: false, value: "breakfastIncluded", count: ""},
                    {
                        id: 1,
                        name: "Включен завтрак и ужин",
                        result: false,
                        value: "breakfastAndDinnerIncluded",
                        count: ""
                    },
                    {id: 2, name: "С собственной кухней", result: false, value: "withOwnKitchen", count: ""},
                ]
            },
            {
                id: 6, header: "Удобства", options: [
                    {id: 0, name: "Номера для некурящих", result: false, value: "noSmoking", count: ""},
                    {id: 1, name: "Трансфер от/до аэропорта", result: false, value: "transferAirport", count: ""},
                    {id: 2, name: "Парковка", result: false, value: "parking", count: ""},
                    {id: 3, name: "Круглосуточная стойка регистрации", result: false, value: "reseption", count: ""},
                    {id: 4, name: "Семейные номера", result: false, value: "familyNumber", count: ""},
                    {id: 5, name: "Доставка еды в номер", result: false, value: "foodDelivery", count: ""},
                    {id: 6, name: "Можно с питомцами", result: false, value: "pets", count: ""},
                    {id: 7, name: "Ресторан", result: false, value: "restaurant", count: ""},
                    {id: 8, name: "Бассейн", result: false, value: "pool", count: ""},
                    {id: 9, name: "Фитнесс - центр", result: false, value: "fitness", count: ""},
                    {id: 10, name: "Спа и оздоровительный центр", result: false, value: "spa", count: ""},
                    {id: 11, name: "Wi-Fi в номере", result: false, value: "wiFiInRoom", count: ""},
                ]
            },
            // {
            //     id: 7, header: "Район", options: [
            //         {id: 0, name: "Выборский", result: false, count: "10"},
            //         {id: 1, name: "Кировский", result: false, count: "10"},
            //         {id: 2, name: "Невский", result: false, count: "10"},
            //     ]
            // },
        ],
        bedroomCount: 1,
    },
    reducers: {
        initFilterHandler(state, action) {
            state.initFilter = action.payload
        },
        rangeValueStartHandler(state, action) {
            state.rangeValueStart = action.payload
        },
        rangeValueEndHandler(state, action) {
            state.rangeValueEnd = action.payload
        },
        typeObjectHandler(state, action) {
            state.typeObject = action.payload
        },
        reviewScoreHandler(state, action) {
            state.reviewScore = action.payload
        },
        distanceHandler(state, action) {
            state.distance = action.payload
        },
        starsHandler(state, action) {
            state.stars = action.payload
        },
        politicalCancelHandler(state, action) {
            state.politicalCancel = action.payload
        },
        nutritionHandler(state, action) {
            state.nutrition = action.payload
        },
        shortFacilitiesHandler(state, action) {
            state.shortFacilities = action.payload
        },
        countHandler(state, action) {
            // const newArray = []
            //
            // action.payload.map(item => {
            //     item.hotels.map(hotels => {
            //         newArray.push(hotels)
            //     })
            // })
            //
            const counters = [
                {},
            ]

            for (let i = 0; i < 1; i++) {
                state.listFilter.map(item => {
                    if (item.id === i) {
                        item.options.map(options => {
                            if (options.value === counters[i].option[options.id].value) {
                                options.count = counters[i].option[options.id].count
                            }
                        })
                    }
                    return item
                })
            }
        },
        countOtherSortHandler(state, action) {
            console.log("action.payload", action.payload);

            const counters = [
                {
                    id: 0, option: [
                        {
                            id: 0,
                            value: "hotel",
                            count: action.payload.filter(i => i.property_type === "hotel").length
                        },
                        {
                            id: 1,
                            value: "hostel",
                            count: action.payload.filter(i => i.property_type === "hostel").length
                        },
                        {
                            id: 2,
                            value: "apartment",
                            count: action.payload.filter(i => i.property_type === "apartment").length
                        },
                        {
                            id: 3,
                            value: "apartmen_hotel",
                            count: action.payload.filter(i => i.property_type === "apartmen_hotel").length
                        },
                        {
                            id: 4,
                            value: "guest_house",
                            count: action.payload.filter(i => i.property_type === "guest_house").length
                        }
                    ]
                },
                {
                    id: 1, option: [
                        {id: 0, value: "без звезд", count: action.payload.filter(i => i.stars === "без звезд").length},
                        {id: 1, value: "1 звезда", count: action.payload.filter(i => i.stars === "1 звезда").length},
                        {id: 2, value: "2 звезды", count: action.payload.filter(i => i.stars === "2 звезды").length},
                        {id: 3, value: "3 звезды", count: action.payload.filter(i => i.stars === "3 звезды").length},
                        {id: 4, value: "4 звезды", count: action.payload.filter(i => i.stars === "4 звезды").length},
                        {id: 5, value: "5 звезд", count: action.payload.filter(i => i.stars === "5 звезд").length}
                    ]
                },
                {
                    id: 2, option: [
                        {id: 0, value: 9, count: action.payload.filter(i => i.rating >= 9).length},
                        {id: 1, value: 8, count: action.payload.filter(i => i.rating >= 8 && i.rating < 9).length},
                        {id: 2, value: 7, count: action.payload.filter(i => i.rating >= 7 && i.rating < 8).length},
                        {id: 3, value: 6, count: action.payload.filter(i => i.rating >= 6 && i.rating < 7).length},
                    ]
                },
                {
                    id: 3, option: [
                        {id: 0, value: 1, count: action.payload.filter(i => i.distance <= 1).length},
                        {id: 1, value: 3, count: action.payload.filter(i => i.distance >= 1 && i.distance <= 3).length},
                        {id: 2, value: 5, count: action.payload.filter(i => i.distance >= 3 && i.distance <= 5).length},
                    ]
                },
                {
                    id: 4, option: [
                        {
                            id: 0,
                            value: "withoutPrepayment",
                            count: action.payload.filter(i => i.political_cancel.includes("withoutPrepayment")).length
                        },
                        {
                            id: 1,
                            value: "paymentInAdvance",
                            count: action.payload.filter(i => i.political_cancel.includes("paymentInAdvance")).length
                        },
                        {
                            id: 2,
                            value: "freeCancellation",
                            count: action.payload.filter(i => i.political_cancel.includes("freeCancellation")).length
                        },
                    ]
                },
                {
                    id: 5, option: [
                        {
                            id: 0,
                            value: "breakfastIncluded",
                            count: action.payload.filter(i => i.nutrition.includes("breakfastIncluded")).length
                        },
                        {
                            id: 1,
                            value: "breakfastAndDinnerIncluded",
                            count: action.payload.filter(i => i.nutrition.includes("breakfastAndDinnerIncluded")).length
                        },
                        {id: 2, value: "withOwnKitchen", count: action.payload.filter(i => i.nutrition.includes("withOwnKitchen")).length},
                    ]
                },
                {
                    id: 6, option: [
                        {id: 0, value: "noSmoking", count: action.payload.filter(i => i.shortFacilities.includes("noSmoking")).length},
                        {
                            id: 1,
                            value: "transferAirport",
                            count: action.payload.filter(i => i.shortFacilities.includes("transferAirport")).length
                        },
                        {id: 2, value: "parking", count: action.payload.filter(i => i.shortFacilities.includes("parking")).length},
                        {id: 3, value: "reseption", count: action.payload.filter(i => i.shortFacilities.includes("reseption")).length},
                        {
                            id: 4,
                            value: "familyNumber",
                            count: action.payload.filter(i => i.shortFacilities.includes("familyNumber")).length
                        },
                        {
                            id: 5,
                            value: "foodDelivery",
                            count: action.payload.filter(i => i.shortFacilities.includes("foodDelivery")).length
                        },
                        {id: 6, value: "pets", count: action.payload.filter(i => i.shortFacilities.includes("pets")).length},
                        {id: 7, value: "restaurant", count: action.payload.filter(i => i.shortFacilities.includes("restaurant")).length},
                        {id: 8, value: "pool", count: action.payload.filter(i => i.shortFacilities.includes("pool")).length},
                        {id: 9, value: "fitness", count: action.payload.filter(i => i.shortFacilities.includes("fitness")).length},
                        {id: 10, value: "spa", count: action.payload.filter(i => i.shortFacilities.includes("spa")).length},
                        {
                            id: 11,
                            value: "wiFiInRoom",
                            count: action.payload.filter(i => i.shortFacilities.includes("wiFiInRoom")).length
                        },
                    ]
                },
            ]

            for (let i = 0; i < 7; i++) {
                state.listFilter.map(item => {
                    if (item.id === i) {
                        item.options.map(options => {
                            if (options.value === counters[i].option[options.id].value) {
                                options.count = counters[i].option[options.id].count
                            }
                        })
                    }
                    return item
                })
            }
        },
        chooseParamHandler(state, action) {
            const newArray = state.listFilter.map(item => {
                if (item.id === action.payload.idBlock) {
                    item.options.map(i => {
                        if (i.id === action.payload.idElement) {
                            i.result = !i.result
                        }
                    })
                }
                return item
            })

            state.listFilter = state.listFilter = newArray
        },
        resetParamHandler(state, action) {
            const newArray = state.listFilter.map(item => {
                item.options.map(i => {
                    i.result = false
                })
                return item
            })

            state.listFilter = state.listFilter = newArray
        },
        handlerHotelCityId(state, action) {
            state.hotelCityId = state.hotelCityId = action.payload
        },
        handlerAddBedroom(state, action) {
            if (state.bedroomCount >= 4) {
                state.bedroomCount = 4
            } else {
                state.bedroomCount += action.payload
            }
        },
        handlerDelBedroom(state, action) {
            if (state.bedroomCount <= 1) {
                state.bedroomCount = 1
            } else {
                state.bedroomCount -= action.payload
            }

        },
    }
});

export const {
    initFilterHandler,
    typeObjectHandler,
    reviewScoreHandler,
    distanceHandler,
    starsHandler,
    politicalCancelHandler,
    nutritionHandler,
    shortFacilitiesHandler,
    rangeValueStartHandler,
    rangeValueEndHandler,
    countHandler,
    countOtherSortHandler,
    chooseParamHandler,
    resetParamHandler,
    handlerAddBedroom,
    handlerDelBedroom
} = filter.actions;
export default filter.reducer;
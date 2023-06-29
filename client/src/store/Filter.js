import {createSlice} from "@reduxjs/toolkit";

const filter = createSlice({
    name: 'filter',
    initialState: {
        rangeValue: [4000, 40000],
        countBedrooms: 0,
        listFilter: [
            {
                id: 0, header: "Варианты жилья", options: [
                    {id: 0, name: "Отели", result: false, count: "350"},
                    {id: 1, name: "Хостелы", result: false, count: "490"},
                    {id: 2, name: "Апартаменты", result: false, count: "330"},
                    {id: 3, name: "Квартиры", result: false, count: "679"},
                    {id: 4, name: "Гостевые дома", result: false, count: "157"},
                ]
            },
            {
                id: 1, header: "Количество звезд", options: [
                    {id: 0, name: "Без звезд", result: false, count: "10"},
                    {id: 1, name: "2 звезды", result: false, count: "10"},
                    {id: 2, name: "3 звезды", result: false, count: "10"},
                    {id: 3, name: "4 звезды", result: false, count: "10"},
                    {id: 4, name: "5 звезд", result: false, count: "10"},
                ]
            },
            {
                id: 2, header: "Оценка по отзывам", options: [
                    {id: 0, name: "Превосходно 9+", result: false, count: "10"},
                    {id: 1, name: "Очень хорошо 8+", result: false, count: "10"},
                    {id: 2, name: "Хорошо 7+", result: false, count: "10"},
                    {id: 3, name: "Достаточно хорошо 6+", result: false, count: "10"},
                ]
            },
            {
                id: 3, header: "Расстояние от центра города", options: [
                    {id: 0, name: "Меньше 1 км", result: false, count: "10"},
                    {id: 1, name: "Меньше 3 км", result: false, count: "10"},
                    {id: 2, name: "Меньше 5 км", result: false, count: "10"},
                ]
            },
            {
                id: 4, header: "Политика отмены", options: [
                    {id: 0, name: "Без предоплаты", result: false, count: "10"},
                    {id: 1, name: "Оплата заранее", result: false, count: "10"},
                    {id: 2, name: "Бесплатная отмена", result: false, count: "10"},
                ]
            },
            {
                id: 5, header: "Питание", options: [
                    {id: 0, name: "Завтрак включен", result: false, count: "10"},
                    {id: 1, name: "Включен завтрак и ужин", result: false, count: "10"},
                    {id: 2, name: "С собственной кухней", result: false, count: "10"},
                ]
            },
            {
                id: 6, header: "Удобства", options: [
                    {id: 0, name: "Номера для некурящих", result: false, count: "10"},
                    {id: 1, name: "Трансфер от/до аэропорта", result: false, count: "10"},
                    {id: 2, name: "Парковка", result: false, count: "10"},
                    {id: 3, name: "Круглосуточная стойка регистрации", result: false, count: "10"},
                    {id: 4, name: "Семейные номера", result: false, count: "10"},
                    {id: 5, name: "Доставка еды в номер", result: false, count: "10"},
                    {id: 6, name: "Можно с питомцами", result: false, count: "10"},
                    {id: 7, name: "Ресторан", result: false, count: "10"},
                    {id: 8, name: "Бассейн", result: false, count: "10"},
                    {id: 9, name: "Фитнесс - центр", result: false, count: "10"},
                    {id: 10, name: "Спа и оздоровительный центр", result: false, count: "10"},
                ]
            },
            {
                id: 7, header: "Район", options: [
                    {id: 0, name: "Выборский", result: false, count: "10"},
                    {id: 1, name: "Кировский", result: false, count: "10"},
                    {id: 2, name: "Невский", result: false, count: "10"},
                ]
            },
        ],
    },
    reducers: {
        rangeValueHandler(state, action) {
            state.rangeValue = state.rangeValue = action.payload
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
    rangeValueHandler,
    modalMenuHandler,
    handlerHotelCityId,
    modalSortHandler
} = filter.actions;
export default filter.reducer;
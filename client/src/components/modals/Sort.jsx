import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    countPageHandler, dataHotelsListHandler, loadingHotelListHandler,

    pageSwitchingHandler,
    showHotelMapHandler
} from "../../store/HotelsList";
import { countOtherSortHandler} from "../../store/Filter";
import "./Modals.css"

export const Sort = ({style, handleSort}) => {
    const dispatch = useDispatch()
    const [dataHotel, setDataHotel] = useState([])
    const [active, setActive] = useState([{id: 1, active: false}, {id: 2, active: true}, {id: 3, active: false}])
    const dataHotelsList = useSelector(state => state.hotels_list.dataHotelsList)
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)

    const updateHoleList = () => {
        //Возврат на первую страницу
        dispatch(pageSwitchingHandler(0))
        //Лоадеры
        dispatch(loadingHotelListHandler(true))
        setTimeout(() => {
            dispatch(loadingHotelListHandler(false))
        }, 300)
        //Обновление местоположения
        dispatch(showHotelMapHandler(
            {
                lat: cityOrHotel.city.location.lat,
                lon: cityOrHotel.city.location.lon,
                zoom: 13
            }))
    }
    //Сортировка по страницам
    const sortPage = (array) => {
        const newArray = []
        //Распределение по страницам
        const length = array.length;
        const step = 25;
        let res = length / step
        const countPage = Math.floor(res);

        let stepStart = 0
        let stepEnd = 25

        for (let i = 0; i < countPage + 1; i++) {
            newArray.push({
                id: i,
                hotels: array.slice(stepStart, stepEnd)
            })
            stepStart += 25
            stepEnd += 25
        }
        dispatch(countPageHandler(countPage + 1))
        //Обновление количества отелей в списке параметров
        dispatch(countOtherSortHandler(newArray))
        dispatch(dataHotelsListHandler(newArray))
    }
    useEffect(() => {
        //Базовые данные
        const baseData = []
        dataHotelsList.map(item => {
            item.hotels.map(hotels => {
                baseData.push(hotels)
            })
        })
        setDataHotel(baseData)
    }, [dataHotelsList])

    const activeButtonSort = (id) => {
        const newArray = active.map(item => {
            if (item.id === id) {
                item.active = true
            }
            return item
        })
        const arr = newArray.map(item => {
            if (item.id !== id) {
                item.active = false
            }
            return item
        })
        setActive(arr)
    }

    const sortedOnPrice = (id) => {
        const sorted = [...dataHotel].sort((a, b) => a.last_price_info.price - b.last_price_info.price);
        activeButtonSort(id)
        updateHoleList()
        sortPage(sorted)
    }
    const sortedOnReviews = (id) => {
        const sorted = [...dataHotel].sort((a, b) => b.countReviews[0].rating - a.countReviews[0].rating);
        activeButtonSort(id)
        updateHoleList()
        sortPage(sorted)
    }
    const sortedOnReviewsAndPrice = (id) => {
        const price = [...dataHotel].sort((a, b) => a.last_price_info.price - b.last_price_info.price);
        const reviews = [...price].sort((a, b) => b.countReviews[0].rating - a.countReviews[0].rating);
        activeButtonSort(id)
        updateHoleList()
        sortPage(reviews)
    }

    return (
        <div>
            <div className={style} onClick={handleSort}>
                <div className="modal__content__sort tablet__661__filter">
                    <div className="modal__body">
                        <div
                            className="row__c__c bgHover"
                            onClick={() => sortedOnReviews(1)}
                            style={{cursor: "pointer", fontWeight: active[0].active ? "bold" : ""}}>
                            <span className="text__content__black__14">Лучший по отзывам</span>
                        </div>
                        <div
                            className="row__c__c bgHover"
                            onClick={() => sortedOnPrice(2)}
                            style={{
                                cursor: "pointer",
                                fontWeight: active[1].active ? "bold" : "",
                            }}
                        >
                            <span className="text__content__black__14">Лучший по цене</span>
                        </div>
                        <div
                            className="row__c__c bgHover"
                            onClick={() => sortedOnReviewsAndPrice(3)}
                            style={{
                                cursor: "pointer",
                                fontWeight: active[2].active ? "bold" : ""
                            }}
                        >
                            <span className="text__content__black__14">Лучшие отзывы и цена</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="column mobile__0_660__filter">
                <div className="row__c__c">
                    <h3 className="text__content__black__b__20">Сортировка</h3>
                </div>
                <div
                    className="row__c__c bgHover"
                    onClick={() => sortedOnReviews(1)}
                    style={{
                        cursor: "pointer",
                        fontWeight: active[0].active ? "bold" : ""
                    }}
                >
                    <span className="text__content__black__14">Лучший по отзывам</span>
                </div>
                <div
                    className="row__c__c bgHover"
                    onClick={() => sortedOnPrice(2)}
                    style={{
                        cursor: "pointer",
                        fontWeight: active[1].active ? "bold" : "",
                    }}
                >
                    <span className="text__content__black__14">Лучший по цене</span>
                </div>
                <div
                    className="row__c__c bgHover"
                    onClick={() => sortedOnReviewsAndPrice(3)}
                    style={{
                        cursor: "pointer",
                        fontWeight: active[2].active ? "bold" : ""
                    }}
                >
                    <span className="text__content__black__14">Лучшие отзывы и цена</span>
                </div>
            </div>
        </div>

    )
}
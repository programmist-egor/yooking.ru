import Slider from '@mui/material/Slider';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import line2 from "../../img/line2.png"
import {useDispatch, useSelector} from "react-redux";
import {
    countHandler,
    countOtherSortHandler,
    rangeValueEndHandler,
    rangeValueHandler,
    rangeValueStartHandler
} from "../../store/Filter";
import {GREY_BLACK} from "../../theme/colors";
import {
    countPageHandler,
    dataHotelsListHandler, loadingHotelListHandler,
    loadingListHandler,
    loadingMapHandler,
    pageSwitchingHandler, showHotelMapHandler
} from "../../store/HotelsList";
import {pageDistribution} from "../utils/search-hotels";

const theme = createTheme({
    palette: {
        secondary: {
            main: GREY_BLACK,
        },
    },
});

export const RangePrice = () => {
    const dispatch = useDispatch()
    const rangeValueStart = useSelector(state => state.filter.rangeValueStart)
    const rangeValueEnd = useSelector(state => state.filter.rangeValueEnd)
    const dataHotelsList = useSelector(state => state.hotels_list.dataHotelsList)
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const copyDataHotelsList = useSelector(state => state.hotels_list.copyDataHotelsList)

    const updateHoleList = () => {
        //Возврат на первую страницу
        dispatch(pageSwitchingHandler(0))
        //Лоадеры
        dispatch(loadingHotelListHandler(true))
        setTimeout(() => {
            dispatch(loadingHotelListHandler(false))
        }, 300)
        dispatch(loadingMapHandler(true))
        setTimeout(() => {
            dispatch(loadingMapHandler(false))
        }, 300)
        // Обновление местоположения
        dispatch(showHotelMapHandler(
            {
                lat: cityOrHotel.hotelAndCity.city.location.lat,
                lon: cityOrHotel.hotelAndCity.city.location.lon,
                zoom: 13
            }))
    }
    const handlerFocus = (event) => {
        if (event.currentTarget) {
            //Базовые данные
            const copyBaseData = []
            copyDataHotelsList.map(item => {
                item.hotels.map(hotels => {
                    copyBaseData.push(hotels)
                })
            })

            const newArray = copyBaseData.filter(price => price.last_price_info.price >= rangeValueStart && price.last_price_info.price <= rangeValueEnd)
            console.log("Массив отфилтрованный по цене", newArray)

            //Распределение по страницам
            const data = pageDistribution(newArray)


            dispatch(countPageHandler(data.countPage + 1))
            //Обновление количества отелей в списке параметров
            dispatch(countOtherSortHandler(data.list))
            dispatch(dataHotelsListHandler(data.list))
            updateHoleList()
        }

    }


    const handleChange = (event, newValue) => {
        dispatch(rangeValueStartHandler(newValue[0]))
        dispatch(rangeValueEndHandler(newValue[1]))
    };

    const handleChangeStart = (event) => {
        dispatch(rangeValueStartHandler(event.target.value))
    }

    const handleChangeEnd = (event) => {
        dispatch(rangeValueEndHandler(event.target.value))
    }

    return (
        <>
            <div className="row__sb__c">
                <div className="input__range__block">
                    <input
                        type="number"
                        className="input__range"
                        value={rangeValueStart}
                        placeholder={"0"}
                        onBlur={(event) => handlerFocus(event)}
                        onChange={handleChangeStart}
                    />
                </div>
                <div
                    className="row__c__c"
                    style={{
                        marginRight: "5px",
                        marginLeft: "5px",
                        marginBottom: "30px"
                    }}
                >
                    <img
                        src={line2}
                        alt="line2"
                    />
                </div>
                <div className="input__range__block">
                    <input
                        type="number"
                        className="input__range"
                        value={rangeValueEnd}
                        placeholder={"20000+"}
                        onBlur={(event) => handlerFocus(event)}
                        onChange={handleChangeEnd}
                    />
                </div>
            </div>
            <ThemeProvider theme={theme}>
                <Slider
                    value={[rangeValueStart, rangeValueEnd]}
                    onChange={handleChange}
                    onMouseUp={(event) => handlerFocus(event)}
                    max={200000}
                    min={0}
                    step={1}
                    color="secondary"
                    // valueLabelDisplay="auto"
                />
            </ThemeProvider>
        </>
    )
}
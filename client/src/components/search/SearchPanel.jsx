import "./SearchPanel.css"
import React, {useEffect, useState} from "react";
import {Icon24ChevronDown, Icon24LocationMapOutline} from '@vkontakte/icons';
import {GREY, RED, WHITE} from "../../theme/colors";
import line from "../../img/line.png"
import {ButtonIcon} from "../buttons/ButtonIcon";
import {ListSearch} from "./ListSearch";
import {useDispatch, useSelector} from "react-redux";
import {wordDeclension, wordDeclensionNight} from "../utils/word-declensions";
import {getRandomInRange, pageDistribution} from "../utils/search-hotels";
import {
    showListSearchHandler,
    cityOrHotelHandler,
    showCalendarHandler,
    showGuestHandler,
    cityOrHotelInput
} from "../../store/Search";
import {DataRange} from "../сalendar/DataRange";
import {GuestHotel} from "./GuestHotel";
import Service from "../service";
import {
    copyDataHotelsListHandler,
    countPageHandler,
    dataHotelsListHandler, loadingHotelListHandler,
    loadingListHandler, loadingMapHandler, pageSwitchingHandler,
    resultLoadDataHandler,
    showHotelMapHandler
} from "../../store/HotelsList";

import {countHandler, countOtherSortHandler} from "../../store/Filter";
import prewiew from "../../img/preview.png";
import {handlerCountHotels} from "../../store/Main";


const SearchPanel = () => {

    const dataCityHotel = new Service()

    const dispatch = useDispatch()
    const loadingHotelList = useSelector(state => state.hotels_list.loadingHotelList)
    const [checkOld, setCheckOld] = useState(false)
    const [openDataRang, setOpenDataRang] = useState(false)
    const [openGuest, setGuest] = useState(false)
    const [link, setLink] = useState("/")
    const [data, setData] = useState({results: {locations: [{id: 1}], hotels: [{id: 1}]}})
    const showListSearch = useSelector(state => state.search.showListSearch)
    const showCalendar = useSelector(state => state.search.showCalendar)
    const showGuest = useSelector(state => state.search.showGuest)
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const checkIn = useSelector(state => state.search.checkIn)
    const checkOut = useSelector(state => state.search.checkOut)
    const rangeValueStart = useSelector(state => state.filter.rangeValueStart)
    const rangeValueEnd = useSelector(state => state.filter.rangeValueEnd)
    const dataHotelsList = useSelector(state => state.hotels_list.dataHotelsList)
    const copyDataHotelsList = useSelector(state => state.hotels_list.copyDataHotelsList)
    const [isWriteCity, setIsWriteCity] = useState(false)
    const resultLoadData = useSelector(state => state.hotels_list.resultLoadData)
    // const modal = document.getElementById('modal__search');
    // const input = document.getElementById('search__input');

    const handlerText = (e) => {
        if (e.target.value !== "") {
                dispatch(showListSearchHandler(true))
                dataCityHotel.getCityAndHotels(e.target.value, "&limit=100", "&lookFor=city", "&lang=ru").then((result) => {
                    setData(result)
                })
                dispatch(cityOrHotelInput(e.target.value))

        } else {
            dispatch(cityOrHotelInput(""))
            dispatch(showListSearchHandler(false))
        }
    }


    //Выбор города или отеля из поиска
    const chooseCityOrHotel = (value, cityAndHotel) => {
        dispatch(showListSearchHandler(false))
        setLink("/Отели_на_карте");
        dispatch(cityOrHotelHandler({value: value, cityAndHotel: cityAndHotel}))
    }


    const handleClickOutsideListSearch = () => {
        dispatch(showListSearchHandler(false));
        dispatch(cityOrHotelInput(""));
    };
    const handleClickOutsideGuestHotel = () => {
        setGuest(false);
        dispatch(showGuestHandler(false));
        handlerOpenGuest();
    };
    const handlerDate = () => {
        setOpenDataRang(!openDataRang)
        dispatch(showCalendarHandler(!showCalendar))
    }
    const handleClickOutsideDataRange = () => {
        setOpenDataRang(false);
        handlerDate();
    };

    const handlerOpenGuest = () => {
        setGuest(!openGuest)
        dispatch(showGuestHandler(!showGuest))
    }

    const checkingHandler = () => {
        if (cityOrHotel.guest.child.map(child => child.old === "Возраст")[0]) {
            setCheckOld(true)
        } else {
            setGuest(!openGuest)
            dispatch(showGuestHandler(!showGuest))
            setCheckOld(false)
        }
    }

    const updateHotelList = () => {
        dispatch(pageSwitchingHandler(0))

        dispatch(showHotelMapHandler(
            {
                lat: cityOrHotel.hotelAndCity.city.location.lat,
                lon: cityOrHotel.hotelAndCity.city.location.lon,
                zoom: 13
            }))
        dispatch(showCalendarHandler(false))
        dispatch(showGuestHandler(false));
    }

    const showLoadingIndicator = () => {
        // добавьте здесь код для отображения индикатора загрузки
        dispatch(loadingHotelListHandler(true))
        dispatch(loadingMapHandler(true))
        console.log('Показать индикатор загрузки');
    };

    const hideLoadingIndicator = () => {
        // добавьте здесь код для скрытия индикатора загрузки
        dispatch(loadingHotelListHandler(false))
        dispatch(loadingMapHandler(false))
        console.log('Скрыть индикатор загрузки');
    };


    const formatHotel = (hotel, hotelDetails) => {
        return {
            hotelId: hotel.hotel_id,
            name: hotel.name,
            has_wifi: hotel.has_wifi,
            property_type: hotel.property_type,
            stars: hotel.stars,
            last_price_info: hotel.last_price_info || 0,
            distance: hotel.distance,
            metro: [],
            rating: getRandomInRange(6, 10),
            countReviews: [{
                id: 1,
                reviewPlus: "",
                reviewMinus: "",
                rating: getRandomInRange(6, 10),
                infoHotel: {},
                person: {id: 1, name: ""}
            }],
            favorite: false,
            political_cancel: ["withoutPrepayment", "paymentInAdvance", "freeCancellation"],
            nutrition: ["breakfastIncluded", "breakfastAndDinnerIncluded", "withOwnKitchen"],
            countFreeNumberHotel: 0,
            idObject: getRandomInRange(0, 100000),
            freeNumbersHotel: [{
                id: 1,
                header: "Двухместный номер с 1 кроватью",
                price: "39 800 ₽",
                date: "За 13 суток",
                img: prewiew,
                text: "2 гостя 1 кровать 1 спальня",
                content: "1 двуспальная кровать"
            }],
            minimumNightStay: 1,
            shortFacilities: [
                "noSmoking",
                "transferAirport",
                "parking",
                "reseption",
                "familyNumber",
                "foodDelivery",
                "pets",
                "restaurant",
                "pool",
                "fitness",
                "spa",
                "wiFiInRoom"
    ],
            countBedrooms: getRandomInRange(1, 4),
            checkIn: hotelDetails.checkIn,
            checkOut: hotelDetails.checkOut,
            location: hotelDetails.location,
            photos: hotelDetails.photos,
            photoCount: hotelDetails.photoCount,
            address: hotelDetails.address,
            cityId: hotelDetails.cityId,
        };
    };

    const getHotelListFromResults = (locationResult, hotelsAtCityResult) => {
        return locationResult.popularity.map((hotel) => {
            const hotelDetails = hotelsAtCityResult.hotels.find((hotelDetails) => hotelDetails.id === hotel.hotel_id);
            return formatHotel(hotel, hotelDetails);
        });
    };

    const createListHotels = () => {
        return new Promise((resolve, reject) => {
            dataCityHotel
                .getLocationDump(
                    cityOrHotel.hotelAndCity.city.id,
                    300,
                    'popularity',
                    checkIn,
                    checkOut,
                    'ru'
                )
                .then((locationResult) => {
                    return dataCityHotel.getHotelsAtCity(cityOrHotel.hotelAndCity.city.id)
                        .then((hotelsAtCityResult) => {
                            resolve({locationResult, hotelsAtCityResult});
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        })
            .then(({locationResult, hotelsAtCityResult}) => {
                const hotelList = getHotelListFromResults(locationResult, hotelsAtCityResult);
                const hotelMoneySort = hotelList.filter(price => price.last_price_info.price >= rangeValueStart && price.last_price_info.price <= rangeValueEnd);
                const sorted = [...hotelMoneySort].sort((a, b) => a.last_price_info.price - b.last_price_info.price);

                // Сортировка массива на страницы
                const list = pageDistribution(sorted);
                // Количество объектов на странице HotelCity
                dispatch(handlerCountHotels(sorted.length))
                // Количество страниц
                dispatch(countPageHandler(list.countPage + 1));
                // Создания копии массива
                dispatch(copyDataHotelsListHandler(list.list));
                // Обновление количества отелей в списке параметров
                dispatch(countOtherSortHandler(list.list));
                // Добавление массива для последующих манипуляций
                dispatch(dataHotelsListHandler(list.list));
                updateHotelList();

                return 'Список отелей успешно обновлен';
            })
            .catch((error) => {
                console.error('Ошибка при выполнении запросов или формировании списка отелей:', error);
                throw error;
            });
    };



    const handleSearch = async () => {
        if (cityOrHotel.hotelAndCity.city.name !== "") {
            setLink("/Отели_на_карте");
            console.log("VALUE INPUT",cityOrHotel.hotelAndCity.city.name);
            showLoadingIndicator();
            try {
                await createListHotels();
                console.log('Список отелей успешно обновлен');
                setIsWriteCity(false);
            } catch (error) {
                console.error('Не удалось создать список отелей:', error);
                setIsWriteCity(true);
                setLink("/");
            } finally {
                hideLoadingIndicator();
            }
        } else {
            setIsWriteCity(true);
            setLink("/");
        }
    };


    // useEffect(() => {
    //     if (!resultLoadData) {
    //         handleSearch();
    //         dispatch(resultLoadDataHandler(true));
    //     }
    // }, [resultLoadData, dispatch, handleSearch]);


    // useEffect(() => {
    //     // добавляем обработчик события click к документу:
    //     document.addEventListener('click', function(event) {
    //         if (event.target !== modal && event.target !== input) {
    //             // если клик был не на модальном окне и не на его потомках, то скрываем модальное окно
    //             modal.style.display = 'none';
    //         }
    //     });
    // }, [handlerText])

    return (
        <div>
            <div className="row__c__c desktop__big__search">
                <div
                    className="row__sb__c input__search">
                    <div style={{position: "relative", flexGrow: 1.2}}>

                        <input
                            autoComplete="off"
                            type="text"
                            id="search__input"
                            className="search__input__text"
                            placeholder={isWriteCity ? "Введите название города" : "Город или отель"}
                            value={cityOrHotel.hotelAndCity.city.name}
                            onChange={handlerText}
                            required={true}
                        />
                        {
                            showListSearch && (
                                <div
                                    className="click-outside-modal-handler"
                                    onClick={handleClickOutsideListSearch}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                ></div>
                            )
                        }

                        <ListSearch
                            style={showListSearch ? "modal__list__search" : "modal__none"}
                            city={data.results.locations}
                            handle={(value, cityAndHotel) => chooseCityOrHotel(value, cityAndHotel)}
                        />

                    </div>

                    <img
                        src={line}
                        alt="line"
                        height={28}
                        width={1}
                    />
                    <div style={{
                        position: "relative",
                        width: "300px"
                    }}>
                        <div
                            className="row__sb__c"
                            onClick={() => handlerDate()}
                            style={{width: "300px", cursor: "pointer"}}>
                <span
                    className="text__content__black__14"
                    style={{
                        marginLeft: "10px"
                    }}
                >
                    {cityOrHotel.dataRange.checkIn} - {cityOrHotel.dataRange.checkOut} {cityOrHotel.dataRange.month}
                    <span
                        className="text__content__grey__14"
                        style={{
                            marginLeft: "5px"
                        }}
                    >
                        {cityOrHotel.dataRange.countNight} {wordDeclensionNight(cityOrHotel.dataRange.countNight)}
                    </span>
                </span>
                            <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                        <Icon24ChevronDown color={GREY}/>
                    </span>
                        </div>
                        {
                            openDataRang  && (
                                <div
                                    className="click-outside-modal-handler"
                                    onClick={handleClickOutsideDataRange}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                ></div>
                            )
                        }
                        <DataRange
                            style={showCalendar ? "modal__list__search" : "modal__none"}
                            handle={() => handlerDate()}
                            page={"search"}
                        />
                    </div>
                    <img
                        src={line}
                        alt="line"
                        height={28}
                        width={1}
                    />
                    <div style={{
                        position: "relative",
                        width: "300px"
                    }}>
                        <div
                            className="row__sb__c"
                            onClick={() => handlerOpenGuest()}
                            style={{
                                width: "300px",
                                cursor: "pointer"
                            }}
                        >
                        <span
                            className="text__content__black__14"
                            style={{
                                marginLeft: "10px"
                            }}
                        >
                            {cityOrHotel.guest.adult + cityOrHotel.guest.child.length} {wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length)}
                        </span>
                            <span
                                className={openGuest ? 'iconDate' : "iconBtn"}
                            >
                            <Icon24ChevronDown color={GREY}/>
                        </span>
                        </div>
                        {
                            openGuest && (
                                <div
                                    className="click-outside-modal-handler"
                                    onClick={handleClickOutsideGuestHotel}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                ></div>
                            )
                        }

                        <GuestHotel
                            style={showGuest ? "modal__guest" : "modal__none"}
                            guest={cityOrHotel.guest.adult}
                            child={cityOrHotel.guest.child}
                            handler={() => checkingHandler()}
                            checkOld={checkOld}
                        />
                    </div>
                </div>
                <ButtonIcon
                    icon={<Icon24LocationMapOutline color={WHITE}/>}
                    name={"Найти"}
                    link={cityOrHotel.hotelAndCity.city.name === "" ? "" : "/Отели_на_карте"}
                    style={"searchBtn"}
                    handler={() => handleSearch()}
                    styleText={"text__content__white__16"}
                />
            </div>


            <div className="column__c__c laptop__search">
                <div className="row__c__c" style={{width: "47vw"}}>
                    <div className="row__sb__c input__search">
                        <div style={{
                            position: "relative",
                            flexGrow: 0.8
                        }}>
                            <input
                                autoComplete="off"
                                type="text"
                                className="search__input__text"
                                placeholder="Город или отель"
                                value={cityOrHotel.hotelAndCity.city.name}
                                onChange={handlerText}
                            />
                            {
                                showListSearch && (
                                    <div
                                        className="click-outside-modal-handler"
                                        onClick={handleClickOutsideListSearch}
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 1,
                                        }}
                                    ></div>
                                )
                            }
                            <ListSearch
                                style={showListSearch ? "modal__list__search" : "modal__none"}
                                city={data.results.locations}
                                hotels={data.results.hotels}
                                handle={(value, cityAndHotel) => chooseCityOrHotel(value, cityAndHotel)}
                            />
                        </div>

                    </div>
                    <ButtonIcon
                        icon={<Icon24LocationMapOutline color={WHITE}/>}
                        name={"Найти"}
                        width={"150px"}
                        style={"searchBtn"}
                        link={link}
                        handler={() => handleSearch()}
                        styleText={"text__content__white__16"}
                    />
                </div>
                <div
                    className="row__c__c input__search"
                    style={{
                        width: "47vw",
                        marginTop: "10px"
                    }}

                >
                    <div style={{position: "relative", flexGrow: 1}}>
                        <div
                            className="row__sb__c"
                            onClick={() => handlerDate()}
                            style={{flexGrow: 1, cursor: "pointer"}}>
                <span
                    className="text__content__black__14"
                    style={{marginLeft: "10px"}}>
                    {cityOrHotel.dataRange.checkIn} - {cityOrHotel.dataRange.checkOut} {cityOrHotel.dataRange.month}
                    <span
                        className="text__content__grey__14"
                        style={{
                            marginLeft: "5px"
                        }}
                    >
                        {cityOrHotel.dataRange.countNight} {wordDeclensionNight(cityOrHotel.dataRange.countNight)}
                    </span>
                </span>
                            <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                        <Icon24ChevronDown color={GREY}/>
                    </span>
                        </div>
                        {
                            openDataRang  && (
                                <div
                                    className="click-outside-modal-handler"
                                    onClick={handleClickOutsideDataRange}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                ></div>
                            )
                        }
                        <DataRange
                            style={showCalendar ? "modal__list__search" : "modal__none"}
                            styles={{flexGrow: 1}}
                            page={"search"}
                            handle={() => handlerDate()}
                        />
                    </div>
                    <div style={{
                        position: "relative",
                        flexGrow: 1
                    }}>
                        <div
                            className="row__sb__c"
                            onClick={() => handlerOpenGuest()}
                            style={{
                                flexGrow: 1,
                                cursor: "pointer"
                            }}
                        >
                        <span
                            className="text__content__black__14"
                            style={{
                                marginLeft: "10px"
                            }}
                        >
                            {cityOrHotel.guest.adult + cityOrHotel.guest.child.length} {wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length)}

                        </span>
                            <span
                                className={openGuest ? 'iconDate' : "iconBtn"}
                            >
                            <Icon24ChevronDown color={GREY}/>
                        </span>
                        </div>
                        {
                            openGuest && (
                                <div
                                    className="click-outside-modal-handler"
                                    onClick={handleClickOutsideGuestHotel}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                ></div>
                            )
                        }
                        <GuestHotel
                            style={showGuest ? "modal__guest" : "modal__none"}
                            styles={{
                                flexGrow: 1
                            }}
                            guest={cityOrHotel.guest.adult}
                            child={cityOrHotel.guest.child}
                            handler={() => checkingHandler()}
                            checkOld={checkOld}
                        />
                    </div>
                </div>
            </div>


            <div className="column__c__c tablet__search">
                <div className="row__c__c">
                    <div className="row__sb__c input__search"
                         style={{width: "80vw"}}
                    >
                        <div style={{position: "relative", flexGrow: 1}}>
                            <input
                                autoComplete="off"
                                type="text"
                                className="search__input__text"
                                placeholder="Город или отель"
                                value={cityOrHotel.hotelAndCity.city.name}
                                onChange={handlerText}
                            />
                            {
                                showListSearch && (
                                    <div
                                        className="click-outside-modal-handler"
                                        onClick={handleClickOutsideListSearch}
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 1,
                                        }}
                                    ></div>
                                )
                            }
                            <ListSearch
                                style={showListSearch ? "modal__list__search" : "modal__none"}
                                city={data.results.locations}
                                hotels={data.results.hotels}
                                handle={(value, cityAndHotel) => chooseCityOrHotel(value, cityAndHotel)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row__c__c input__search" style={{width: "80vw", marginTop: "10px"}}>
                    <div style={{position: "relative", flexGrow: 1}}>
                        <div
                            className="row__sb__c"
                            onClick={() => handlerDate()}
                            style={{flexGrow: 1, cursor: "pointer"}}
                        >
                                <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                    {cityOrHotel.dataRange.checkIn} - {cityOrHotel.dataRange.checkOut} {cityOrHotel.dataRange.month}
                                    <span className="text__content__grey__14" style={{marginLeft: "5px"}}>
                                        {cityOrHotel.dataRange.countNight} {wordDeclensionNight(cityOrHotel.dataRange.countNight)}
                                    </span>
                                    </span>
                            <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                                        <Icon24ChevronDown color={GREY}/>
                                    </span>
                        </div>
                        {
                            openDataRang  && (
                                <div
                                    className="click-outside-modal-handler"
                                    onClick={handleClickOutsideDataRange}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                ></div>
                            )
                        }
                        <DataRange
                            style={showCalendar ? "modal__list__search" : "modal__none"}
                            styles={{flexGrow: 1}}
                            handle={() => handlerDate()}
                            page={"search"}
                        />
                    </div>
                </div>
                <div className="row__c__c input__search" style={{width: "80vw", marginTop: "10px"}}>
                    <div style={{position: "relative", flexGrow: 1}}>
                        <div
                            className="row__sb__c"
                            onClick={() => handlerOpenGuest()}
                            style={{flexGrow: 1, cursor: "pointer"}}>
                                <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                    {cityOrHotel.guest.adult + cityOrHotel.guest.child.length} {wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length)}
                                </span>
                            <span className={openGuest ? 'iconDate' : "iconBtn"}>
                                    <Icon24ChevronDown color={GREY}/>
                                </span>
                        </div>
                        {
                            openGuest && (
                                <div
                                    className="click-outside-modal-handler"
                                    onClick={handleClickOutsideGuestHotel}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                ></div>
                            )
                        }
                        <GuestHotel
                            style={showGuest ? "modal__guest" : "modal__none"}
                            styles={{flexGrow: 1}}
                            guest={cityOrHotel.guest.adult}
                            child={cityOrHotel.guest.child}
                            handler={() => checkingHandler()}
                            checkOld={checkOld}
                        />
                    </div>
                </div>
                <div className="row__c__c " style={{width: "80vw", marginTop: "10px"}}>
                    <div style={{position: "relative", flexGrow: 1}}>
                        <ButtonIcon
                            icon={<Icon24LocationMapOutline color={WHITE}/>}
                            name={"Найти"}
                            style={"searchBtn__mobile"}
                            link={link}
                            handler={() => handleSearch()}
                            styleText={"text__content__white__16"}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default React.memo(SearchPanel);
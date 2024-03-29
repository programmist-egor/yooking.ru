import "./SearchPanel.css"
import React, {useEffect, useState} from "react";
import {Icon24ChevronDown, Icon24LocationMapOutline} from '@vkontakte/icons';
import {GREY, WHITE} from "../../theme/colors";
import line from "../../assets/image/line.png"
import {ButtonIcon} from "../buttons/ButtonIcon";
import {ListSearch} from "./ListSearch";
import {useDispatch, useSelector} from "react-redux";
import {wordDeclension, wordDeclensionNight} from "../../utils/word-declensions";
import {
    showListSearchHandler,
    showCalendarHandler,
    showGuestHandler,
  cityOrHotelHandler, handlerDataRange
} from "../../store/Search";
import {DataRange} from "../calendar/DataRange";
import {GuestHotel} from "./GuestHotel";

import {
    dataNumbersListHandler,
    loadingHotelListHandler,
    loadingMapHandler, objectListHandler, pageSwitchingHandler, searchParametersHandler, setFilteredHotels,

} from "../../store/HotelsList";

import {parseJSONPropertiesInArray} from "../../utils/json-parse-object";
import ObjectService from "../../services/object.service";
import {countOtherSortHandler} from "../../store/Filter";


const SearchPanel = () => {
    const dispatch = useDispatch()
    const requestParameters = useSelector(state => state.search.cityOrHotel)
    const [objectList, setObjectList] = useState([])
    const [filterData, setFilterData] = useState([])
    const [searchCity, setSearchCity] = useState(requestParameters.city.city || "")

    const [checkOld, setCheckOld] = useState(false)
    const [openDataRang, setOpenDataRang] = useState(false)
    const [openGuest, setGuest] = useState(false)
    const [link, setLink] = useState("/hotels_map")
    const showListSearch = useSelector(state => state.search.showListSearch)
    const showCalendar = useSelector(state => state.search.showCalendar)
    const showGuest = useSelector(state => state.search.showGuest)
    const [isWriteCity, setIsWriteCity] = useState(false)

    //Загрузка объектов
    const getObjectList = () => {
        ObjectService.getAllObject()
            .then(data => {
                const parsedData = parseJSONPropertiesInArray(data);
                setObjectList(parsedData);

            })
            .catch(error => {
                console.log(error);
            })

    }
    useEffect(() => {
        if (objectList.length === 0) {
            getObjectList()
        }
    }, []);


    const handleClickOutsideListSearch = (city) => {
        dispatch(showListSearchHandler(false));
        setSearchCity(city)
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
        if (requestParameters.guest.child.map(child => child.old === "Возраст")[0]) {
            setCheckOld(true)
        } else {
            setGuest(!openGuest)
            dispatch(showGuestHandler(!showGuest))
            setCheckOld(false)
        }
    }

    const dataSearchHandler = (type, value) => {
        if (type === "city") {
            dispatch(cityOrHotelHandler(value))
            handleClickOutsideListSearch(value.city)
        }
        if (type === "DataRange") {
            dispatch(handlerDataRange(value))
            handlerDate()
        }
    }



    const handlerText = (e) => {
        if (e.target.value !== "") {
            dispatch(showListSearchHandler(true));
            const searchText = e.target.value.toLocaleLowerCase();
            setSearchCity(e.target.value);
            if (searchText.length !== 0) {
                // Фильтруем userData по имени, фамилии, телефону или email
                const filteredCity = objectList.filter(item => {
                    const cityMatch = item.city && item.city.toLocaleLowerCase().includes(searchText);
                    return cityMatch;
                });
                // Создаем множество уникальных городов
                const uniqueCities = new Set(filteredCity.map(item => item.city));
                // Фильтруем уникальные города и сохраняем целые объекты
                const uniqueCitiesArray = Array.from(uniqueCities).map(city => {
                    return filteredCity.find(item => item.city === city);
                });
                setFilterData(uniqueCitiesArray);
            } else {
                // Если строка поиска пустая, возвращаем пустой массив
                setFilterData([]);
                dispatch(showListSearchHandler(false));
            }
        } else {
            setSearchCity("");
            dispatch(showListSearchHandler(false));
        }
    }


    const updateHotelList = () => {
        dispatch(pageSwitchingHandler(0))
        const localDataLocation = {lat: requestParameters.city.location.lat, lon: requestParameters.city.location.lon, zoom: 13}
        localStorage.setItem('location', JSON.stringify(localDataLocation));
        dispatch(loadingMapHandler(true))
        setTimeout(() => {
            dispatch(loadingMapHandler(false))
        }, 3000)
        dispatch(showCalendarHandler(false))
        dispatch(showGuestHandler(false));
    }

    const showLoadingIndicator = () => {
        // добавьте здесь код для отображения индикатора загрузки
        dispatch(loadingHotelListHandler(true))
        dispatch(loadingMapHandler(true))

    };

    const hideLoadingIndicator = () => {
        // добавьте здесь код для скрытия индикатора загрузки
        dispatch(loadingHotelListHandler(false))
        dispatch(loadingMapHandler(false))

    };

    const filterNumbers = async (array) => {
        const checkIn = requestParameters.checkIn
        const checkOut = requestParameters.checkOut
        const guest = requestParameters.guest.adult + requestParameters.guest.child.length
        const filteredNumbers = await array.filter(number => {
            // Проверяем диапазон дат в bookingList
            const isDateAvailable = number.bookingList.every(booking => {
                return !(checkIn >= booking.checkIn && checkIn < booking.checkOut) &&
                    !(checkOut > booking.checkIn && checkOut <= booking.checkOut);
            });
            // Проверяем количество гостей
            const isGuestCountValid = number.guestCount.length >= guest;
            return isDateAvailable && isGuestCountValid;
        });
        return filteredNumbers
    }

    const filterObject =  (array, numbers) => {
        const filterObject = array.filter(object => {
            return numbers.find(number => object.hotelId === number.hotelId);
        });
        return filterObject
    }

    const handleSearch = async () => {
        if (requestParameters.city !== null && requestParameters.dataRange !== null && requestParameters.guest !== null) {

            showLoadingIndicator();
            try {
                //Загрузка объектов
                ObjectService.searchObject(requestParameters)
                    .then(data => {
                        const  resultObject = parseJSONPropertiesInArray(data.resultObject)
                        const  resultNumbers = parseJSONPropertiesInArray(data.resultNumbers)
                        filterNumbers(resultNumbers)
                            .then(data => {
                                const resultFilterObject = filterObject(resultObject, data)
                                dispatch(objectListHandler(resultFilterObject))
                                dispatch(dataNumbersListHandler(data))
                                dispatch(setFilteredHotels(null));
                                dispatch(countOtherSortHandler(resultFilterObject));
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        setLink("/hotels_map");
                    });


                updateHotelList();
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
                            value={searchCity}
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
                            city={filterData}
                            handle={(type, value) => dataSearchHandler(type, value)}
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
                    style={{marginLeft: "10px"}}
                >
                    {requestParameters.dataRange.checkIn} - {requestParameters.dataRange.checkOut} {requestParameters.dataRange.month}
                    <span
                        className="text__content__grey__14"
                        style={{marginLeft: "5px"}}
                    >
                        {requestParameters.dataRange.countNight} {wordDeclensionNight(requestParameters.dataRange.countNight)}
                    </span>
                </span>
                            <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                        <Icon24ChevronDown color={GREY}/>
                    </span>
                        </div>
                        {
                            openDataRang && (
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
                            handle={(type, value) => dataSearchHandler(type, value)}
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
                            {requestParameters.guest.adult + requestParameters.guest.child.length} {wordDeclension(requestParameters.guest.adult + requestParameters.guest.child.length)}
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
                            guest={requestParameters.guest.adult}
                            child={requestParameters.guest.child}
                            handler={() => checkingHandler()}
                            checkOld={checkOld}
                        />
                    </div>
                </div>
                <ButtonIcon
                    icon={<Icon24LocationMapOutline color={WHITE}/>}
                    name={"Найти"}
                    link={requestParameters.city === null ? "" : "/hotels_map"}
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
                                id="search__input"
                                className="search__input__text"
                                placeholder={isWriteCity ? "Введите название города" : "Город или отель"}
                                value={searchCity}
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
                                city={filterData}
                                handle={(type, value) => dataSearchHandler(type, value)}
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
                     {requestParameters.dataRange.checkIn} - {requestParameters.dataRange.checkOut} {requestParameters.dataRange.month}
                    <span
                        className="text__content__grey__14"
                        style={{
                            marginLeft: "5px"
                        }}
                    >
                        {requestParameters.dataRange.countNight} {wordDeclensionNight(requestParameters.dataRange.countNight)}
                    </span>
                </span>
                            <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                        <Icon24ChevronDown color={GREY}/>
                    </span>
                        </div>
                        {
                            openDataRang && (
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
                            handle={(type, value) => dataSearchHandler(type, value)}
                            page={"search"}
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
                            {requestParameters.guest.adult + requestParameters.guest.child.length} {wordDeclension(requestParameters.guest.adult + requestParameters.guest.child.length)}

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
                            guest={requestParameters.guest.adult}
                            child={requestParameters.guest.child}
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
                                id="search__input"
                                className="search__input__text"
                                placeholder={isWriteCity ? "Введите название города" : "Город или отель"}
                                value={searchCity}
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
                                city={filterData}
                                handle={(type, value) => dataSearchHandler(type, value)}
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
                                    {requestParameters.dataRange.checkIn} - {requestParameters.dataRange.checkOut} {requestParameters.dataRange.month}
                                    <span className="text__content__grey__14" style={{marginLeft: "5px"}}>
                                          {requestParameters.dataRange.countNight} {wordDeclensionNight(requestParameters.dataRange.countNight)}
                                    </span>
                                    </span>
                            <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                                        <Icon24ChevronDown color={GREY}/>
                                    </span>
                        </div>
                        {
                            openDataRang && (
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
                            handle={(type, value) => dataSearchHandler(type, value)}
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
                                    {requestParameters.guest.adult + requestParameters.guest.child.length} {wordDeclension(requestParameters.guest.adult + requestParameters.guest.child.length)}
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
                            guest={requestParameters.guest.adult}
                            child={requestParameters.guest.child}
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
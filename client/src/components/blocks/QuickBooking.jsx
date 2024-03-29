import {ButtonIcon} from "../buttons/ButtonIcon";
import {Icon24BriefcaseOutline, Icon24Cancel, Icon24ChevronDown, Icon24FlashOutline} from '@vkontakte/icons';
import {GREY, GREY_BLACK, RED, WHITE} from "../../theme/colors";
import {DataRange} from "../calendar/DataRange";
import {useDispatch, useSelector} from "react-redux";
import {wordDeclension, wordDeclensionNight} from "../../utils/word-declensions";
import { handlerDataRange, showCalendarHandler, showGuestHandler} from "../../store/Search";
import React, {useEffect, useState} from "react";
import {GuestHotel} from "../search/GuestHotel";
import InputMask from "react-input-mask";
import { dataHotelUserHandler, phoneUserHandler, linkUserHandler} from "../../store/ClientData";
import Drawer from "react-modern-drawer";
import {formatMoney} from "../../utils/formating-money";
import {
    dataNumbersListHandler,
    loadNumberListModalHandler,
    openNumberListHandler
} from "../../store/HotelsList";
import {NumberList} from "../modals/NumberList";
import NumberService from "../../services/number.service";
import {parseJSONPropertiesInArray} from "../../utils/json-parse-object";


export const QuickBooking = ({dataHotelNumber}) => {
    const dispatch = useDispatch()
    const hotelId = localStorage.getItem("hotelId")
    const requestParameters = useSelector(state => state.search.cityOrHotel)
    const showCalendar = useSelector(state => state.search.showCalendar)
    const showGuest = useSelector(state => state.search.showGuest)
    const [openDataRang, setOpenDataRang] = useState(false)
    const [openGuest, setGuest] = useState(false)
    const [checkOld, setCheckOld] = useState(false)
    const [phone, setPhone] = useState("");
    const [checkPhone, setCheckPhone] = useState(false);
    const dataClient = useSelector(state => state.client__data.dateClient)
    const [isOpenBooking, setIsOpenBooking] = React.useState(false)
    const auth = useSelector(state => state.auth.isAuth);
    const [averagePrice, setAveragePrice] = useState("");


    useEffect(() => {
        if (averagePrice === "") {
            NumberService.getAllNumbers("hotel", hotelId)
                .then(data => {
                    const resultNumb = parseJSONPropertiesInArray(data)
                    // Фильтрация номеров по hotelId
                    const filteredPrices = resultNumb.filter(price => +price.hotelId === +hotelId);

                    if (filteredPrices.length > 0) {
                        const pricesAboveZero = filteredPrices.filter(price => price.priceBase > 0);
                        if (pricesAboveZero.length > 0) {
                            const minPrice = Math.min(...pricesAboveZero.map(price => price.priceBase));
                            setAveragePrice(minPrice);
                        } else {
                            console.log("Все цены меньше или равны нулю");
                        }
                    } else {
                        console.log("Нет данных для указанного hotelId");
                    }
                })
        }
    }, [])


    const toggleDrawerBooking = () => {
        setIsOpenBooking((prevState) => !prevState)
    }

    const handleClickOutsideGuestHotel = () => {
        setGuest(false);
        dispatch(showGuestHandler(false));
        handlerOpenGuest();
    };

    const handleClickOutsideDataRange = () => {
        setOpenDataRang(false);
        handlerDate();
    };

    const handlerDate = () => {
        setOpenDataRang(!openDataRang)
        dispatch(showCalendarHandler(!showCalendar))
    }
    const dataSearchHandler = (type, value) => {
        if (type === "DataRange") {
            dispatch(handlerDataRange(value))
            handlerDate()
        }
    }

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

    const openListNumber = () => {
        dispatch(loadNumberListModalHandler(true))
        NumberService.getAllNumbers("hotel", hotelId)
            .then(data => {
                const resultNumb = parseJSONPropertiesInArray(data)
                filterNumbers(resultNumb)
                    .then(data => {
                        dispatch(dataNumbersListHandler(data))
                    })
                    .catch(e => console.log(e))
                    .finally(() => {
                        dispatch(loadNumberListModalHandler(false))
                    })
            })


        // dispatch(loadingNumberListHandler(true))
        dispatch(openNumberListHandler(true))
    }

    console.log("requestParameters", requestParameters);

    const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const bookingHandler = (phone) => {
        if (regex.test(phone)) {
            // dispatch(mobileCodeModalHandler(true))
            dispatch(phoneUserHandler(phone))
            dispatch(linkUserHandler("/Личный_кабинет"))
            dispatch(dataHotelUserHandler(dataHotelNumber))
            setCheckPhone(false)
        } else {
            setCheckPhone(true)
        }
    }

    return (
        <div>
            <div className="column quick__booking">
                <div className="row__sb__c inputQuickBookingPeople">
                    <div className="quick__booking__block">
                        <div
                            className="row__sb__c quick__booking__block"
                            onClick={() => handlerDate()}
                            style={{cursor: "pointer"}}>
                <span
                    className="text__content__black__14"
                    style={{marginLeft: "10px"}}>
                    {requestParameters.dataRange.checkIn} - {requestParameters.dataRange.checkOut} {requestParameters.dataRange.month}
                    <span
                        className="text__content__grey__14"
                        style={{marginLeft: "5px"}}>
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
                <div className="row__c__fs inputQuickBookingPeople">
                    <div className="quick__booking__block">
                        <div
                            className="row__sb__c quick__booking__block"
                            onClick={() => handlerOpenGuest()}
                            style={{cursor: "pointer",}}>
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
                            guest={requestParameters.guest.adult}
                            child={requestParameters.guest.child}
                            handler={() => checkingHandler()}
                            checkOld={checkOld}
                        />
                    </div>
                </div>
                <div className="row__sb__c" style={{marginTop: "10px", marginBottom: "15px"}}>
                    <span
                        className="text__content__black__b__16">Итого за {requestParameters.dataRange.countNight} суток</span>
                    <span
                        className="text__content__black__b__20">{formatMoney(averagePrice * requestParameters.dataRange.countNight)} ₽</span>
                </div>
                {auth ?

                    <ButtonIcon
                        handler={() => openListNumber()}
                        icon={<Icon24BriefcaseOutline color={WHITE}/>}
                        style={"bookBtn"}
                        name={"Забронировать"}
                        styleText={"text__content__white__16"}
                    />
                    :
                    <>
            <span
                className="text__content__black__12"
                style={{marginTop: "5px", marginBottom: "5px"}}>Ваш телефон для бронирования</span>
                        <div className="row__c__fs">
                            <InputMask
                                value={phone}
                                className="inputQuickBookingPhone text__content__black__16"
                                onChange={(e) => setPhone(e.target.value)}
                                mask="+79999999999"
                                placeholder="+79999999999"
                            />
                        </div>
                        {checkPhone ?
                            <span className="text__content__black__b__12" style={{
                                marginTop: "5px",
                                marginBottom: "5px",
                                color: RED
                            }}>Некорректный номер телефона</span>
                            :
                            ""
                        }
                        <span
                            className="text__content__grey__12"
                            style={{marginTop: "5px", marginBottom: "10px"}}>
                Отправим код для подтверждения и
                информацию о бронировании
            </span>
                        <ButtonIcon
                            handler={() => bookingHandler(phone)}
                            icon={<Icon24BriefcaseOutline color={WHITE}/>}
                            style={"bookBtn"}
                            name={"Забронировать"}
                            styleText={"text__content__white__16"}
                            link={regex.test(phone) ? "/api/registration" : ""}
                        />
                    </>
                }

                <span
                    className="text__content__grey__12"
                    style={{marginTop: "10px", marginBottom: "10px"}}>
                Нажимая кнопку <b>Забронировать</b> , Вы
                соглашаетесь с условиями <ins>пользовательского
                соглашения и на обработку персональных
                данных</ins>
            </span>
                <span
                    className="text__content__black__16"
                    style={{marginTop: "5px", marginBottom: "5px"}}>
                Служба бронирования
            </span>
                <span
                    className="text__content__black__b__20"
                    style={{marginTop: "5px"}}>
                8 800 556 69 99
            </span>
            </div>
            <div className="column mobile__quick__booking" style={{marginBottom: "40px"}}>
                <Drawer
                    open={isOpenBooking}
                    onClose={toggleDrawerBooking}
                    direction='bottom'
                    style={{height: dataClient.auth ? "80vh" : "90vh", overflowY: "scroll"}}
                >
                    <div className="row__sb__c" style={{padding: "20px",}}>
                        <h4>Проверьте дату и количество гостей</h4>
                        <span onClick={() => toggleDrawerBooking()}
                              style={{cursor: "pointer"}}>
                               <Icon24Cancel color={GREY_BLACK}/>
                            </span>
                    </div>
                    <div className="column"
                         style={{height: "100%", background: WHITE, paddingLeft: "20px", paddingRight: "20px"}}>
                        <div className="row__sb__c inputQuickBookingPeople">
                            <div className="quick__booking__block">
                                <div
                                    className="row__sb__c quick__booking__block"
                                    onClick={() => handlerDate()}
                                    style={{cursor: "pointer"}}>
                <span
                    className="text__content__black__14"
                    style={{marginLeft: "10px"}}>
                    {requestParameters.dataRange.checkIn} - {requestParameters.dataRange.checkOut} {requestParameters.dataRange.month}
                    <span
                        className="text__content__grey__14"
                        style={{marginLeft: "5px"}}>
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
                                    handle={() => handlerDate()}
                                    page={"search"}
                                />
                            </div>
                        </div>
                        <div className="row__c__fs inputQuickBookingPeople">
                            <div className="quick__booking__block">
                                <div
                                    className="row__sb__c quick__booking__block"
                                    onClick={() => handlerOpenGuest()}
                                    style={{cursor: "pointer",}}>
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
                                    guest={requestParameters.guest.adult}
                                    child={requestParameters.guest.child}
                                    handler={() => checkingHandler()}
                                    checkOld={checkOld}
                                />
                            </div>
                        </div>
                        <div className="row__sb__c" style={{marginTop: "20px", marginBottom: "35px"}}>
                    <span
                        className="text__content__black__b__16">Итого за {requestParameters.dataRange.countNight} суток</span>
                            <span
                                className="text__content__black__b__20">{formatMoney(averagePrice * requestParameters.dataRange.countNight)} ₽</span>
                        </div>
                        {auth === true ?

                            <ButtonIcon
                                handler={() => dispatch(dataHotelUserHandler(dataHotelNumber))}
                                icon={<Icon24BriefcaseOutline color={WHITE}/>}
                                style={"bookBtn"}
                                name={"Забронировать"}
                                styleText={"text__content__white__16"}
                                link={"/person"}
                            />
                            :
                            <>
                            <span
                                className="text__content__black__14"
                                style={{marginTop: "5px", marginBottom: "5px"}}>Ваш телефон для бронирования</span>
                                <div className="row__c__fs">
                                    <InputMask
                                        value={phone}
                                        className="inputQuickBookingPhone text__content__black__16"
                                        onChange={(e) => setPhone(e.target.value)}
                                        mask="+79999999999"
                                        placeholder="+79999999999"
                                    />
                                </div>
                                {checkPhone ?
                                    <span className="text__content__black__b__14" style={{
                                        marginTop: "5px",
                                        marginBottom: "5px",
                                        color: RED
                                    }}>Некорректный номер телефона</span>
                                    :
                                    ""
                                }
                                <span
                                    className="text__content__grey__14"
                                    style={{marginTop: "5px", marginBottom: "20px"}}>
                Отправим код для подтверждения и
                информацию о бронировании
            </span>
                                <ButtonIcon
                                    handler={() => bookingHandler(phone)}
                                    icon={<Icon24BriefcaseOutline color={WHITE}/>}
                                    style={"bookBtn"}
                                    name={"Забронировать"}
                                    styleText={"text__content__white__16"}
                                    link={regex.test(phone) ? "/api/registration" : ""}
                                />
                            </>
                        }

                        <span
                            className="text__content__grey__14"
                            style={{marginTop: "20px", marginBottom: "20px", textAlign: "center"}}>
                Нажимая кнопку <b>Забронировать</b> , Вы
                соглашаетесь с условиями <ins>пользовательского
                соглашения и на обработку персональных
                данных</ins>
            </span>
                        <span
                            className="text__content__black__16"
                            style={{marginTop: "5px", marginBottom: "5px", textAlign: "center"}}>
                Служба бронирования
            </span>
                        <span
                            className="text__content__black__b__20"
                            style={{marginTop: "5px", textAlign: "center"}}>
                8 800 556 69 99
            </span>

                    </div>
                </Drawer>
                <ButtonIcon
                    handler={() => toggleDrawerBooking()}
                    icon={<Icon24FlashOutline color={WHITE}/>}
                    style={"bookBtn"}
                    name={"Быстрое бронирование"}
                    styleText={"text__content__white__16"}
                />
            </div>
            <NumberList dataHotelNumber={dataHotelNumber}/>
        </div>
    )
}
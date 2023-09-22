import {GREY, RED, WHITE} from "../../theme/colors";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {wordDeclension, wordDeclensionNight} from "../utils/word-declensions";
import InputMask from "react-input-mask";
import {
    checkInHandler,
    checkOutHandler,
    dateClientHandler,
    checkHandler, finishedBookingHandler, bookingUserDataHandler
} from "../../store/ClientData";
import {SliderBig} from "../slider/SliderBig";
import {Icon24BriefcaseOutline, Icon24ChevronDown} from "@vkontakte/icons";
import {DataRange} from "../сalendar/DataRange";
import {GuestHotel} from "../search/GuestHotel";
import {showCalendarHandler, showGuestHandler} from "../../store/Search";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {Box, FormControl, MenuItem, Select} from "@mui/material";

export const ContactData = () => {
    const dispatch = useDispatch()
    const clientData = useSelector(state => state.client__data.dateClient)
    const check = useSelector(state => state.client__data.checkInput)
    const clientCheckIn = useSelector(state => state.client__data.checkIn)
    const clientCheckOut = useSelector(state => state.client__data.checkOut)
    const dataHotel = useSelector(state => state.client__data.dataHotel)
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const showCalendar = useSelector(state => state.search.showCalendar)
    const showGuest = useSelector(state => state.search.showGuest)
    const [openDataRang, setOpenDataRang] = useState(false)
    const [openGuest, setGuest] = useState(false)
    const [checkOld, setCheckOld] = useState(false)
    const [checkPhone, setCheckPhone] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkName, setCheckName] = useState(false);
    const [checkCheckIn, setCheckCheckIn] = useState(false);
    const [checkCheckOut, setCheckCheckOut] = useState(false);
    const bookingUserData = useSelector(state => state.client__data.bookingUserData)
    // const [check, setCheck] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    const nameOnChange = (e) => {
        dispatch(dateClientHandler({id: "name", value: e.target.value}))
    }
    const phoneOnChange = (e) => {
        dispatch(dateClientHandler({id: "phone", value: e.target.value}))
    }
    const emailOnChange = (e) => {
        dispatch(dateClientHandler({id: "email", value: e.target.value}))
    }


    const handlerDate = () => {
        setOpenDataRang(!openDataRang)
        dispatch(showCalendarHandler(!showCalendar))
    }

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


    // Функция для форматирования числа в денежный формат
    function formatMoney(number) {
        // Преобразуем число в строку
        let str = number.toString();
        // Проверяем, есть ли десятичная точка или запятая
        let dotIndex = str.indexOf(".");
        let commaIndex = str.indexOf(",");
        // Если есть точка, то разделяем строку на целую и дробную части
        if (dotIndex > -1) {
            let integerPart = str.slice(0, dotIndex);
            let decimalPart = str.slice(dotIndex + 1);
            // Добавляем пробелы между тысячами в целой части
            integerPart = integerPart.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
            // Возвращаем отформатированную строку
            return integerPart + "," + decimalPart;
        }
        // Если есть запятая, то разделяем строку на целую и дробную части
        else if (commaIndex > -1) {
            let integerPart = str.slice(0, commaIndex);
            let decimalPart = str.slice(commaIndex + 1);
            // Добавляем пробелы между тысячами в целой части
            integerPart = integerPart.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
            // Возвращаем отформатированную строку
            return integerPart + "." + decimalPart;
        }
        // Если нет точки и запятой, то просто добавляем пробелы между тысячами
        else {
            return str.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
        }
    }


    const bookingHandler = () => {
        if (clientData.name !== "") {
            setTimeout(() => {
                setCheckName(false)
            }, 5000)
        } else {
            setCheckName(true)
        }
        const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        if (regex.test(clientData.phone)) {
            setTimeout(() => {
                setCheckPhone(false)
            }, 5000)
        } else {
            setCheckPhone(true)
        }
        if (validateEmail(clientData.email) && clientData.email !== "") {
            setTimeout(() => {
                setCheckEmail(false)
            }, 5000)
        } else {
            setCheckEmail(true)
        }
        if (clientCheckIn !== "") {
            setTimeout(() => {
                setCheckCheckIn(false)
            }, 5000)
        } else {
            setCheckCheckIn(true)
        }
        if (clientCheckOut !== "") {
            setTimeout(() => {
                setCheckCheckOut(false)
            }, 5000)
        } else {
            setCheckCheckOut(true)
        }

        //Добавление объекта в бронирование
        dispatch(bookingUserDataHandler(
            {
                id: bookingUserData.length + 1,
                guest: cityOrHotel.guest.adult  + cityOrHotel.guest.child.length + " " + wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length),
                dateRange: cityOrHotel.dataRange.checkIn + " - " + cityOrHotel.dataRange.checkOut + " " + cityOrHotel.dataRange.month,
                price: formatMoney(dataHotel.last_price_info.price_pn * cityOrHotel.dataRange.countNight),
                countNight: cityOrHotel.dataRange.countNight,
                idObject: dataHotel.idObject,
                value: dataHotel
            }))
        //Завершение бронирования
        dispatch(checkHandler(true))
        //Открытие модульного окна об бронировании
        dispatch(finishedBookingHandler(true))

        // dispatch(checkHandler(false))

    }

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    function ChekInSelect() {

        const option = [
            {id: 0, value: "Ранний заезд"}, {id: 1, value: "12:00"}, {id: 2, value: "13:00"},
            {id: 3, value: "14:00"}, {id: 4, value: "15:00"}, {id: 5, value: "16:00"},
            {id: 6, value: "17:00"}, {id: 7, value: "18:00"}, {id: 8, value: "19:00"},
            {id: 9, value: "20:00"}, {id: 10, value: "21:00"}, {id: 11, value: "22:00"},
            {id: 12, value: "23:00"},
        ]
        const handleChange = (event) => {
            dispatch(checkInHandler(event.target.value))
        };

        return (
            <Box sx={{minWidth: 120}}>
                <FormControl fullWidth required={true}>
                    <Select
                        id="checkIn__select"
                        value={clientCheckIn}
                        style={{height: "35px", border: "none", outline: "none"}}
                        onChange={handleChange}
                    >
                        {option.map(item => (
                            <MenuItem key={item.id} value={item.value}>{item.value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function ChekOutSelect() {
        const option = [
            {id: 0, value: "00:00"}, {id: 1, value: "01:00"}, {id: 2, value: "02:00"},
            {id: 3, value: "03:00"}, {id: 4, value: "04:00"}, {id: 5, value: "05:00"},
            {id: 6, value: "06:00"}, {id: 7, value: "07:00"}, {id: 8, value: "08:00"},
            {id: 9, value: "09:00"}, {id: 10, value: "10:00"}, {id: 11, value: "11:00"},
            {id: 12, value: "12:00"}, {id: 13, value: "Поздний отъезд"}
        ]
        const handleChange = (event) => {
            dispatch(checkOutHandler(event.target.value))
        };

        return (
            <Box sx={{minWidth: 120}}>
                <FormControl fullWidth required={true}>
                    <Select
                        id="checkOut__select"
                        value={clientCheckOut}
                        style={{height: "35px", border: "none", outline: "none"}}
                        onChange={handleChange}
                    >
                        {option.map(item => (
                            <MenuItem key={item.id} value={item.value}>{item.value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    return (
        <div className="column__c__c" style={{marginLeft: "3%", marginRight: "3%"}}>
            <div className="row__sa__fs contact__block" style={{flexWrap: "wrap"}}>
                <div className="column__fs" style={{margin: "15px"}}>
                    <div className="row__c__fs" style={{marginLeft: "10px"}}>
                        <h3>Ваши контактные данные</h3>
                    </div>
                        <label>
                            <span className="text__content__grey__12"><span style={{color: RED}}>*</span> Обязательное поле</span>
                            <input
                                type="text"
                                required={true}
                                placeholder="Ваше имя"
                                className="inputCheckAvailability"
                                value={clientData.name}
                                onChange={nameOnChange}
                            />
                        </label>
                        <label>
                            <span className="text__content__grey__12"><span style={{color: RED}}>*</span> Обязательное поле</span>
                            <InputMask
                                value={clientData.phone}
                                className="inputCheckAvailability "
                                onChange={(e) => phoneOnChange(e)}
                                mask="+7 (999) 999-99-99"
                                placeholder="+7 (999) 999-99-99"
                            />
                        </label>
                        <label>
                            <span className="text__content__grey__12"><span style={{color: RED}}>*</span> Обязательное поле</span>
                            <input
                                type="email"
                                required={true}
                                placeholder="Ваше email"
                                className="inputCheckAvailability"
                                value={clientData.email}
                                onChange={emailOnChange}
                            />
                            <span
                                className="text__content__grey__12">На этот адрес отправим информацию о бронировании</span>
                        </label>

                    {checkPhone ?
                        <span className="text__content__black__b__14"
                              style={{
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                  color: RED
                              }}>Некорректный номер телефона</span>
                        :
                        ""
                    }
                    {checkEmail ?
                        <span className="text__content__black__b__14"
                              style={{marginTop: "5px", marginBottom: "5px", color: RED}}>Некорректный email</span>
                        :
                        ""
                    }
                    {checkName ?
                        <span className="text__content__black__b__14"
                              style={{marginTop: "5px", marginBottom: "5px", color: RED}}>Вы не указали свое имя</span>
                        :
                        ""
                    }
                </div>
                <div className="column__fs" style={{margin: "15px"}}>
                    <div className="row__c__fs" >
                        <h3>{dataHotel.name}</h3>
                    </div>

                    {/*SLIDER*/}
                    <SliderBig
                        dataHotelNumber={dataHotel}
                        height={"200px"}
                        maxWidth={"100%"}
                        borderRadius={"10px"}
                        minWidth={"250px"}
                        mb={"5px"}
                        padding={"5px"}
                    />
                    <div className="row__sb__c" style={{marginBottom: "5px"}}>
                    <span
                        className="text__content__black__b__16">Итого за {cityOrHotel.dataRange.countNight} суток</span>
                        <span
                            className="text__content__black__b__20">{formatMoney(dataHotel.last_price_info.price_pn * cityOrHotel.dataRange.countNight)} ₽</span>
                    </div>
                </div>
            </div>
            <div className="column__c detail__booking">
                <div className="row__c__fs" >
                    <h3>Детали бронирования</h3>
                </div>
                <div className="row__sb__c" >
                    <div className="column__fs__c">
                    <span className="text__content__black__14"
                          style={{marginBottom: "5px"}}>Даты заезда и отъезда</span>
                        <div className="row__sb__c inputQuickBookingPeople">
                            <div className="quick__booking__block">
                                <div
                                    className="row__sb__c quick__booking__block"
                                    onClick={() => handlerDate()}
                                    style={{ cursor: "pointer"}}>
                                <span
                                    className="text__content__black__14"
                                    style={{marginLeft: "10px"}}>
                                {cityOrHotel.dataRange.checkIn} - {cityOrHotel.dataRange.checkOut} {cityOrHotel.dataRange.month}
                                    <span
                                        className="text__content__grey__14"
                                        style={{marginLeft: "5px"}}>
                                {cityOrHotel.dataRange.countNight} {wordDeclensionNight(cityOrHotel.dataRange.countNight)}
                            </span>
                        </span>
                                    <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                        <Icon24ChevronDown color={GREY}/>
                    </span>
                                </div>
                                <DataRange
                                    style={showCalendar ? "modal__list__search" : "modal__none"}
                                    handle={() => handlerDate()}
                                    page={"search"}
                                />
                            </div>
                        </div>
                        <span className="text__content__black__14"
                              style={{marginBottom: "5px"}}>Количество гостей</span>
                        <div className="row__c__fs inputQuickBookingPeople">
                            <div className="quick__booking__block">
                                <div
                                    className="row__sb__c quick__booking__block"
                                    onClick={() => handlerOpenGuest()}
                                    style={{ cursor: "pointer"}}>
                        <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                            {cityOrHotel.guest.adult + cityOrHotel.guest.child.length} {wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length)}
                        </span>
                                    <span className={openGuest ? 'iconDate' : "iconBtn"}>
                            <Icon24ChevronDown color={GREY}/>
                        </span>
                                </div>
                                <GuestHotel
                                    style={showGuest ? "modal__guest" : "modal__none"}
                                    guest={cityOrHotel.guest.adult}
                                    child={cityOrHotel.guest.child}
                                    handler={() => checkingHandler()}
                                    checkOld={checkOld}
                                />
                            </div>
                        </div>
                        <span className="text__content__black__14"
                              style={{marginBottom: "5px"}}>Время заезда и отъезда</span>
                        <div className="row__sb__c">
                            <ChekInSelect/>
                            <ChekOutSelect/>
                        </div>
                        {checkCheckIn ?
                            <span className="text__content__black__b__14"
                                  style={{
                                      marginTop: "5px",
                                      marginBottom: "5px",
                                      color: RED
                                  }}>Вы не указали дату заезда</span>
                            :
                            ""
                        }
                        {checkCheckOut ?
                            <span className="text__content__black__b__14"
                                  style={{
                                      marginTop: "5px",
                                      marginBottom: "5px",
                                      color: RED
                                  }}>Вы не указали дату отъезда</span>
                            :
                            ""
                        }
                        <div style={{marginBottom: "25px", marginTop: "25px"}}>
                            <ButtonIcon
                                handler={() => bookingHandler()}
                                icon={<Icon24BriefcaseOutline color={WHITE}/>}
                                style={"doneBtn"}
                                name={"Забронировать"}
                                styleText={"text__content__white__16"}
                                width={width >= 0 && width <= 530 ? "280px" : "300px"}
                                link={"/Бронирование"}
                            />
                        </div>
                    </div>
                    {/*<div className="column__fs__c">*/}

                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}
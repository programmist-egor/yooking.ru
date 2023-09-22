import {ButtonIcon} from "../buttons/ButtonIcon";
import {Icon24BriefcaseOutline, Icon24Cancel, Icon24ChevronDown, Icon24FlashOutline} from '@vkontakte/icons';
import {GREY, GREY_BLACK, RED, WHITE} from "../../theme/colors";
import {DataRange} from "../сalendar/DataRange";
import {useDispatch, useSelector} from "react-redux";
import {wordDeclension, wordDeclensionNight} from "../utils/word-declensions";
import {showCalendarHandler, showGuestHandler} from "../../store/Search";
import React, {useEffect, useState} from "react";
import {GuestHotel} from "../search/GuestHotel";
import InputPhone from "../forms/InputPhone";
import InputMask from "react-input-mask";
import {mobileCodeModalHandler} from "../../store/HotelItem";
import MobileCode from "../modals/MobileCode";
import {dateClientHandler, dataHotelUserHandler, phoneUserHandler, linkUserHandler} from "../../store/ClientData";
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import Drawer from "react-modern-drawer";

export const QuickBooking = ({dataHotelNumber}) => {
    const dispatch = useDispatch()
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const showCalendar = useSelector(state => state.search.showCalendar)
    const mobileCodeModal = useSelector(state => state.hotels_item.mobileCodeModal)
    const showGuest = useSelector(state => state.search.showGuest)
    const [openDataRang, setOpenDataRang] = useState(false)
    const [openGuest, setGuest] = useState(false)
    const [checkOld, setCheckOld] = useState(false)
    const [phone, setPhone] = useState("");
    const [checkPhone, setCheckPhone] = useState(false);
    const dataClient = useSelector(state => state.client__data.dateClient)
    const [verificationId, setVerificationId] = useState('');
    const [isOpenBooking, setIsOpenBooking] = React.useState(false)

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
    console.log("MODULE", mobileCodeModal);
    console.log("AUTH", dataClient.auth);

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
                </div>
                <div className="row__c__fs inputQuickBookingPeople">
                    <div className="quick__booking__block">
                        <div
                            className="row__sb__c quick__booking__block"
                            onClick={() => handlerOpenGuest()}
                            style={{cursor: "pointer",}}>
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
                            guest={cityOrHotel.guest.adult}
                            child={cityOrHotel.guest.child}
                            handler={() => checkingHandler()}
                            checkOld={checkOld}
                        />
                    </div>
                </div>
                <div className="row__sb__c" style={{marginTop: "10px", marginBottom: "15px"}}>
                    <span
                        className="text__content__black__b__16">Итого за {cityOrHotel.dataRange.countNight} суток</span>
                    <span
                        className="text__content__black__b__20">{formatMoney(dataHotelNumber.last_price_info.price_pn * cityOrHotel.dataRange.countNight)} ₽</span>
                </div>
                {dataClient.auth === true ?

                    <ButtonIcon
                        handler={() => dispatch(dataHotelUserHandler(dataHotelNumber))}
                        icon={<Icon24BriefcaseOutline color={WHITE}/>}
                        style={"bookBtn"}
                        name={"Забронировать"}
                        styleText={"text__content__white__16"}
                        link={"/Личный_кабинет"}
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
                                mask="+7 (999) 999-99-99"
                                placeholder="+7 (999) 999-99-99"
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
                            link={regex.test(phone) ? "/Зарегистрироваться" : ""}
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
                <MobileCode header="Подтвердите телефон" phone={phone}/>
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
                    <div className="column" style={{height: "100%", background: WHITE, paddingLeft: "20px", paddingRight: "20px"}}>
                        <div className="row__sb__c inputQuickBookingPeople">
                            <div className="quick__booking__block">
                                <div
                                    className="row__sb__c quick__booking__block"
                                    onClick={() => handlerDate()}
                                    style={{cursor: "pointer"}}>
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
                        </div>
                        <div className="row__c__fs inputQuickBookingPeople">
                            <div className="quick__booking__block">
                                <div
                                    className="row__sb__c quick__booking__block"
                                    onClick={() => handlerOpenGuest()}
                                    style={{cursor: "pointer",}}>
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
                                    guest={cityOrHotel.guest.adult}
                                    child={cityOrHotel.guest.child}
                                    handler={() => checkingHandler()}
                                    checkOld={checkOld}
                                />
                            </div>
                        </div>
                        <div className="row__sb__c" style={{marginTop: "20px", marginBottom: "35px"}}>
                    <span
                        className="text__content__black__b__16">Итого за {cityOrHotel.dataRange.countNight} суток</span>
                            <span
                                className="text__content__black__b__20">{formatMoney(dataHotelNumber.last_price_info.price_pn * cityOrHotel.dataRange.countNight)} ₽</span>
                        </div>
                        {dataClient.auth === true ?

                            <ButtonIcon
                                handler={() => dispatch(dataHotelUserHandler(dataHotelNumber))}
                                icon={<Icon24BriefcaseOutline color={WHITE}/>}
                                style={"bookBtn"}
                                name={"Забронировать"}
                                styleText={"text__content__white__16"}
                                link={"/Личный_кабинет"}
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
                                        mask="+7 (999) 999-99-99"
                                        placeholder="+7 (999) 999-99-99"
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
                                    link={regex.test(phone) ? "/Зарегистрироваться" : ""}
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
                        <MobileCode header="Подтвердите телефон" phone={phone}/>
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
        </div>
    )
}
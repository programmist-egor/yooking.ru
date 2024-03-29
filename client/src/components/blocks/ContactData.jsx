import {GREEN, GREY, RED, WHITE} from "../../theme/colors";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {wordDeclension, wordDeclensionNight} from "../../utils/word-declensions";
import InputMask from "react-input-mask";
import {Icon24BriefcaseOutline, Icon24ChevronDown} from "@vkontakte/icons";
import {DataRange} from "../calendar/DataRange";
import {GuestHotel} from "../search/GuestHotel";
import {handlerDataRange, showCalendarHandler, showGuestHandler} from "../../store/Search";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {optionPayBooking, optionPrepayment} from "../../utils/varible";
import BookingService from "../../services/booking.service";
import {getCurrentDate} from "../../utils/createDataNow";
import {formatMoney} from "../../utils/formating-money";
import CustomSelect from "../custom-select/CustomSelect";
import {ListNumberCard} from "../cards/ListNumberCard";
import UsersService from "../../services/users.service";
import {setDataBookingHandler} from "../../store/dataBooking";
import {checkDuplicateId, generateNumericId} from "../../utils/generatorId";
import {parseJSONProperties, parseJSONPropertiesInArray} from "../../utils/json-parse-object";
import {
    validateLastName,
    validateName,
    validateObject
} from "../../validation/validation-edit-booking";

export const ContactData = () => {
    const dispatch = useDispatch()
    const number = useSelector(state => state.hotels_list.dataNumberBooking)
    const dataObjectBooking = useSelector(state => state.hotels_list.dataObjectBooking)
    const dataCategoryBooking = useSelector(state => state.hotels_list.dataCategoryBooking)
    const userId = useSelector((state) => state.auth.userId);
    const [user, setUser] = useState(null)
    const requestParameters = useSelector(state => state.search.cityOrHotel)
    const showCalendar = useSelector(state => state.search.showCalendar)
    const showGuest = useSelector(state => state.search.showGuest)
    const [openDataRang, setOpenDataRang] = useState(false)
    const [openGuest, setGuest] = useState(false)
    const [checkOld, setCheckOld] = useState(false)

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [prepayment, setPrepayment] = useState(0)
    const [typePayment, setTypePayment] = useState({name: "Выберите", value: "no choose"})
    const [bookingAllId, setBookingAllId] = useState(null)
    const [bookingAll, setBookingAll] = useState([])

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const [msg, setMsg] = useState("");
    const [isMsg, setIsMsg] = useState(false);
    const [dateError, setDateError] = useState(false)
    const [successData, setSuccessData] = useState("")

    useEffect(() => {
        if (!user) {
            UsersService.getUserYooking("person", userId)
                .then(user => {
                    setUser(parseJSONProperties(user))
                    setName(user.name)
                    setLastName(user.lastName)
                    setPhone(user.phone)
                    setEmail(user.email)
                })
        }
        if (bookingAllId === null && bookingAll.length === 0) {
            BookingService.getAllBookingByObject("person", number.hotelId)
                .then(data => {
                    const parsedData = parseJSONPropertiesInArray(data);
                    console.log("parsedData", parsedData);
                    setBookingAll(parsedData)
                    const newArrayId = parsedData.map(object => object.id)
                    setBookingAllId(newArrayId)
                })
        }
    }, [])



    const msgSave = (msg) => {
        setMsg(msg)
        setIsMsg(true)
        setTimeout(() => {
            setMsg("")
            setIsMsg(false)
        }, 5000)
    }

    const errorChecked = (field, hasError) => {
        setError((errors) => ({
            ...errors,
            [field]: hasError
        }));
    }


    const [error, setError] = useState(
        {
            name: false,
            lastName: false,
            typePayment: false
        }
    )

    const handlerDate = () => {
        setOpenDataRang(!openDataRang)
        dispatch(showCalendarHandler(!showCalendar))
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

    const dataSearchHandler = (type, value) => {
        if (type === "DataRange") {
            dispatch(handlerDataRange(value))
            handlerDate()
        }
    }

    function isDateAvailable(bookingAll, categoryId, dataBooking, numberId, bookingList) {
        const filterBooking = bookingAll.filter(item => item.numberId === numberId);
        const isDateOccupied = filterBooking.some(booking => {
            const checkInDate = new Date(booking.checkIn);
            const checkOutDate = new Date(booking.checkOut);
            const currentCheckInDate = new Date(dataBooking.checkIn);
            const currentCheckOutDate = new Date(dataBooking.checkOut);

            // Проверяем, если хотя бы одна дата в диапазоне занята
            return (
                (currentCheckInDate >= checkInDate && currentCheckInDate <= checkOutDate) ||
                (currentCheckOutDate >= checkInDate && currentCheckOutDate <= checkOutDate) ||
                (currentCheckInDate <= checkInDate && currentCheckOutDate >= checkOutDate)
            );
        });

        if (isDateOccupied) {
            console.log("Дата или диапазон дат уже заняты");
            return false; // Дата или диапазон дат заняты
        } else {
            console.log("Дата или диапазон дат свободны");
            return true; // Дата или диапазон дат свободны
        }
    }

    useEffect(() => {
        const validateAllData = async () => {
            await validateName(name)
                .then(() => {
                    errorChecked('name', false)
                })
                .catch(error => {
                    errorChecked('name', true)
                });
            await validateLastName(lastName)
                .then(() => {
                    errorChecked('lastName', false)
                })
                .catch(error => {
                    errorChecked('lastName', true)
                });

            await validateObject(typePayment)
                .then(() => {
                    errorChecked('typePayment', false)
                })
                .catch(error => {
                    errorChecked('typePayment', true)
                });
        }


        const isCheckedDate = isDateAvailable(bookingAll, number.categoryId, {
            checkIn: requestParameters.checkIn,
            checkOut: requestParameters.checkOut
        }, number.id, number.bookingList)

        if (isCheckedDate) {
            setDateError(false)
        } else {
            setDateError(true)
        }

        validateAllData();
    },[typePayment, requestParameters])




    const bookingHandler = async () => {
        const errorValues = Object.values(error);
        const bookingId = checkDuplicateId(bookingAllId, generateNumericId());


        if (!dateError) {
            if (!errorValues.includes(true)) {
                const data = {
                    id: bookingId,
                    hotelId: number.hotelId,
                    numberId: number.id,
                    categoryId: number.categoryId,
                    name: name,
                    lastName: lastName,
                    city: number.city,
                    phone: phone,
                    note: "",
                    status: JSON.stringify({name: "Новое", value: "#01B0F1"}),
                    nameObject: dataObjectBooking?.name,
                    nameNumber: number?.name,
                    categoryName: dataCategoryBooking?.type,
                    checkInTime: dataObjectBooking.checkIn,
                    checkOutTime: dataObjectBooking.checkOut,
                    checkIn: requestParameters.checkIn,
                    checkOut: requestParameters.checkOut,
                    dataRange: JSON.stringify(requestParameters.dataRange),
                    guestCount: requestParameters.guest.adult + requestParameters.guest.child.length,
                    guest: JSON.stringify(requestParameters.guest),
                    amount: formatMoney(requestParameters.dataRange.countNight * number?.priceBase),
                    priceNumber: number?.priceBase,
                    typePayment: JSON.stringify(typePayment),
                    prepayment: prepayment,
                    email: email,
                    date: getCurrentDate(),
                }

                const updateNumber = {
                    ...number,
                    roomAmenitiesOption: JSON.stringify(number.roomAmenitiesOption),
                    has_wifi: JSON.stringify(number.has_wifi),
                    guestCount: JSON.stringify(number.guestCount),
                    bookingList: JSON.stringify([
                        ...(Array.isArray(number.bookingList) ? number.bookingList : []),
                        {
                            id: bookingId,
                            checkIn: requestParameters.checkIn,
                            checkOut: requestParameters.checkOut,
                            checkInTime: dataObjectBooking.checkIn,
                            checkOutTime: dataObjectBooking.checkOut,
                        }
                    ])
                };
                const updateUser = {
                    ...user,
                    bookingList: JSON.stringify([
                        ...(Array.isArray(user.bookingList) ? user.bookingList : []),
                        {
                            id: bookingId,
                            numberId: number.id,
                            checkIn: requestParameters.checkIn,
                            checkOut: requestParameters.checkOut,
                            checkInTime: dataObjectBooking.checkIn,
                            checkOutTime: dataObjectBooking.checkOut,
                        }
                    ])
                };
                setSuccessData("Данные сохранены!")

                setTimeout(() => {
                    setSuccessData("")
                }, 2000)

                dispatch(setDataBookingHandler({numberId: number.id, dataBooking: data, updateNumber: updateNumber,userId: user.id, updateUser: updateUser }))

            } else {
                console.log("error", error);
                msgSave("Присутствуют ошибки, данные не сохранены.")
            }
        } else {
            setDateError(true)
            setTimeout(() => {
                setDateError(false)
            }, 3000)

        }

        // //Открытие модульного окна об бронировании
        // dispatch(finishedBookingHandler(true))
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


    return (
        <div className="column__c__c" style={{marginLeft: "3%", marginRight: "3%"}}>

            <div className="row__sa__fs contact__block" style={{flexWrap: "wrap"}}>
                <div className="column__c detail__booking " style={{marginTop: 30}}>
                    <ListNumberCard
                        key={number.id}
                        name={number.name}
                        id={number.id}
                        hotelId={number.hotelId}
                        number={number}
                        categoryId={number.categoryId}
                        guestCount={number.guestCount.length}
                        area={number.area}
                        priceBase={number.priceBase}
                        bedroom={number.countBedrooms}
                        hasWiFi={number.has_wifi.value}
                        width={width}
                        type={"booking"}
                    />

                </div>

                <div className="column__fs" style={{margin: "15px"}}>
                    <div className="row__c__fs" style={{marginLeft: "10px"}}>
                        <h3>Ваши контактные данные</h3>
                    </div>
                    <div className="column">
                                    <span className="text__content__grey__12 mt__mr">
                                    <span style={{color: RED}}>*</span> Имя</span>
                        <input
                            type="text"
                            required={true}
                            placeholder="Ваше имя"
                            className="inputEditUser"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {error.name ? <p className="error">Неверно заполнено имя!</p> : ""}

                        <span className="text__content__grey__12 mt__mr"><span
                            style={{color: RED}}>*</span> Фамилия</span>
                        <input
                            type="text"
                            required={true}
                            placeholder="Ваша фамилия"
                            className="inputEditUser"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {error.lastName ? <p className="error">Неверно заполнена фамилия!</p> : ""}

                        <span className="text__content__grey__12 mt__mr"><span
                            style={{color: RED}}>*</span> Номер телефона</span>
                        <InputMask
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            mask="+79999999999"
                            placeholder="+79999999999"
                            className={"inputEditUser"}
                            disabled
                        />
                        {error.phone ? <p className="error">Неверно заполнен номер!</p> : ""}

                        <span className="text__content__grey__12 mt__mr">
                                        <span style={{color: RED}}>*</span> Email</span>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Введите Email"
                            className={"inputEditUser"}
                            disabled
                        />
                        {error.email ? <p className="error">Неверный email!</p> : ""}
                        <span className="text__content__grey__12 mt__mr ">
                                <span style={{color: RED}}>*</span>Оплата
                                    </span>
                        <CustomSelect
                            options={optionPayBooking}
                            selectedOption={typePayment.name}
                            setSelectedOption={(value) => value}
                            chooseStatus={(value) => setTypePayment(value)}
                            typeData={"status"}

                        />
                        {dataObjectBooking.political_cancel.some(item => item === 'withoutPrepayment') ?
                            ""
                            :
                            <>
                            <span
                                className="text__content__grey__12 mt__mb__5"
                                style={{marginBottom: 10, marginTop: 10}}>
                                    <span style={{color: RED}}>*</span>
                                        Предоплата
                                    </span>
                                <CustomSelect
                                    options={optionPrepayment}
                                    selectedOption={prepayment.name}
                                    setSelectedOption={(value) => value}
                                    chooseStatus={(value) => setPrepayment(value)}
                                    typeData={"status"}
                                />
                            </>
                        }

                    </div>
                </div>
                <div className="column__fs" style={{margin: "15px"}}>
                    <div className="row__c__fs">
                        <h3>Выберите дату</h3>
                    </div>
                    <div className="row__sb__c">
                        <div className="column__fs__c">
                    <span className="text__content__grey__12 mt__mr"
                          style={{marginBottom: "5px"}}>Даты заезда и отъезда</span>
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
                                    <DataRange
                                        style={showCalendar ? "modal__list__search" : "modal__none"}
                                        handle={(type, value) => dataSearchHandler(type, value)}
                                        page={"search"}
                                    />
                                </div>
                            </div>
                            <span className="text__content__grey__12 mt__mr"
                                  style={{marginBottom: "5px"}}>Количество гостей</span>
                            <div className="row__c__fs inputQuickBookingPeople">
                                <div className="quick__booking__block">
                                    <div
                                        className="row__sb__c quick__booking__block"
                                        onClick={() => handlerOpenGuest()}
                                        style={{cursor: "pointer"}}>
                        <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                            {requestParameters.guest.adult + requestParameters.guest.child.length} {wordDeclension(requestParameters.guest.adult + requestParameters.guest.child.length)}
                        </span>
                                        <span className={openGuest ? 'iconDate' : "iconBtn"}>
                            <Icon24ChevronDown color={GREY}/>
                        </span>
                                    </div>
                                    <GuestHotel
                                        style={showGuest ? "modal__guest" : "modal__none"}
                                        guest={requestParameters.guest.adult}
                                        child={requestParameters.guest.child}
                                        handler={() => checkingHandler()}
                                        checkOld={checkOld}
                                    />
                                </div>
                            </div>
                            <span className="text__content__grey__12 mt__mb__5"
                                  style={{marginBottom: 10, marginTop: 10}}><span style={{color: RED}}>
                                            *</span> Время заезда и отъезда</span>
                            <div className="row__sb__c mb">
                                <span className="text__content__black__b__16 CheckInCheckOut">
                                    {dataObjectBooking.checkIn}
                                </span>
                                <span className="text__content__black__b__16 CheckInCheckOut">
                                    {dataObjectBooking.checkOut}
                                </span>
                            </div>


                            <div className="row__sb__c" style={{marginBottom: "5px", marginTop: "15px"}}>
                                 <span className="text__content__black__b__16">
                                     Итого за {requestParameters.dataRange.countNight} суток
                                 </span>
                                <span className="text__content__black__b__20">
                                        {formatMoney(number.priceBase * requestParameters.dataRange.countNight)} ₽
                                </span>
                            </div>
                            {
                                 name === "" || lastName === "" || typePayment.value === "no choose" || dateError === true?
                                    <div style={{marginBottom: "25px", marginTop: "15px"}}>
                                        <ButtonIcon
                                            handler={() => msgSave("Не все поля заполнены!")}
                                            icon={<Icon24BriefcaseOutline color={WHITE}/>}
                                            style={"doneBtnNoActive"}
                                            name={"Забронировать"}
                                            styleText={"text__content__white__16"}
                                            width={width >= 0 && width <= 530 ? "280px" : "300px"}
                                        />
                                    </div>
                                    :
                                    <div style={{marginBottom: "25px", marginTop: "15px"}}>
                                        <ButtonIcon
                                            handler={() => bookingHandler()}
                                            icon={<Icon24BriefcaseOutline color={WHITE}/>}
                                            style={"doneBtn"}
                                            name={"Забронировать"}
                                            styleText={"text__content__white__16"}
                                            width={width >= 0 && width <= 530 ? "280px" : "300px"}
                                            link={"/pay"}
                                        />
                                    </div>
                            }

                            <div className="row__c__c ">
                                {isMsg ? <span className="text__content__black__12">{msg}</span> : ""}
                                {dateError === false ? "" :
                                    <span className="text__content__white__14"
                                          style={{color: RED}}>Дата бронирования уже занята!</span>}
                                {successData === "" ? "" :
                                    <span className="text__content__white__14"
                                          style={{color: GREEN}}>{successData}</span>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
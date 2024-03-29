import {useDispatch, useSelector} from "react-redux";
import {SliderBig} from "../slider/SliderBig";
import React, {useEffect, useState} from "react";
import {
    Icon20CancelCircleFillRed,
    Icon24BuildingOutline,
    Icon24ListBulletOutline,
} from '@vkontakte/icons';
import {GREEN, ORANGE,  WHITE} from "../../theme/colors";
import {ButtonIcon} from "../buttons/ButtonIcon";
import NumberService from "../../services/number.service";
import {parseJSONProperties, parseJSONPropertiesInArray} from "../../utils/json-parse-object";
import PhotoNumberService from "../../services/photo-number.service";
import BookingService from "../../services/booking.service";
import {
    dataNumbersListHandler,
    loadNumberListModalHandler,
    openMoreNumberHandler,
     setCategoryIdHandler, setNumberHandler
} from "../../store/HotelsList";
import {loaderFavoriteAndBookingHandler} from "../../store/ClientData";


export const Booking = ({bookingId, bookingList, numberId,user, width}) => {
    const dispatch = useDispatch()
    const [number, setNumber] = useState(null);
    const [booking, setBooking] = useState(null);
    const [photosNumber, setPhotosNumber] = useState([]);
    const requestParameters = useSelector(state => state.hotels_item.cityOrHotel)


    useEffect(() => {
        if (!number || !booking || !photosNumber) {
            NumberService.getNumberById("booking", numberId)
                .then(number => setNumber(parseJSONProperties(number)))
            BookingService.getBooking(bookingId)
                .then(booking => setBooking(parseJSONProperties(booking)))
            PhotoNumberService.getAllPhotosNumber("booking", numberId)
                .then(data => setPhotosNumber(data))
        }
    }, [])

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

    const chooseHotelMore = () => {
        localStorage.setItem("hotelId", number.hotelId)
        NumberService.getAllNumbers("booking", number.hotelId)
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
    }

    const moreNumber = () => {
        dispatch(openMoreNumberHandler(true))
        dispatch(setCategoryIdHandler(booking.categoryId))
        dispatch(setNumberHandler(number))
    }

    const cancelBooking = async () => {
        const updateUserBookingList = bookingList.filter(booking => +booking.id !== +bookingId);

        const updateUser = {
            ...user,
            bookingList: JSON.stringify(updateUserBookingList)
        };
        const updatedBookingList = number.bookingList.filter(booking => +booking.id !== +bookingId);

        const updateNumber = {
            ...number,
            bookingList: JSON.stringify(updatedBookingList)
        };
        console.log("updateUser",updateUser);
        console.log("updateNumber",updateNumber);
        console.log("updateUser",updateUserBookingList);
        console.log("updateNumber",updatedBookingList);

        BookingService.deleteBooking(bookingId, numberId, updateNumber, user.id, updateUser)
            .then(() => {
                dispatch(loaderFavoriteAndBookingHandler(true))
                setTimeout(() => dispatch(loaderFavoriteAndBookingHandler(false)), 1000);
            })
    }

    return (
        <div>
            <div className="row__fs__fs borderBottom desktop__booking__hotel__block"
                 style={{paddingBottom: "15px", marginBottom: "20px"}} key={bookingId}>
                {/*SLIDER*/}
                <SliderBig
                    height={"150px"}
                    maxWidth={"100%"}
                    borderRadius={"10px"}
                    minWidth={"250px"}
                    mb={"5px"}
                    padding={"5px"}
                    photos={photosNumber}
                />
                <div className="column__sb" style={{marginLeft: "10px"}}>
                    <div className="row__c__fs ">
                        <span className="text__content__black__b__16" style={{margin: "5px"}}>{number?.name}</span>
                    </div>
                    <div className="row__sb__c ">
                        <div className="column__fs__c">
                        <span className="text__content__grey__12" style={{margin: "5px"}}>
                            ID {bookingId}
                        </span>
                        </div>
                        <div className="column__fs__c">
                            {booking?.status.name === "Новое" ?
                                <span className="text__content__grey__12" style={{margin: "5px"}}>
                                        Статус:  <span className="text__content__grey__12" style={{color: ORANGE}}>Ожидание</span>
                                </span>
                                :
                                <span className="text__content__grey__12" style={{margin: "5px"}}>
                                        Статус:  <span className="text__content__grey__12" style={{color: GREEN}}>Подтверждено</span>
                                </span>
                            }

                        </div>
                    </div>
                    <div className="row__sb__c" style={{marginLeft: "5px"}}>
                        <div className="column__fs__c">
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Дата заезда </span>
                                <span className="text__content__black__b__12 ml__mr_10">{booking?.checkIn}</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Дата отъезда</span>
                                <span className="text__content__black__b__12 ml__mr_10">{booking?.checkOut}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Цена</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{booking?.amount} ₽</span>
                            </div>
                        </div>
                        <div className="column__fs__c">
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Время заезда и отъезда</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{booking?.checkInTime} - {booking?.checkOutTime}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Количество гостей</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{booking?.guestCount}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row__sb__c">
                        <ButtonIcon
                            style={"moreBookingBtn"}
                            name={"Отель"}
                            link={"/hotel"}
                            icon={<Icon24BuildingOutline color={WHITE} width={20} height={20}/>}
                            handler={() => chooseHotelMore()}
                            styleText={"text__content__white__12"}
                        />
                        <ButtonIcon
                            style={"sellBookingBtn"}
                            name={"Подробнее"}
                            icon={<Icon24ListBulletOutline color={WHITE} width={20} height={20}/>}
                            handler={() => moreNumber()}
                            styleText={"text__content__white__12"}
                        />
                        {booking?.status.name !== "Новое" ?
                                ""
                            :
                            <ButtonIcon
                                style={"delBookingBtn"}
                                name={"Отменить"}
                                icon={<Icon20CancelCircleFillRed color={WHITE} width={20} height={20}/>}
                                handler={() => cancelBooking()}
                                styleText={"text__content__white__12"}
                            />
                        }

                    </div>
                </div>
            </div>
            <div className="column__fs borderBottom mobile__booking__hotel__block"
                 style={{paddingBottom: "15px", marginBottom: "20px"}} key={bookingId}>
                {/*SLIDER*/}
                <SliderBig
                    height={"150px"}
                    maxWidth={"100%"}
                    borderRadius={"10px"}
                    minWidth={"250px"}
                    mb={"5px"}
                    padding={"5px"}
                    photos={photosNumber}
                />
                <div className="column__sb" style={{marginLeft: "10px",}}>
                    <div className="row__c__fs ">
                        <span className={"text__content__black__b__16"} style={{margin: "5px"}}>{number?.name}</span>
                    </div>
                    <div className="row__sb__c ">
                        <div className="column__fs__c">
                        <span className="text__content__grey__12" style={{margin: "5px"}}>
                            ID {bookingId}
                        </span>
                        </div>
                        <div className="column__fs__c">
                        <span className="text__content__grey__12" style={{margin: "5px"}}>
                            Статус:  <span className="text__content__grey__12" style={{color: ORANGE}}>проверка</span>
                        </span>
                        </div>
                    </div>
                    <div className="row__sb__c" style={{marginLeft: "5px"}}>
                        <div className="column__fs__c">
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Дата заезда </span>
                                <span className="text__content__black__b__12 ml__mr_10">{booking?.checkIn}</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Дата отъезда</span>
                                <span className="text__content__black__b__12 ml__mr_10">{booking?.checkOut}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Цена</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{booking?.amount} ₽</span>
                            </div>
                        </div>
                        <div className="column__fs__c">
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Время заезда и отъезда</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{booking?.checkInTime} - {booking?.checkOutTime}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Количество гостей</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{booking?.guestCount}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row__sb__c">
                        <ButtonIcon
                            style={"moreBookingBtn"}
                            name={width >= 0 && width <= 425 ? "" : "Отель"}
                            link={"/Отель"}
                            icon={<Icon24BuildingOutline color={WHITE} width={20} height={20}/>}
                            handler={() =>  chooseHotelMore()}
                            styleText={"text__content__white__12"}
                        />
                        <ButtonIcon
                            style={"sellBookingBtn"}
                            name={width >= 0 && width <= 425 ? "" : "Подробнее"}
                            icon={<Icon24ListBulletOutline color={WHITE} width={20} height={20}/>}
                            handler={() =>  moreNumber()}
                            styleText={"text__content__white__12"}
                        />
                        {booking?.status.name !== "Новое" ?
                            ""
                            :
                            <ButtonIcon
                                style={"delBookingBtn"}
                                name={width >= 0 && width <= 425 ? "" : "Отменить"}
                                icon={<Icon20CancelCircleFillRed color={WHITE} width={20} height={20}/>}
                                handler={() => cancelBooking()}
                                styleText={"text__content__white__12"}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
import {useDispatch, useSelector} from "react-redux";
import {SliderBig} from "../slider/SliderBig";
import React, {useEffect, useState} from "react";
import {Icon20More, Icon24MoneyTransfer} from '@vkontakte/icons';
import {GREEN, GREY_BANNER, GREY_BLACK, ORANGE,  WHITE} from "../../theme/colors";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {formatMoney} from "../../utils/formating-money";
import CategoryService from "../../services/category.service";
import {parseJSONProperties} from "../../utils/json-parse-object";
import PhotoNumberService from "../../services/photo-number.service";
import {MoreNumber} from "../modals/MoreNumber";
import {
    openMoreNumberHandler,
    openNumberListHandler, setCategoryHandler,
    setCategoryIdHandler, setDataObjectBooking, setNumberBookingHandler,
    setNumberHandler
} from "../../store/HotelsList";


export const ListNumberCard = ({
                                   id,
                                   name,
                                   categoryId,
                                   width,
                                   number,
                                   guestCount,
                                   priceBase,
                                   area,
                                   bedroom,
                                   hasWiFi,
                                   type,
                                   dataHotelNumber
                               }) => {
    const dispatch = useDispatch()
    const [objectPhotos, setObjectPhotos] = useState([]);
    const [sale, setSale] = useState(null)
    const [category, setCategory] = useState(null)
    const auth = useSelector(state => state.auth.isAuth);

    const checkDateRangeForSale = (checkInDate, checkOutDate, saleValue) => {
        const currentDate = new Date(); // Текущая дата
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        // Проверяем, что текущая дата находится в диапазоне между checkIn и checkOut
        if (currentDate >= checkIn && currentDate <= checkOut && saleValue !== 0) {
            // Если текущая дата входит в диапазон и значение скидки не равно 0, то устанавливаем скидку
            setSale(saleValue);
            console.log("Есть скидка");
        } else {
            // Если текущая дата не входит в диапазон или значение скидки равно 0, то скидка не устанавливается
            setSale(null);
            console.log("Нет скидки");
        }
    }


    useEffect(() => {
        if (objectPhotos.length === 0) {
            PhotoNumberService.getAllPhotosNumber("hotel", id)
                .then(data => setObjectPhotos(data))
        }
        CategoryService.getOneCategoryNumber("hotel", categoryId)
            .then(data => {
                const listCategory = parseJSONProperties(data)
                setCategory(listCategory)
                const {checkIn, checkOut, value} = listCategory.sale
                console.log("listCategory.sale", listCategory.sale);
                if (checkIn !== "" && checkOut !== "" && value !== 0) {
                    // Вызов функции с параметрами checkIn, checkOut и value из listCategory.sale
                    checkDateRangeForSale(checkIn, checkOut, value);
                } else {
                    console.log("Нет скидки")
                    setSale(null)
                }
            })
    }, [])

    const openMoreNumber = () => {
        dispatch(openMoreNumberHandler(true))
        dispatch(openNumberListHandler(false))
        dispatch(setCategoryIdHandler(categoryId))
        dispatch(setNumberHandler(number))
    }

    const bookingNumber = () => {
        dispatch(setCategoryHandler(category))
        dispatch(setDataObjectBooking(dataHotelNumber))
        dispatch(setNumberBookingHandler(number))
        dispatch(setNumberHandler(number))
    }

    return (
        <div>
            <div className="row__sb__fs borderBottom desktop__booking__hotel__block"
                 style={{paddingBottom: "15px", flexWrap: "wrap", marginBottom: "20px"}}>
                {/*SLIDER*/}
                <SliderBig
                    borderRadius={"10px"}
                    height={"180px"}
                    minWidth={"260px"}
                    padding={5}
                    maxWidth={"250px"}
                    photos={objectPhotos}
                />
                <div className="column ml__mr_20">
                    <div className="row__c__fs">
                        <span className="text__content__black__b__16 mt__mr">{name}</span>
                    </div>
                    <div className="row__fs__fs">
                        <div className="column">
                            <span className="text__content__grey__12">Количество гостей</span>
                            <span className="text__content__black__b__14 mt__mb__5">{guestCount}</span>
                            <span className="text__content__grey__12">Базовая стоимость</span>
                            {
                                sale === null ?
                                    <span
                                        className="text__content__black__b__14 mt__mb__5">{formatMoney(priceBase)} ₽</span>
                                    :
                                    <div className="column">
                                        <span className="text__content__grey__14 mt__mb__5"
                                              style={{textDecorationLine: "line-through"}}>{formatMoney(priceBase)} ₽</span>
                                        <div className="row__c__fs">
                                            <span
                                                className="text__content__white__b__15 "
                                                style={{color: GREEN}}
                                            >
                                                {formatMoney(priceBase - priceBase * sale / 100)} ₽
                                            </span>
                                        </div>
                                    </div>
                            }

                        </div>
                        <div className="column " style={{marginLeft: 50}}>
                            <span className="text__content__grey__12">Площадь, кв.м.</span>
                            <span className="text__content__black__b__14 mt__mb__5">{area}</span>
                            <span className="text__content__grey__12">Количество кроватей</span>
                            <span className="text__content__black__b__14 mt__mb__5">{bedroom}</span>
                        </div>
                        <div className="column " style={{marginLeft: 50}}>
                            <span className="text__content__grey__12">WI-FI</span>
                            <span className="text__content__black__b__14 mt__mb__5">{hasWiFi}</span>
                        </div>
                        {
                            sale === null ?
                                ""
                                :
                                type === "booking" ?
                                    ""
                                    :
                                    <div className="column__c__c" style={{
                                        marginLeft: 50,
                                        background: GREY_BLACK,
                                        width: 50,
                                        height: 50,
                                        borderRadius: 5,
                                        padding: 3
                                    }}>
                                        <span className="text__content__white__b__15"
                                              style={{color: ORANGE}}>SALE</span>
                                        <span className="text__content__white__b__16 mt__mb__5"
                                              style={{color: GREEN}}>
                                        {sale} %
                                    </span>
                                    </div>
                        }
                    </div>
                    {
                        type === "booking" ?
                            ""
                            :

                            <div className="row__c__fs">
                                <ButtonIcon
                                    mt={20}
                                    style={"bookBookingBtn"}
                                    name={"Забронировать"}
                                    icon={<Icon24MoneyTransfer color={WHITE} width={20} height={20}/>}
                                    handler={() => bookingNumber()}
                                    styleText={"text__content__white__12"}
                                    link={auth ? "/person" : "/api/login"}
                                />
                                <ButtonIcon
                                    background={GREY_BANNER}
                                    ml={20}
                                    mt={20}
                                    style={"bookBookingBtn"}
                                    name={"Подробнее"}
                                    icon={<Icon20More color={WHITE} width={20} height={20}/>}
                                    handler={() => openMoreNumber()}
                                    styleText={"text__content__white__12"}
                                />
                            </div>
                    }


                </div>

            </div>
            <div className="column__fs borderBottom mobile__booking__hotel__block"
                 style={{paddingBottom: "15px", marginBottom: "20px"}}>
                {/*SLIDER*/}
                <SliderBig
                    borderRadius={"10px"}
                    height={"180px"}
                    minWidth={"260px"}
                    padding={5}
                    maxWidth={"250px"}
                    photos={objectPhotos}
                />
                <div className="column__sb" style={{marginLeft: "10px"}}>
                    <div className="row__c__fs">
                        <span className="text__content__black__b__16 mt__mr">{name}</span>
                    </div>
                    <div className="row__fs__fs">
                        <div className="column">
                            <span className="text__content__grey__12">Количество гостей</span>
                            <span className="text__content__black__b__14 mt__mb__5">{guestCount}</span>
                            <span className="text__content__grey__12">Базовая стоимость</span>
                            {
                                sale === null ?
                                    <span
                                        className="text__content__black__b__14 mt__mb__5">{formatMoney(priceBase)} ₽</span>
                                    :
                                    <div className="column">
                                        <span className="text__content__grey__14 mt__mb__5"
                                              style={{textDecorationLine: "line-through"}}>{formatMoney(priceBase)} ₽</span>
                                        <div className="row__c__fs">
                                            <span
                                                className="text__content__white__b__15 "
                                                style={{color: GREEN}}
                                            >
                                                {formatMoney(priceBase - priceBase * sale / 100)} ₽
                                            </span>
                                        </div>
                                    </div>
                            }

                        </div>
                        <div className="column " style={{marginLeft: 50}}>
                            <span className="text__content__grey__12">Площадь, кв.м.</span>
                            <span className="text__content__black__b__14 mt__mb__5">{area}</span>
                            <span className="text__content__grey__12">Количество кроватей</span>
                            <span className="text__content__black__b__14 mt__mb__5">{bedroom}</span>
                        </div>
                        <div className="column " style={{marginLeft: 50}}>
                            <span className="text__content__grey__12">WI-FI</span>
                            <span className="text__content__black__b__14 mt__mb__5">{hasWiFi}</span>
                        </div>
                        {
                            sale === null ?
                                ""
                                :
                                type === "booking" ?
                                    ""
                                    :
                                    <div className="column__c__c" style={{
                                        marginLeft: 50,
                                        background: GREY_BLACK,
                                        width: 50,
                                        height: 50,
                                        borderRadius: 5,
                                        padding: 3
                                    }}>
                                        <span className="text__content__white__b__15"
                                              style={{color: ORANGE}}>SALE</span>
                                        <span className="text__content__white__b__16 mt__mb__5"
                                              style={{color: GREEN}}>
                                        {sale} %
                                    </span>
                                    </div>
                        }
                    </div>
                    {
                        type === "booking" ?
                            ""
                            :
                            <div className="row__sb__c">
                                <ButtonIcon
                                    style={"bookBookingBtn"}
                                    name={width >= 0 && width <= 425 ? "" : "Забронировать"}
                                    icon={<Icon24MoneyTransfer color={WHITE} width={20} height={20}/>}
                                    handler={() => bookingNumber()}
                                    styleText={"text__content__white__12"}
                                    link={auth ? "/person" : "/api/login"}
                                />
                                <ButtonIcon
                                    background={GREY_BANNER}
                                    ml={20}
                                    mt={20}
                                    style={"bookBookingBtn"}
                                    name={width >= 0 && width <= 425 ? "" : "Подробнее"}
                                    icon={<Icon20More color={WHITE} width={20} height={20}/>}
                                    handler={() => openMoreNumber()}
                                    styleText={"text__content__white__12"}
                                />
                            </div>
                    }
                </div>
            </div>
            <MoreNumber/>
        </div>
    )
}

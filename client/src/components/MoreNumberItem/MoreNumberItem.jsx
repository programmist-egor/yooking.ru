import "./MoreNumberItem.css"
import {SliderBig} from "../slider/SliderBig";
import React, {useEffect, useState} from "react";
import PhotoNumberService from "../../services/photo-number.service";
import CategoryService from "../../services/category.service";
import {parseJSONProperties} from "../../utils/json-parse-object";
import {formatMoney} from "../../utils/formating-money";
import {BLACK, GREEN, WHITE} from "../../theme/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    Icon20HomeOutline,
    Icon20MoneyCircleOutline,
    Icon20Users3Outline,
    Icon24ArmchairOutline,
    Icon24BriefcaseOutline,
    Icon28CheckCircleOutline,
    Icon28RssFeedOutline,
} from "@vkontakte/icons";
import {optionCheckBoxRoomAmenities} from "../../utils/varible";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {dataHotelUserHandler} from "../../store/ClientData";
import {openMoreNumberHandler} from "../../store/HotelsList";

export const MoreNumberItem = ({number,type, categoryId}) => {
    const [numberPhotos, setObjectPhotos] = useState([]);
    const [sale, setSale] = useState(null)
    const [filterFacilities, setFilterFacilities] = React.useState([])
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.isAuth);
    const openMoreNumber = useSelector(state => state.hotels_list.openMoreNumber)


    useEffect(() => {
        if (number !== null) {
            const newFilterRules = number.roomAmenitiesOption.map(rule => {
                return optionCheckBoxRoomAmenities.find(item => item.value === rule);
            }).filter(Boolean); // Фильтруем, чтобы удалить пустые значения
            console.log(newFilterRules);
            setFilterFacilities(newFilterRules);
        }
    }, [number, optionCheckBoxRoomAmenities]);

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
        if (numberPhotos.length === 0) {
            PhotoNumberService.getAllPhotosNumber("hotel", number?.id)
                .then(data => setObjectPhotos(data))
        }
        CategoryService.getOneCategoryNumber("hotel", categoryId)
            .then(data => {
                const listCategory = parseJSONProperties(data)

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

    const bookingHandler = () => {
        dispatch(openMoreNumberHandler(!openMoreNumber))
        dispatch(dataHotelUserHandler(number))
    }


    return (
        <div className="row__fs__fs">
            <div className="column">
                <SliderBig
                    borderRadius={"10px"}
                    height={"450px"}
                    minWidth={"450px"}
                    padding={5}
                    maxWidth={"450px"}
                    photos={numberPhotos}
                />
                {type === "booking" ?
                    ""
                    :
                    <ButtonIcon
                        mt={-20}
                        handler={() => bookingHandler() }
                        icon={<Icon24BriefcaseOutline color={WHITE}/>}
                        style={"bookBtn"}
                        name={"Забронировать"}
                        styleText={"text__content__white__16"}
                        link={auth ? "/person" : "/api/login"}
                    />

                }

            </div>
            <div className="column ml__mr_20">
                <span className="text__content__black__b__14">
                    Характеристики номера
                </span>
                <div className="row__fs__fs mt__mr">
                    <div className="column">
                        <span className="text__content__grey__12">Количество гостей</span>
                        <div className="row__c__fs">
                            <Icon20Users3Outline/>
                            <span
                                className="text__content__black__b__14 mt__mb__5 pr_pl_5">{number?.guestCount.length}</span>
                        </div>
                        <span className="text__content__grey__12">Базовая стоимость</span>
                        {
                            sale === null ?
                                <div className="row__c__fs">
                                    <Icon20MoneyCircleOutline/>
                                    <span
                                        className="text__content__black__b__14 mt__mb__5 pr_pl_5">{formatMoney(number?.priceBase)} ₽</span>
                                </div>
                                :
                                <div className="column">
                                        <span className="text__content__grey__14 mt__mb__5"
                                              style={{textDecorationLine: "line-through"}}>{formatMoney(number?.priceBase)} ₽</span>
                                    <div className="row__c__fs">
                                        <div className="row__c__fs">
                                            <Icon20MoneyCircleOutline/>
                                            <span
                                                className="text__content__white__b__15 pr_pl_5"
                                                style={{color: GREEN}}
                                            >
                                                {formatMoney(number?.priceBase - number?.priceBase * sale / 100)} ₽
                                            </span>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="column ml__mr_20">
                        <span className="text__content__grey__12">Площадь, кв.м.</span>
                        <div className="row__c__fs">
                            <Icon20HomeOutline/>
                            <span className="text__content__black__b__14 mt__mb__5 pr_pl_5">{number?.area}</span>
                        </div>
                        <span className="text__content__grey__12">Количество кроватей</span>
                        <div className="row__c__fs">
                            <Icon24ArmchairOutline/>
                            <span
                                className="text__content__black__b__14 mt__mb__5 pr_pl_5">{number?.countBedrooms}</span>
                        </div>
                        <span className="text__content__grey__12">WI-FI</span>
                        <div className="row__fs__fs">
                            <Icon28RssFeedOutline wifth={24} height={24}/>
                            <span
                                className="text__content__black__b__14 mt__mb__5 pr_pl_5">{number?.has_wifi.value}</span>
                        </div>
                    </div>
                </div>
                <span className="text__content__black__b__14 mt__mr__20">
                        Удобства номера
                </span>
                <div className="column__fs__c">
                    {filterFacilities.map(option => (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 5,
                            }}
                            key={option.id}
                        >
                            <Icon28CheckCircleOutline color={BLACK} width={18} height={18}/>
                            <span
                                className="text__content__black__10"
                                style={{marginLeft: "5px", wordBreak: "break-word"}}
                            >
                                        {option.name}
                                    </span>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}
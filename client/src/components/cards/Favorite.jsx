import {SliderBig} from "../slider/SliderBig";
import React, {useEffect, useState} from "react";
import {Icon24Delete, Icon24ListBulletOutline} from '@vkontakte/icons';
import { WHITE} from "../../theme/colors";
import {ButtonIcon} from "../buttons/ButtonIcon";
import PhotoObjectService from "../../services/photo-object.service";
import FavoriteService from "../../services/favorite.service";
import NumberService from "../../services/number.service";
import {parseJSONPropertiesInArray} from "../../utils/json-parse-object";


export const Favorite = ({header, width, address,  hotelId, object, setObject}) => {
    const [dataNumbersList, setDataNumbersList] = useState([])
    const [objectPhotos, setObjectPhotos] = useState([]);
    const [averagePrice, setAveragePrice] = useState("");


    useEffect(() => {
        if (objectPhotos.length === 0) {
            PhotoObjectService.getAllPhotosObject("favorites", hotelId)
                .then(data => setObjectPhotos(data))
        }
        if (dataNumbersList.length === 0) {
            NumberService.getAllNumbers("favorites", hotelId)
                .then(data => {
                   const resultNumb = parseJSONPropertiesInArray(data)
                    // Фильтрация номеров по hotelId
                    const filteredPrices = resultNumb.filter(price => price.hotelId === hotelId);

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

    const removeFavorite = () => {
        const deleteFavorite = object.filter(fav => +fav.hotelId !== hotelId)
        setObject(deleteFavorite)
        FavoriteService.deleteFavorite("hotels_map", hotelId)
            .then(data => console.log("Del favorite", data))
            .catch(e => console.log(e))
    };



    return (
        <div>
            <div className="row__fs__fs borderBottom desktop__booking__hotel__block"
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
                <div className="column__sb" style={{marginLeft: "10px"}}>
                    <div className="row__c__fs ">
                        <span className="text__content__black__b__16" style={{margin: "5px"}}>{header}</span>
                    </div>
                    <div className="column__fs__c">
                        <span className="text__content__grey__12" style={{margin: "5px"}}>
                            ID {hotelId}
                        </span>
                    </div>
                    <div className="row__sb__c" style={{marginLeft: "5px"}}>
                        <div className="column__fs__c">
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Адрес</span>
                            </div>
                            <div className="row__c__fs">
                                <span
                                    className="text__content__black__b__12">{address}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Цена за сутки</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">от {averagePrice} ₽</span>
                            </div>
                        </div>
                    </div>

                    <div className="row__sb__c">
                        <ButtonIcon
                            style={"moreBookingBtn"}
                            name={"Подробнее"}
                            link={"/hotel"}
                            icon={<Icon24ListBulletOutline color={WHITE} width={20} height={20}/>}
                            handler={() => localStorage.setItem("hotelId", hotelId)}
                            styleText={"text__content__white__12"}
                        />
                        <ButtonIcon
                            style={"delBookingBtn"}
                            name={"Удалить"}
                            icon={<Icon24Delete color={WHITE} width={20} height={20}/>}
                            handler={() => removeFavorite()}
                            styleText={"text__content__white__12"}
                        />
                    </div>
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
                    <div className="row__c__fs ">
                        <span className="text__content__black__b__16" style={{margin: "5px"}}>{header}</span>
                    </div>
                    <div className="column__fs__c">
                        <span className="text__content__grey__12" style={{margin: "5px"}}>
                            ID {hotelId}
                        </span>
                    </div>
                    <div className="row__sb__c" style={{marginLeft: "5px"}}>
                        <div className="column__fs__c">
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Адрес</span>
                            </div>
                            <div className="row__c__fs">
                                <span
                                    className="text__content__black__b__12">{address}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Цена за сутки</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">от {averagePrice} ₽</span>
                            </div>
                        </div>
                    </div>

                    <div className="row__sb__c">
                        <ButtonIcon
                            style={"moreBookingBtn"}
                            name={width >= 0 && width <= 425 ? "" : "Подробнее"}
                            link={"/hotel"}
                            icon={<Icon24ListBulletOutline color={WHITE} width={20} height={20}/>}
                            handler={() => localStorage.setItem("hotelId", hotelId)}
                            styleText={"text__content__white__12"}
                        />
                        <ButtonIcon
                            style={"delBookingBtn"}
                            name={width >= 0 && width <= 425 ? "" : "Удалить"}
                            icon={<Icon24Delete color={WHITE} width={20} height={20}/>}
                            handler={() => removeFavorite()}
                            styleText={"text__content__white__12"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

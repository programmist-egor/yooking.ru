import {useDispatch, useSelector} from "react-redux";
import {SliderBig} from "../slider/SliderBig";
import React from "react";
import {Icon24Delete, Icon24ListBulletOutline, Icon24MoneyTransfer} from '@vkontakte/icons';
import {ORANGE, RED, WHITE} from "../../theme/colors";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {dataHotelHandler} from "../../store/HotelItem";
import {dataHotelUserHandler, delFavoriteUserDataHandler} from "../../store/ClientData";

export const Favorite = ({header, price, width, address, item, id}) => {
    const dispatch = useDispatch()


    return (
        <div>
            <div className="row__fs__fs borderBottom desktop__booking__hotel__block"
                 style={{paddingBottom: "15px", flexWrap: "wrap", marginBottom: "20px"}} key={id}>
                {/*SLIDER*/}
                <SliderBig
                    dataHotelNumber={item}
                    height={"150px"}
                    maxWidth={"100%"}
                    borderRadius={"10px"}
                    minWidth={"250px"}
                    mb={"5px"}
                    padding={"5px"}
                />
                <div className="column__sb" style={{marginLeft: "10px"}}>
                    <div className="row__c__fs ">
                        <span className="text__content__black__b__16" style={{margin: "5px"}}>{header}</span>
                    </div>
                    <div className="column__fs__c">
                        <span className="text__content__grey__12" style={{margin: "5px"}}>
                            ID {id}
                        </span>
                    </div>
                    <div className="row__sb__c" style={{marginLeft: "5px"}}>
                        <div className="column__fs__c">
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Адрес</span>
                            </div>
                            <div className="row__c__fs">
                                <span
                                    className="text__content__black__b__12">{address.ru === undefined ? "" : address.ru || address.en}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Цена за сутки</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{price} ₽</span>
                            </div>
                        </div>
                    </div>

                    <div className="row__sb__c">
                        <ButtonIcon
                            style={"moreBookingBtn"}
                            name={"Подробнее"}
                            link={"/Отель"}
                            icon={<Icon24ListBulletOutline color={WHITE} width={20} height={20}/>}
                            handler={() => dispatch(dataHotelHandler(item))}
                            styleText={"text__content__white__12"}
                        />
                        <ButtonIcon
                            style={"bookBookingBtn"}
                            name={"Забронировать"}
                            icon={<Icon24MoneyTransfer color={WHITE} width={20} height={20}/>}
                            handler={() => dispatch(dataHotelUserHandler(item))}
                            styleText={"text__content__white__12"}
                            link={"/Личный_кабинет"}
                        />
                        <ButtonIcon
                            style={"delBookingBtn"}
                            name={"Удалить"}
                            icon={<Icon24Delete color={WHITE} width={20} height={20}/>}
                            handler={() => dispatch(delFavoriteUserDataHandler(id))}
                            styleText={"text__content__white__12"}
                        />
                    </div>
                </div>
            </div>
            <div className="column__fs borderBottom mobile__booking__hotel__block"
                 style={{paddingBottom: "15px",  marginBottom: "20px"}} key={id}>
                {/*SLIDER*/}
                <SliderBig
                    dataHotelNumber={item}
                    height={"150px"}
                    maxWidth={"100%"}
                    borderRadius={"10px"}
                    minWidth={"250px"}
                    mb={"5px"}
                    padding={"5px"}
                />
                <div className="column__sb" style={{marginLeft: "10px"}}>
                    <div className="row__c__fs ">
                        <span className="text__content__black__b__16" style={{margin: "5px"}}>{header}</span>
                    </div>
                    <div className="column__fs__c">
                        <span className="text__content__grey__12" style={{margin: "5px"}}>
                            ID {id}
                        </span>
                    </div>
                    <div className="row__sb__c" style={{marginLeft: "5px"}}>
                        <div className="column__fs__c">
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Адрес</span>
                            </div>
                            <div className="row__c__fs">
                                <span
                                    className="text__content__black__b__12">{address.ru === undefined ? "" : address.ru || address.en}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Цена за сутки</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{price} ₽</span>
                            </div>
                        </div>
                    </div>

                    <div className="row__sb__c">
                        <ButtonIcon
                            style={"moreBookingBtn"}
                            name={width >= 0 && width <= 425 ? "" :"Подробнее"}
                            link={"/Отель"}
                            icon={<Icon24ListBulletOutline color={WHITE} width={20} height={20}/>}
                            handler={() => dispatch(dataHotelHandler(item))}
                            styleText={"text__content__white__12"}
                        />
                        <ButtonIcon
                            style={"bookBookingBtn"}
                            name={width >= 0 && width <= 425 ? "" :"Забронировать"}
                            icon={<Icon24MoneyTransfer color={WHITE} width={20} height={20}/>}
                            handler={() => dispatch(dataHotelUserHandler(item))}
                            styleText={"text__content__white__12"}
                            link={"/Личный_кабинет"}
                        />
                        <ButtonIcon
                            style={"delBookingBtn"}
                            name={width >= 0 && width <= 425 ? "" :"Удалить"}
                            icon={<Icon24Delete color={WHITE} width={20} height={20}/>}
                            handler={() => dispatch(delFavoriteUserDataHandler(id))}
                            styleText={"text__content__white__12"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
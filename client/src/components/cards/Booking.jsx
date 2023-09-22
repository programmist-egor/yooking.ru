import {useDispatch} from "react-redux";
import {SliderBig} from "../slider/SliderBig";
import React, {useEffect, useState} from "react";
import {Icon24Delete, Icon24ListBulletOutline, Icon24MoneyTransfer} from '@vkontakte/icons';
import {ORANGE, RED, WHITE} from "../../theme/colors";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {dataHotelHandler} from "../../store/HotelItem";
import {delBookingUserDataHandler} from "../../store/ClientData";

export const Booking = ({header, price, dateRange, guest, width, checkIn, checkOut, item, id}) => {
    const dispatch = useDispatch()

    return (
        <div>
            <div className="row__fs__fs borderBottom desktop__booking__hotel__block" style={{paddingBottom: "15px",  marginBottom: "20px"}} key={id}>
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
                    <div className="row__sb__c ">
                        <div className="column__fs__c">
                        <span className="text__content__grey__12" style={{margin: "5px"}}>
                            ID {id}
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
                                <span className="text__content__grey__12">Дата заезда и отъезда</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{dateRange}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Цена</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{price} ₽</span>
                            </div>
                        </div>
                        <div className="column__fs__c">
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Время заезда и отъезда</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{checkIn} - {checkOut}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Количество гостей</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{guest}</span>
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
                            style={"sellBookingBtn"}
                            name={"Оплатить"}
                            icon={<Icon24MoneyTransfer color={WHITE} width={20} height={20}/>}
                            handler={() => console.log("Оплатить")}
                            styleText={"text__content__white__12"}
                        />
                        <ButtonIcon
                            style={"delBookingBtn"}
                            name={"Удалить"}
                            icon={<Icon24Delete color={WHITE} width={20} height={20}/>}
                            handler={() => dispatch(delBookingUserDataHandler(id))}
                            styleText={"text__content__white__12"}
                        />
                    </div>
                </div>
            </div>
            <div className="column__fs borderBottom mobile__booking__hotel__block" style={{paddingBottom: "15px", marginBottom: "20px"}} key={id}>
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
                <div className="column__sb" style={{marginLeft: "10px", }}>
                    <div className="row__c__fs ">
                        <span className={"text__content__black__b__16"} style={{margin: "5px"}}>{header}</span>
                    </div>
                    <div className="row__sb__c ">
                        <div className="column__fs__c">
                        <span className="text__content__grey__12" style={{margin: "5px"}}>
                            ID {id}
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
                                <span className="text__content__grey__12">Дата заезда и отъезда</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{dateRange}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Цена</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{price} ₽</span>
                            </div>
                        </div>
                        <div className="column__fs__c">
                            <div className="row__c__fs">
                                <span className="text__content__grey__12">Время заезда и отъезда</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{checkIn} - {checkOut}</span>
                            </div>
                            <div className="row__c__fs" style={{marginTop: "5px"}}>
                                <span className="text__content__grey__12">Количество гостей</span>
                            </div>
                            <div className="row__c__fs">
                                <span className="text__content__black__b__12">{guest}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row__sb__c">
                        <ButtonIcon
                            style={"moreBookingBtn"}
                            name={width >= 0 && width <= 425 ? "" : "Подробнее"}
                            link={"/Отель"}
                            icon={<Icon24ListBulletOutline color={WHITE} width={20} height={20}/>}
                            handler={() => dispatch(dataHotelHandler(item))}
                            styleText={"text__content__white__12"}
                        />
                        <ButtonIcon
                            style={"sellBookingBtn"}
                            name={width >= 0 && width <= 425 ? "" : "Оплатить"}
                            icon={<Icon24MoneyTransfer color={WHITE} width={20} height={20}/>}
                            handler={() => console.log("Оплатить")}
                            styleText={"text__content__white__12"}
                        />
                        <ButtonIcon
                            style={"delBookingBtn"}
                            name={width >= 0 && width <= 425 ? "" : "Удалить"}
                            icon={<Icon24Delete color={WHITE} width={20} height={20}/>}
                            handler={() => dispatch(delBookingUserDataHandler(id))}
                            styleText={"text__content__white__12"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
import {BLACK, GREY, GREY_BLACK, RED, WHITE} from "../../theme/colors";
import Drawer from "react-modern-drawer";
import {Icon24BriefcaseOutline, Icon24ErrorCircleOutline, Icon24ChevronDown, Icon24Cancel} from "@vkontakte/icons";
import {DataRange} from "../search/DataRange";
import {GuestHotel} from "../search/GuestHotel";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {dataHotelUserHandler} from "../../store/ClientData";
import InputMask from "react-input-mask";
import MobileCode from "../modals/MobileCode";
import React from "react";

export const HotelRules = ({dataHotelNumber}) => {
    const [isOpenBooking, setIsOpenBooking] = React.useState(false)

    const toggleDrawerBooking = () => {
        setIsOpenBooking((prevState) => !prevState)
    }
    return (
        <div>
            <div className="column__fs hotel__rules">
            <span className="text__content__black__b__20" style={{marginBottom: "15px"}}>
                Правила объекта размещения
            </span>
                <div className="row__fs__sb" style={{flexWrap: "wrap"}}>
                    <div className="column__fs__c">
                        <div className="row__c__fs" style={{marginBottom: "15px"}}>
                        <span className="material-symbols-outlined">
                            escalator_warning
                        </span>
                            <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                            Можно с детьми любого возраста
                        </span>
                        </div>
                        <div className="row__c__fs" style={{marginBottom: "15px"}}>
                        <span className="material-symbols-outlined">
                            smoke_free
                        </span>
                            <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                            Курение запрещено
                        </span>
                        </div>
                        <div className="row__c__fs" style={{marginBottom: "15px"}}>
                        <span className="material-symbols-outlined">
                            celebration
                        </span>
                            <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                            Без вечеринок и мероприятий
                        </span>
                        </div>
                        <div className="row__c__fs" style={{marginBottom: "15px"}}>
                        <span className="material-symbols-outlined">
                            pets
                        </span>
                            <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                            Можно с питомцами по согласованию с хозяином жилья
                        </span>
                        </div>
                        <div className="row__c__fs" style={{marginBottom: "15px"}}>
                        <span className="material-symbols-outlined">
                            quick_reference
                        </span>
                            <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                            Владелец предоставляет отчетные документы о проживании по согласованию
                        </span>
                        </div>
                    </div>
                    <div className="column__fs__c" style={{marginRight: "30px"}}>
                        <div className="row__fs__sb">
                            <div className="column__fs__c">
                            <span className="text__content__black__b__16">
                                Заезд
                            </span>
                                <span className="text__content__black__16" style={{marginTop: "10px"}}>
                                после {dataHotelNumber.checkIn}
                            </span>
                            </div>
                            <div className="column__fs__c">
                            <span className="text__content__black__b__16">
                                Отезд
                            </span>
                                <span className="text__content__black__16" style={{marginTop: "10px"}}>
                                после {dataHotelNumber.checkOut}
                            </span>
                            </div>
                        </div>
                        <span className="text__content__black__b__16" style={{marginTop: "20px"}}>
                            Минимальный срок проживания
                        </span>
                        <span className="text__content__black__16" style={{marginTop: "10px"}}>
                            от {dataHotelNumber.minimumNightStay} суток
                        </span>
                    </div>
                </div>
            </div>
            <div className="column mobile__quick__booking" style={{marginBottom: "30px"}}>
                <Drawer
                    open={isOpenBooking}
                    onClose={toggleDrawerBooking}
                    direction='bottom'
                    style={{height: "80vh", overflowY: "scroll"}}
                >
                    <div className="column" style={{height: "100%", background: WHITE, padding: "20px",}}>
                        <div className="row__sb__c">
                            <h4> Правила объекта размещения</h4>
                            <span onClick={() => toggleDrawerBooking()}
                                  style={{cursor: "pointer"}}>
                               <Icon24Cancel color={GREY_BLACK}/>
                            </span>
                        </div>

                        <div className="column__fs__c">
                            <div className="row__fs__sb">
                                <div className="column__fs__c">
                                             <span className="text__content__black__b__16">
                                                Заезд
                                            </span>
                                    <span className="text__content__black__16" style={{marginTop: "10px"}}>
                                                после {dataHotelNumber.checkIn}
                                            </span>
                                </div>
                                <div className="column__fs__c">
                                            <span className="text__content__black__b__16">
                                                Отезд
                                            </span>
                                    <span className="text__content__black__16" style={{marginTop: "10px"}}>
                                                после {dataHotelNumber.checkOut}
                                            </span>
                                </div>
                            </div>
                            <span className="text__content__black__b__16" style={{marginTop: "20px"}}>
                                                Минимальный срок проживания
                                            </span>
                            <span className="text__content__black__16" style={{marginTop: "10px", marginBottom: "10px"}}>
                                                от {dataHotelNumber.minimumNightStay} суток
                                            </span>
                            <div className="row__c__fs" style={{marginBottom: "15px"}}>
                                    <span className="material-symbols-outlined">
                                        escalator_warning
                                    </span>
                                <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                                        Можно с детьми любого возраста
                                    </span>
                            </div>
                            <div className="row__c__fs" style={{marginBottom: "15px"}}>
                                    <span className="material-symbols-outlined">
                                        smoke_free
                                    </span>
                                <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                                        Курение запрещено
                                        </span>
                            </div>
                            <div className="row__c__fs" style={{marginBottom: "15px"}}>
                                        <span className="material-symbols-outlined">
                                            celebration
                                        </span>
                                <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                                            Без вечеринок и мероприятий
                                        </span>
                            </div>
                            <div className="row__c__fs" style={{marginBottom: "15px"}}>
                                        <span className="material-symbols-outlined">
                                            pets
                                        </span>
                                <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                                            Можно с питомцами по согласованию с хозяином жилья
                                        </span>
                            </div>
                            <div className="row__c__fs" style={{marginBottom: "15px"}}>
                                        <span className="material-symbols-outlined">
                                            quick_reference
                                        </span>
                                <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                                            Владелец предоставляет отчетные документы о проживании по согласованию
                                        </span>
                            </div>
                        </div>
                    </div>
                </Drawer>
                <ButtonIcon
                    handler={() => toggleDrawerBooking()}
                    icon={<Icon24ErrorCircleOutline color={BLACK}/>}
                    style={"bookRulesBtn"}
                    name={"Правила размещения в отеле"}
                    styleText={"text__content__black__16"}
                />
            </div>
        </div>

    )
}
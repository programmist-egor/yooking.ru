import {BLACK, GREY_BLACK,  WHITE} from "../../theme/colors";
import Drawer from "react-modern-drawer";
import {Icon24ErrorCircleOutline, Icon24Cancel} from "@vkontakte/icons";
import {ButtonIcon} from "../buttons/ButtonIcon";
import React, {useEffect} from "react";
import {optionCheckBoxPropertyRules} from "../../utils/varible";

export const HotelRules = ({dataHotelNumber}) => {
    const [isOpenBooking, setIsOpenBooking] = React.useState(false)
    const [filterRules, setFilterRules] = React.useState([])

    const toggleDrawerBooking = () => {
        setIsOpenBooking((prevState) => !prevState)
    }

    useEffect(() => {
        if (dataHotelNumber !== null) {
            const newFilterRules = dataHotelNumber.propertyRules.map(rule => {
                return optionCheckBoxPropertyRules.find(item => item.value === rule);
            }).filter(Boolean); // Фильтруем, чтобы удалить пустые значения
            console.log(newFilterRules);
            setFilterRules(newFilterRules);
        }
    }, [dataHotelNumber, optionCheckBoxPropertyRules]);

    return (
        <div>
            <div className="column__fs hotel__rules">
            <span className="text__content__black__b__20" style={{marginBottom: "15px"}}>
                Правила объекта размещения
            </span>
                <div className="row__fs__sb" style={{flexWrap: "wrap"}}>
                    <div className="column__fs__c">
                        {
                            filterRules.map(item => (
                                <div className="row__c__fs" style={{marginBottom: "15px"}}>
                                    <span className="material-symbols-outlined">
                                        {item.icon.replace(/"/g, '')}
                                    </span>
                                    <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                                        {item.name}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="column__fs__c" style={{marginRight: "30px"}}>
                        <div className="row__fs__sb">
                            <div className="column__fs__c">
                            <span className="text__content__black__b__16">
                                Заезд
                            </span>
                                <span className="text__content__black__16" style={{marginTop: "10px"}}>
                                до {dataHotelNumber?.checkIn}
                            </span>
                            </div>
                            <div className="column__fs__c">
                            <span className="text__content__black__b__16">
                                Отезд
                            </span>
                                <span className="text__content__black__16" style={{marginTop: "10px"}}>
                                после {dataHotelNumber?.checkOut}
                            </span>
                            </div>
                        </div>
                        <span className="text__content__black__b__16" style={{marginTop: "20px"}}>
                            Минимальный срок проживания
                        </span>
                        <span className="text__content__black__16" style={{marginTop: "10px"}}>
                            от {dataHotelNumber?.minimumNightStay} суток
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
                                                до {dataHotelNumber?.checkIn}
                                            </span>
                                </div>
                                <div className="column__fs__c">
                                            <span className="text__content__black__b__16">
                                                Отезд
                                            </span>
                                    <span className="text__content__black__16" style={{marginTop: "10px"}}>
                                                после {dataHotelNumber?.checkOut}
                                            </span>
                                </div>
                            </div>
                            <span className="text__content__black__b__16" style={{marginTop: "20px"}}>
                                                Минимальный срок проживания
                                            </span>
                            <span className="text__content__black__16"
                                  style={{marginTop: "10px", marginBottom: "10px"}}>
                                                от {dataHotelNumber?.minimumNightStay} суток
                                            </span>
                            {
                                filterRules.map(item => (
                                    <div className="row__c__fs" style={{marginBottom: "15px"}}>
                                    <span className="material-symbols-outlined">
                                        {item.icon.replace(/"/g, '')}
                                    </span>
                                        <span className="text__content__black__16" style={{marginLeft: "15px"}}>
                                        {item.name}
                                    </span>
                                    </div>
                                ))
                            }
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
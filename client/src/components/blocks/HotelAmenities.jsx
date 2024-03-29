import {BLACK, GREY_BLACK, WHITE} from "../../theme/colors";
import {
    Icon28CheckCircleOutline, Icon24Cancel, Icon24BuildingOutline
} from '@vkontakte/icons';
import Drawer from "react-modern-drawer";
import {ButtonIcon} from "../buttons/ButtonIcon";
import React, {useEffect} from "react";
import {optionCheckBoxShortFacilities} from "../../utils/varible";


export const HotelAmenities = ({dataHotelNumber}) => {
    const [isOpenBooking, setIsOpenBooking] = React.useState(false)
    const [filterRules, setFilterRules] = React.useState([])

    const toggleDrawerBooking = () => {
        setIsOpenBooking((prevState) => !prevState)
    }

    useEffect(() => {
        if (dataHotelNumber !== null) {
            const newFilterRules = dataHotelNumber.shortFacilities.map(rule => {
                return optionCheckBoxShortFacilities.find(item => item.value === rule);
            }).filter(Boolean); // Фильтруем, чтобы удалить пустые значения
            console.log(newFilterRules);
            setFilterRules(newFilterRules);
        }
    }, [dataHotelNumber, optionCheckBoxShortFacilities]);

    return (
        <div>
            <div className="column__fs hotel__amen">
            <span
                className="text__content__black__b__20"
                style={{marginBottom: "15px"}}
            >
                Удобства и услуги гостиницы
            </span>
                <div className="hotel__amenities">
                    {filterRules.map(option => (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 5,
                            }}
                            key={option.id}
                        >
                            <Icon28CheckCircleOutline color={BLACK} width={24} height={24}/>
                            <span
                                className="text__content__black__14"
                                style={{marginLeft: "5px", wordBreak: "break-word"}}
                            >
                            {option.name}
                        </span>
                        </div>
                    ))
                    }
                </div>
            </div>

            <div className="column mobile__quick__booking" style={{marginBottom: "30px"}}>
                <Drawer
                    open={isOpenBooking}
                    onClose={toggleDrawerBooking}
                    direction='bottom'
                    style={{height: "70vh"}}
                >
                    <div className="column" style={{height: "100%", background: WHITE, padding: "20px",}}>
                        <div className="row__sb__c">
                            <h4>Удобства и услуги гостиницы</h4>
                            <span onClick={() => toggleDrawerBooking()}
                                  style={{cursor: "pointer"}}>
                               <Icon24Cancel color={GREY_BLACK}/>
                            </span>
                        </div>

                        <div className="column__fs__c">
                            {filterRules.map(option => (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginTop: 5,
                                    }}
                                    key={option.id}
                                >
                                    <Icon28CheckCircleOutline color={BLACK} width={24} height={24}/>
                                    <span
                                        className="text__content__black__14"
                                        style={{marginLeft: "5px", wordBreak: "break-word"}}
                                    >
                                        {option.name}
                                    </span>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </Drawer>
                <ButtonIcon
                    handler={() => toggleDrawerBooking()}
                    icon={<Icon24BuildingOutline color={BLACK}/>}
                    style={"bookRulesBtn"}
                    name={"Удобства и услуги в отеле"}
                    styleText={"text__content__black__16"}
                />
            </div>
        </div>
    )
}
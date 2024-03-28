import React from "react";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {Icon24BriefcaseOutline} from "@vkontakte/icons";
import {WHITE} from "../../theme/colors";
import BookingService from "../../services/booking.service";
import {useDispatch} from "react-redux";
import {finishedBookingHandler} from "../../store/ClientData";


export const PayForm = ({dataBooking, updateNumber, numberId,userId, updateUser}) => {
    const dispatch = useDispatch()

    const payHandler = async () => {
        BookingService.createBooking("pay", numberId, dataBooking, updateNumber,userId, updateUser)
            .then(() => dispatch(finishedBookingHandler(true)))
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <div className="registration">
                <h2 className="text__content__black__b__26" style={{textAlign: "center"}}>Оплата</h2>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                    <ButtonIcon
                        handler={() => payHandler()}
                        icon={<Icon24BriefcaseOutline color={WHITE}/>}
                        style={"doneBtn"}
                        name={"Оплатить"}
                        styleText={"text__content__white__16"}
                        width={300}
                        link={"/booking"}
                    />
                </div>
            </div>
        </div>
    )
}
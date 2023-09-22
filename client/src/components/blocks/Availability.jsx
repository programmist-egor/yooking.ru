import {GREY, WHITE} from "../../theme/colors";
import prewiew from "../../img/preview.png"
import {AvailabilityItems} from "./AvailabilityItems";
import {Spinner} from "../spinner/Spinner";
import React, {useEffect} from "react";
import {loadingListHandler} from "../../store/HotelItem";
import {useDispatch, useSelector} from "react-redux";

export const Availability = ({dataHotelNumber}) => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.hotels_item.loadingList)

    useEffect(() => {
        setTimeout(() => {
            dispatch(loadingListHandler({type: "hotelList", value: {res: true, time: 3000}}))
        }, loading.time)
    }, [loading.res])


    return (
        <div
            className="column__fs"
            style={{
                background: WHITE,
                borderRadius: "20px",
                padding: "20px",
                height: "100%",
                marginBottom: "40px"
            }}
        >
            <span
                className="text__content__black__b__20"
                style={{
                    marginBottom: "25px"
                }}
            >
                Наличие свободных мест
            </span>
            <div className="column" style={{overflowY: "scroll", height: "50vh"}}>
                <>
                    <div className="row__c__c">
                        <h3 style={{color: GREY}}>Ничего не найдено</h3>
                    </div>

                </>
                {/*{loading.res ?*/}
                {/*    dataHotelNumber.countFreeNumberHotel !== 0 ?*/}
                {/*        dataHotelNumber.freeNumbersHotel.map(item => (*/}
                {/*            <AvailabilityItems*/}
                {/*                id={item.id}*/}
                {/*                header={item.header}*/}
                {/*                price={item.price}*/}
                {/*                date={item.date}*/}
                {/*                img={item.img}*/}
                {/*                text={item.text}*/}
                {/*                content={item.content}*/}
                {/*            />*/}
                {/*        ))*/}
                {/*        :*/}
                {/*        <>*/}
                {/*            <div className="row__c__c">*/}
                {/*                <h3 style={{color: GREY}}>Ничего не найдено</h3>*/}
                {/*            </div>*/}

                {/*        </>*/}
                {/*    :*/}
                {/*    <Spinner/>*/}
                {/*}*/}
            </div>
        </div>
    )
}
import {GREY, WHITE} from "../../theme/colors";

import {Spinner} from "../spinner/Spinner";
import React, {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import {ListNumberCard} from "../cards/ListNumberCard";


export const Availability = ({dataHotelNumber}) => {
    const dataNumbersList = useSelector(state => state.hotels_list.dataNumbersList)
    const [width, setWidth] = useState(window.innerWidth);
    const loadingNumberList = useSelector(state => state.hotels_list.loadingNumberList)


    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div
            className="column__fs"
            style={{
                background: WHITE,
                borderRadius: "20px",
                padding: "20px 0px 20px 20px ",
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
            <div className="column number__list__center__scroll" style={{ height: "50vh"}}>
                {loadingNumberList ?
                    <Spinner/>
                    :
                    dataNumbersList && dataNumbersList.length !== 0 ?
                        dataNumbersList.map(number => (
                            <ListNumberCard
                                key={number.id}
                                name={number.name}
                                id={number.id}
                                hotelId={number.hotelId}
                                number={number}
                                categoryId={number.categoryId}
                                guestCount={number.guestCount.length}
                                area={number.area}
                                priceBase={number.priceBase}
                                bedroom={number.countBedrooms}
                                hasWiFi={number.has_wifi.value}
                                width={width}
                                dataHotelNumber={dataHotelNumber}
                            />
                        ))
                        :
                        <>
                            <div className="row__c__c">
                                <h3 style={{color: GREY}}>Нет свободных номеров</h3>
                            </div>

                        </>
                }
            </div>

        </div>
    )
}
import {WHITE} from "../../theme/colors";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import location from "../../assets/image/location_2.png";
import React from "react";

export const HotelAddressOnMap = ({dataHotelNumber}) => {
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
            <span className="text__content__black__b__20" style={{marginBottom: "15px"}}>
                {dataHotelNumber?.address}
            </span>
            <div className="row__c__c" style={{marginTop: "30px",   marginBottom: "30px"}}>
                    <YMaps query="ru_RU">
                        <Map
                            defaultState ={{center: [dataHotelNumber?.location.lat, dataHotelNumber?.location.lon], zoom: 15}}
                            width={"100%"}
                            height={"50vh"}
                        >
                            <Placemark
                                key={dataHotelNumber?.hotelId}
                                geometry={[dataHotelNumber?.location.lat, dataHotelNumber?.location.lon]}
                                properties={{
                                        hintContent: `<span class="text__content__black__12"><b>${dataHotelNumber?.name}</b></span>`,
                                    }}

                                options={{
                                    iconLayout: "default#image",
                                    iconImageSize: [40, 40],
                                    iconImageHref: location,
                                }}
                            />
                        </Map>
                    </YMaps>
                </div>
        </div>
    )
}
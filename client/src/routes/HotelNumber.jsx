import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {HeaderHotelNumber} from "../components/header/HeaderHotelNumber";
import {QuickBooking} from "../components/blocks/QuickBooking";
import {SliderBig} from "../components/slider/SliderBig";
import {DescriptionHotel} from "../components/blocks/DescriptionHotel";
import {HotelRules} from "../components/blocks/HotelRules";
import {CheckAvailability} from "../components/blocks/CheckAvailability";
import {Availability} from "../components/blocks/Availability";
import {HotelAmenities} from "../components/blocks/HotelAmenities";
import {GuestRating} from "../components/blocks/GuestRating";
import {ReviewClients} from "../components/blocks/ReviewClients";
import {HotelAddressOnMap} from "../components/blocks/HotelAddressOnMap";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {initDateRangeHandler} from "../store/HotelItem";
import ObjectService from "../services/object.service";
import {parseJSONProperties} from "../utils/json-parse-object";
import PhotoObjectService from "../services/photo-object.service";


export const HotelNumber = () => {
    const dispatch = useDispatch()
    const hotelId = localStorage.getItem("hotelId")
    const [dataHotelNumber, setDataHotelNumber] = useState(null)
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [objectPhotos, setObjectPhotos] = useState([]);

    useEffect(() => {
        if (objectPhotos.length === 0) {
            PhotoObjectService.getAllPhotosObject("hotel", hotelId)
                .then(data => setObjectPhotos(data))
        }
        ObjectService.getObject("hotel", hotelId)
            .then(data => setDataHotelNumber(parseJSONProperties(data)))
        dispatch(initDateRangeHandler())
    }, [])



    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <div className="hotel__number__column">
                    <HeaderHotelNumber
                        dataHotelNumber={dataHotelNumber}
                        width={width}
                        hotelId={hotelId}
                    />
                    <div className="row__sa__fs">
                        <div className="column__fs__c laptop_768_1023__column">
                            {/*Быстрое бронирование*/}
                            <QuickBooking dataHotelNumber={dataHotelNumber}/>
                        </div>
                        <div className="column__fs__c"
                             style={{maxWidth: "100%", minWidth: "4%",}}>
                            <SliderBig
                                photos={objectPhotos}
                                height={width >= 0 && width <= 530 ? "300px" : "600px"}
                                maxWidth={""}
                                borderRadius={"20px"}
                                minWidth={""}
                                mb={"20px"}
                                padding={"20px"}
                            />
                            {width >= 0 && width <= 1023 ? <QuickBooking dataHotelNumber={dataHotelNumber}/> : ""}
                            <DescriptionHotel dataHotelNumber={dataHotelNumber}/>
                            <HotelRules dataHotelNumber={dataHotelNumber}/>
                            <CheckAvailability dataHotelNumber={dataHotelNumber}/>
                            <Availability dataHotelNumber={dataHotelNumber}/>
                            <HotelAmenities dataHotelNumber={dataHotelNumber}/>
                            <GuestRating hotelId={hotelId}/>
                            <ReviewClients hotelId={hotelId}/>
                            <span
                                className="text__content__black__b__20"
                                style={{marginBottom: "30px"}}
                            >
                                Местоположение
                            </span>
                            <HotelAddressOnMap dataHotelNumber={dataHotelNumber}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
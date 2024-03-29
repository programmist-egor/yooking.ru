import React, { useEffect, useState } from "react";
import { Map, Placemark, YMaps, FullscreenControl, ZoomControl } from "@pbe/react-yandex-maps";
import location from "../../assets/image/location_2.png";
import { Spinner } from "../spinner/Spinner";
import { BalloonYandexMap } from "../blocks/BalloonYandexMap";
import { createPortal } from "react-dom";
import {  useSelector } from "react-redux";

export const HotelMap = () => {
    const loadingMap = useSelector(state => state.hotels_list.loadingMap);
    const objectList = useSelector(state => state.hotels_list.objectList);
    const [activePortal, setActivePortal] = useState(false);
    const [idHotel, setIdHotel] = useState(null);
    const filteredHotels = useSelector(state => state.hotels_list.filteredHotels);
    const locationMap = localStorage.getItem('location');
    const locationJsonParse = JSON.parse(locationMap);
    const mapState = {
        center: [locationJsonParse.lat, locationJsonParse.lon],
        zoom: locationJsonParse.zoom,
    };

    const Portal = ({ children, getHTMLElementId }) => {
        const mount = document.getElementById(getHTMLElementId);
        const el = document.createElement('div');

        useEffect(() => {
            if (mount) mount.appendChild(el);
            return () => {
                if (mount) mount.removeChild(el);
            };
        }, [el, mount]);

        if (!mount) return null;
        return createPortal(children, el);
    };

    const handlePlacemarkClick =  (item) => {
        setTimeout(() => {
            setActivePortal(true);
            setIdHotel(item.hotelId);
            const localDataLocation = { lat: item.location.lat, lon: item.location.lon, zoom: 16 };
            localStorage.setItem('location', JSON.stringify(localDataLocation));
        }, 0)

    };

    return (
        <div className="mapYandex">
            <YMaps preload={true} query="ru_RU">
                {!loadingMap ? (
                    <Map
                        defaultState={mapState}
                        width={"100%"}
                        height={"96vh"}
                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    >
                        <ZoomControl options={{ float: "right" }} />
                        <FullscreenControl />
                        {filteredHotels !== null ? (
                            filteredHotels.map(item => (
                                <Placemark
                                    key={item.hotelId}
                                    geometry={[item.location.lat, item.location.lon]}
                                    properties={{
                                        hintContent: `<span class="text__content__black__12"><b>${item.name}</b></span>`,
                                        balloonContent: '<div id="driver-2" class="balloon__card"></div>',
                                    }}
                                    onClick={() => handlePlacemarkClick(item)}
                                    options={{
                                        iconLayout: "default#image",
                                        iconImageSize: [40, 40],
                                        iconImageHref: location,
                                    }}
                                />
                            ))
                        ) : (
                            objectList.map(item => (
                                <Placemark
                                    key={item.hotelId}
                                    geometry={[item.location.lat, item.location.lon]}
                                    properties={{
                                        hintContent: `<span class="text__content__black__12"><b>${item.name}</b></span>`,
                                        balloonContent: '<div id="driver-2" class="balloon__card"></div>',
                                    }}
                                    onClick={() => handlePlacemarkClick(item)}
                                    options={{
                                        iconLayout: "default#image",
                                        iconImageSize: [40, 40],
                                        iconImageHref: location,
                                    }}
                                />
                            ))
                        )}
                    </Map>
                ) : (
                    <Spinner />
                )}
                {activePortal && (
                    <Portal getHTMLElementId={'driver-2'}>
                        {objectList.map(item => {
                            if (item.hotelId === idHotel) {
                                return (
                                    <BalloonYandexMap
                                        key={item.hotelId}
                                        hotelId={item.hotelId}
                                        name={item.name}
                                        rating={item.rating}
                                        item={item}
                                    />
                                );
                            }
                            return null;
                        })}
                    </Portal>
                )}
            </YMaps>
        </div>
    );
};
import React, {useEffect, useRef, useState} from "react";
import {Map, Placemark, YMaps, Button, Clusterer, FullscreenControl, ZoomControl} from "@pbe/react-yandex-maps";
import location from "../../img/location_2.png";
import location_2 from "../../img/location.png";
import {Spinner} from "../spinner/Spinner";
import {BalloonYandexMap} from "../blocks/BalloonYandexMap";
import {createPortal} from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadingMapHandler, showHotelMapHandler} from "../../store/HotelsList";


export const HotelMap = () => {
    const dispatch = useDispatch()
    const dataHotelsList = useSelector(state => state.hotels_list.dataHotelsList)
    const loadingMap = useSelector(state => state.hotels_list.loadingMap)
    const showHotelMap = useSelector(state => state.hotels_list.showHotelMap)
    const showPlaceMark = useSelector(state => state.hotels_list.showPlaceMark)
    const loadingHotelList = useSelector(state => state.hotels_list.loadingHotelList)
    const itemPage = useSelector(state => state.hotels_list.itemPage)
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const [activePortal, setActivePortal] = useState(false)
    const [idHotel, setIdHotel] = useState(null)
    const filteredHotels = useSelector(state => state.hotels_list.filteredHotels)

    const mapState = {
        center: [showHotelMap.lat, showHotelMap.lon],
        zoom: showHotelMap.zoom,
    };


    const Portal =
        ({children, getHTMLElementId}) => {
            const mount = document.getElementById(getHTMLElementId)
            const el = document.createElement('div')
            useEffect(() => {

                if (mount) mount.appendChild(el)
                return () => {
                    if (mount) mount.removeChild(el)
                }
            }, [el, mount])

            if (!mount) return null
            return createPortal(children, el)
        }

    return (
        <div className="mapYandex">
            <YMaps preload={true} query="ru_RU">
                {!loadingMap ?
                    <Map
                        defaultState={mapState}
                        width={"100%"}
                        height={"96vh"}
                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    >
                        <ZoomControl options={{ float: "right" }} />
                        <FullscreenControl />
                        {filteredHotels !== null ?
                            filteredHotels[itemPage].hotels.map(item => (

                                <Placemark
                                    key={item.hotelId}
                                    geometry={[item.location.lat, item.location.lon]}
                                    properties={
                                        {
                                            hintContent: `<span class="text__content__black__12"><b>${item.name}</b></span>`,
                                            balloonContent: '<div id="driver-2" class="balloon__card"></div>',
                                        }}

                                    onClick={() => {
                                        // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                                        setTimeout(() => {
                                            setActivePortal(true);
                                            setIdHotel(item.hotelId);
                                            dispatch(
                                                showHotelMapHandler({
                                                    lat: item.location.lat,
                                                    lon: item.location.lon,
                                                    zoom: 13,
                                                })
                                            );

                                        }, 0)
                                    }}

                                    options={{
                                        iconLayout: "default#image",
                                        iconImageSize: [40, 40],
                                        iconImageHref: location,

                                    }}

                                />
                            ))
                            :
                                dataHotelsList[itemPage].hotels.map(item => (
                                    <Placemark
                                        key={item.hotelId}
                                        geometry={[item.location.lat, item.location.lon]}
                                        properties={
                                            {
                                                hintContent: `<span class="text__content__black__12"><b>${item.name}</b></span>`,
                                                balloonContent: '<div id="driver-2" class="balloon__card"></div>',
                                            }}

                                        onClick={() => {
                                            // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                                            setTimeout(() => {
                                                setActivePortal(true);
                                                setIdHotel(item.hotelId);
                                                dispatch(
                                                    showHotelMapHandler({
                                                        lat: item.location.lat,
                                                        lon: item.location.lon,
                                                        zoom: 13,
                                                    })
                                                );

                                            }, 0)
                                        }}

                                        options={{
                                            iconLayout: "default#image",
                                            iconImageSize: [40, 40],
                                            iconImageHref: location,

                                        }}

                                    />
                                ))

                        }
                    </Map>
                    :
                    <Spinner/>}
                {activePortal &&
                    <Portal getHTMLElementId={'driver-2'}>
                        {dataHotelsList[itemPage].hotels.map(item => {
                            if (item.hotelId === idHotel) {
                                return (
                                    < BalloonYandexMap
                                        hotelId={item.hotelId}
                                        favorite={item.favorite}
                                        name={item.name}
                                        img={item.photos}
                                        price={item.last_price_info}
                                        rating={item.rating}
                                        item={item}
                                    />
                                )
                            }
                        })

                        }
                    </Portal>
                }
            </YMaps>
        </div>
    );
}

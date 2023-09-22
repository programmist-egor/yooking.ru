import img__1 from "../../img/blocks/1.png"
import img__2 from "../../img/blocks/2.png"
import img__3 from "../../img/blocks/3.png"
import img__4 from "../../img/blocks/4.png"
import img__5 from "../../img/blocks/5.png"
import img__6 from "../../img/blocks/6.png"
import piter from "../../img/blocks/piter.png"
import sochi from "../../img/blocks/sochi.jpg"
import novosib from "../../img/blocks/novosib.jpg"
import moscow from "../../img/blocks/moscow.jpg"
import samara from "../../img/blocks/samara.jpg"
import rostov from "../../img/blocks/rostov.jpg"
import {BLACK_OPACITY, WHITE} from "../../theme/colors";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handlerCountHotels, handlerHotelCityId} from "../../store/Main";
import {
    copyDataHotelsListHandler,
    countPageHandler, dataHotelsListHandler, loadingHotelListHandler,
    loadingListHandler,
    loadingMapHandler, loadingPageCityHotelHandler,
    pageSwitchingHandler, resultLoadDataHandler,
    showHotelMapHandler
} from "../../store/HotelsList";
import {countHandler, countOtherSortHandler} from "../../store/Filter";
import Service from "../service";
import {cityOrHotelHandler, cityOrHotelInput} from "../../store/Search";
import {useEffect, useState} from "react";
import {getRandomInRange, pageDistribution} from "../utils/search-hotels";
import prewiew from "../../img/preview.png";


export const WhereToGo = ({closeModals}) => {
    const dispatch = useDispatch()
    const dataHotelsList = useSelector(state => state.hotels_list.dataHotelsList)
    const copyDataHotelsList = useSelector(state => state.hotels_list.copyDataHotelsList)
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const [data, setDataCity] = useState([
        {
            id: 1,
            cityId: "12185",
            name: "Ростов-на-Дону, Россия",
            img: img__1,
            text: "Ростов на Дону",
            header: "ГДЕ ОСТАНОВИТЬСЯ В РОСТОВЕ НА ДОНУ",
            banner: rostov,
            price: "5600 ₽",
        },
        {
            id: 2,
            cityId: "12196",
            name: "Санкт-Петербург, Россия",
            img: img__2,
            text: "Санкт - Петербург",
            header: "ГДЕ ОСТАНОВИТЬСЯ В САНКТ - ПЕТЕРБУРГЕ",
            banner: piter,
            price: "6220 ₽",
        },
        {
            id: 3,
            cityId: "12153",
            name: "Москва, Россия",
            img: img__3,
            text: "Москва",
            header: "ГДЕ ОСТАНОВИТЬСЯ В МОСКВЕ",
            banner: moscow,
            price: "7210 ₽",
        },
        {
            id: 4,
            cityId: "12193",
            name: "Сочи, Россия",
            img: img__4,
            text: "Сочи",
            header: "ГДЕ ОСТАНОВИТЬСЯ В СОЧИ",
            banner: sochi,
            price: "6950 ₽",
        },
        {
            id: 5,
            cityId: "12188",
            name: "Самара, Россия",
            img: img__5,
            text: "Самара",
            header: "ГДЕ ОСТАНОВИТЬСЯ В САМАРЕ",
            banner: samara,
            price: "4850 ₽",
        },
        {
            id: 6,
            cityId: "12167",
            name: "Новосибирск, Россия",
            img: img__6,
            text: "Новосибирск",
            header: "ГДЕ ОСТАНОВИТЬСЯ В НОВОСИБИРСКЕ",
            banner: novosib,
            price: "6600 ₽",
        },
    ])

    const rangeValueStart = useSelector(state => state.filter.rangeValueStart)
    const rangeValueEnd = useSelector(state => state.filter.rangeValueEnd)
    const dataCityHotel = new Service()
    const [isDataNull, setIsDataNull] = useState(null)

    // //
    // useEffect(() => {
    //     if(isDataNull === null) {
    //         onValue(ref(database), shapshot => {
    //             const data = shapshot.val();
    //             console.log("DB", data.cityData.city);
    //             if (data.cityData !== null) {
    //                 Object.values(data.cityData).map(item => {
    //                     setIsDataNull(item)
    //                 })
    //             }
    //         })
    //     } else {
    //         console.log("Загрузка уже была!");
    //     }
    //
    // }, [])

    const updateHoleList = (lat,lon) => {
        //Возврат на первую страницу
        dispatch(pageSwitchingHandler(0))
        //Обновление местоположения
        dispatch(showHotelMapHandler(
            {
                lat: lat,
                lon: lon,
                zoom: 13
            }))
    }

    const showLoadingIndicator = () => {
        // добавьте здесь код для отображения индикатора загрузки
        dispatch(loadingPageCityHotelHandler(true))
        console.log('Показать индикатор загрузки');
    };

    const hideLoadingIndicator = () => {
        // добавьте здесь код для скрытия индикатора загрузки
        dispatch(loadingPageCityHotelHandler(false))
        console.log('Скрыть индикатор загрузки');
    };


    const formatHotel = (hotel, hotelDetails) => {
        return {
            hotelId: hotel.hotel_id,
            name: hotel.name,
            has_wifi: hotel.has_wifi,
            property_type: hotel.property_type,
            stars: hotel.stars,
            last_price_info: hotel.last_price_info || 0,
            distance: hotel.distance,
            metro: [],
            rating: getRandomInRange(6, 10),
            countReviews: [{
                id: 1,
                reviewPlus: "",
                reviewMinus: "",
                rating: getRandomInRange(6, 10),
                infoHotel: {},
                person: {id: 1, name: ""}
            }],
            favorite: false,
            political_cancel: ["withoutPrepayment", "paymentInAdvance", "freeCancellation"],
            nutrition: ["breakfastIncluded", "breakfastAndDinnerIncluded", "withOwnKitchen"],
            countFreeNumberHotel: 0,
            idObject: getRandomInRange(0, 100000),
            freeNumbersHotel: [{
                id: 1,
                header: "Двухместный номер с 1 кроватью",
                price: "39 800 ₽",
                date: "За 13 суток",
                img: prewiew,
                text: "2 гостя 1 кровать 1 спальня",
                content: "1 двуспальная кровать"
            }],
            minimumNightStay: 1,
            shortFacilities: [
                "noSmoking",
                "transferAirport",
                "parking",
                "reseption",
                "familyNumber",
                "foodDelivery",
                "pets",
                "restaurant",
                "pool",
                "fitness",
                "spa",
                "wiFiInRoom"
            ],
            countBedrooms: getRandomInRange(1, 4),
            checkIn: hotelDetails.checkIn,
            checkOut: hotelDetails.checkOut,
            location: hotelDetails.location,
            photos: hotelDetails.photos,
            photoCount: hotelDetails.photoCount,
            address: hotelDetails.address,
            cityId: hotelDetails.cityId,
        };
    };

    const getHotelListFromResults = (locationResult, hotelsAtCityResult) => {
        return locationResult.popularity.map((hotel) => {
            const hotelDetails = hotelsAtCityResult.hotels.find((hotelDetails) => hotelDetails.id === hotel.hotel_id);
            return formatHotel(hotel, hotelDetails);
        });
    };

    const createListHotels = (cityId) => {
        // Получение сегодняшней даты и даты через два дня
        const today = new Date();
        const todayFormatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        const twoDaysLater = new Date(today.setDate(today.getDate() + 6));
        const twoDaysLaterFormatted = `${twoDaysLater.getFullYear()}-${String(twoDaysLater.getMonth() + 1).padStart(2, "0")}-${String(twoDaysLater.getDate()).padStart(2, "0")}`;
        return new Promise((resolve, reject) => {
            dataCityHotel
                .getLocationDump(
                    cityId,
                    100,
                    'popularity',
                    todayFormatted,
                    twoDaysLaterFormatted,
                    'ru'
                )
                .then((locationResult) => {
                    return dataCityHotel.getHotelsAtCity(cityId)
                        .then((hotelsAtCityResult) => {
                            resolve({locationResult, hotelsAtCityResult});
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        })
            .then(({locationResult, hotelsAtCityResult}) => {
                const hotelList = getHotelListFromResults(locationResult, hotelsAtCityResult);
                const hotelMoneySort = hotelList.filter(price => price.last_price_info.price >= rangeValueStart && price.last_price_info.price <= rangeValueEnd);
                const sorted = [...hotelMoneySort].sort((a, b) => a.last_price_info.price - b.last_price_info.price);
                // Сортировка массива на страницы
                const list = pageDistribution(sorted);
                // Количество объектов на странице HotelCity
                dispatch(handlerCountHotels(sorted.length))
                // Количество страниц
                dispatch(countPageHandler(list.countPage + 1));
                // Создания копии массива
                dispatch(copyDataHotelsListHandler(list.list));
                // Обновление количества отелей в списке параметров
                dispatch(countOtherSortHandler(list.list));
                // Добавление массива для последующих манипуляций
                dispatch(dataHotelsListHandler(list.list));

                updateHoleList(sorted[0].location.lat, sorted[0].location.lon);

                return 'Список отелей успешно обновлен';
            })
            .catch((error) => {
                console.error('Ошибка при выполнении запросов или формировании списка отелей:', error);
                throw error;
            });
    };


    const handleSearch = async (cityId, value) => {

        showLoadingIndicator();
        try {
            await createListHotels(cityId);
            dispatch(handlerHotelCityId(value));
            console.log('Список отелей успешно обновлен');
            dispatch(cityOrHotelInput(value.name));
        } catch (error) {
            console.error('Не удалось создать список отелей:', error);

        } finally {
            hideLoadingIndicator();
        }

    };


    return (
        <div className="column__c__c " onClick={closeModals}>
            <div className="where__to__go">
                <p className="header__where__to__go">Популярные направления</p>
                <div className="city-container">
                    {data.map(item => (
                        <Link
                            to={"/Отели_города"}
                            key={item.id}
                            onClick={() => handleSearch(item.cityId, {
                                header: item.header,
                                name: item.name,
                                banner: item.banner
                            })}
                            className="where__to__go__item city-item"
                            style={{
                                backgroundImage: `url(${item.img})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="row__c__fe" style={{width: "100%", marginTop: "10px", marginRight: "10px"}}>
                                <span style={{
                                    background: BLACK_OPACITY,
                                    color: WHITE,
                                    padding: "5px",
                                    borderRadius: "10px"
                                }}>
                                   От {item.price}
                                </span>
                            </div>
                            <div className="row__c__c" style={{width: "100%"}}>
                                <span className="hotel__city__card" style={{background: BLACK_OPACITY}}>
                                    {item.text}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
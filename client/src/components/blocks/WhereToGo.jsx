import {BLACK_OPACITY, WHITE} from "../../theme/colors";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
     dataNumbersListHandler, loadingHotelListHandler,
    loadingMapHandler, objectListHandler,
    setFilteredHotels,
} from "../../store/HotelsList";
import { countOtherSortHandler} from "../../store/Filter";

import {
    requestParameterHandler, setBannerHandler,
    showCalendarHandler,
    showGuestHandler
} from "../../store/Search";
import {useEffect, useState} from "react";
import ObjectService from "../../services/object.service";
import {parseJSONPropertiesInArray} from "../../utils/json-parse-object";
import SettingPageService from "../../services/setting-page.service";
import {dateFormater, monthText} from "../../utils/dataFormater";


export const WhereToGo = () => {
    const dispatch = useDispatch()
    const requestParameters = useSelector(state => state.search.cityOrHotel)
    const [data, setData] = useState([])
    const [link, setLink] = useState("/hotels_map")

    useEffect(() => {
            if (data.length === 0) {
                SettingPageService.getSettingPage()
                    .then(data => {
                        const result = parseJSONPropertiesInArray(data)
                        setData(result)
                    })
            }
        }
        ,
        []
    )


    const updateHotelList = (reqParams) => {
        const localDataLocation = {
            lat: reqParams.city.location.lat,
            lon: reqParams.city.location.lon,
            zoom: 13
        }
        localStorage.setItem('location', JSON.stringify(localDataLocation));
        dispatch(loadingMapHandler(true))
        setTimeout(() => {
            dispatch(loadingMapHandler(false))
        }, 3000)
        dispatch(showCalendarHandler(false))
        dispatch(showGuestHandler(false));
    }


    const showLoadingIndicator = () => {
        // добавьте здесь код для отображения индикатора загрузки
        dispatch(loadingHotelListHandler(true))
        dispatch(loadingMapHandler(true))

    };

    const hideLoadingIndicator = () => {
        // добавьте здесь код для скрытия индикатора загрузки
        dispatch(loadingHotelListHandler(false))
        dispatch(loadingMapHandler(false))

    };

    const filterNumbers = async (array) => {
        const checkIn = requestParameters.checkIn
        const checkOut = requestParameters.checkOut
        const guest = requestParameters.guest.adult + requestParameters.guest.child.length
        const filteredNumbers = await array.filter(number => {
            // Проверяем диапазон дат в bookingList
            const isDateAvailable = number.bookingList.every(booking => {
                return !(checkIn >= booking.checkIn && checkIn < booking.checkOut) &&
                    !(checkOut > booking.checkIn && checkOut <= booking.checkOut);
            });
            // Проверяем количество гостей
            const isGuestCountValid = number.guestCount.length >= guest;
            return isDateAvailable && isGuestCountValid;
        });
        return filteredNumbers
    }

    const filterObject = (array, numbers) => {
        const filterObject = array.filter(object => {
            return numbers.find(number => object.hotelId === number.hotelId);
        });
        return filterObject
    }
    const [minPrices, setMinPrices] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const prices = {};
            for (const item of data) {
                const price = await pricesHandler({ city: { city: item.city } });
                prices[item.city] = price;
            }
            setMinPrices(prices);
        };

        fetchData();
    }, [data]);


    const pricesHandler = async (city) => {
        const data = await ObjectService.searchObject(city);
        const resultNumbers = parseJSONPropertiesInArray(data.resultNumbers);
        if (resultNumbers.length > 0) {
            const pricesAboveZero = resultNumbers.filter(price => price.priceBase > 0);
            if (pricesAboveZero.length > 0) {
                const minPrice = Math.min(...pricesAboveZero.map(price => price.priceBase));
                return minPrice;
            } else {
                return "Все цены меньше или равны нулю";
            }
        } else {
            return "Нет данных для указанного hotelId";
        }
    }

    const handleSearch = async (reqParams) => {
        if (reqParams.city !== null && reqParams.dataRange !== null && reqParams.guest !== null) {

            showLoadingIndicator();
            try {
                //Загрузка объектов
                ObjectService.searchObject(reqParams)
                    .then(data => {
                        const resultObject = parseJSONPropertiesInArray(data.resultObject)
                        const resultNumbers = parseJSONPropertiesInArray(data.resultNumbers)
                        filterNumbers(resultNumbers)
                            .then(data => {
                                const resultFilterObject = filterObject(resultObject, data)
                                dispatch(objectListHandler(resultFilterObject))
                                dispatch(dataNumbersListHandler(data))
                                dispatch(setFilteredHotels(null));
                                dispatch(countOtherSortHandler(resultFilterObject));
                            });

                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        setLink("/hotels_map");
                    });


                updateHotelList(reqParams);

            } catch (error) {
                console.error('Не удалось создать список отелей:', error);

                setLink("/");
            } finally {
                hideLoadingIndicator();
            }
        } else {
            setLink("/");
        }

    };
    const searchToParams = async ({header, name, banner, location}) => {
        const reqParams = {
            city: {city: name, hotelId: "", location: location},
            dataRange: {
                checkIn: new Date().getDate(),
                checkOut: new Date().getDate() + 2,
                month: monthText(new Date().getMonth()),
                countNight: 2
            },
            guest: {adult: 1, child: []},
            checkIn: dateFormater(new Date()),
            checkOut: dateFormater(new Date(new Date().setDate(new Date().getDate() + 2)))
        }
       dispatch(setBannerHandler(banner))
        dispatch(requestParameterHandler(reqParams))
        await handleSearch(reqParams)
    }


    return (
        <div className="column__c__c ">
            <div className="where__to__go">
                <p className="header__where__to__go">Популярные направления</p>
                <div className="city-container">
                    {data.map(item => (
                        <Link
                            to={link}
                            key={item.city}
                            onClick={() => searchToParams({
                                header: item.city,
                                name: item.city,
                                banner: item.photo,
                                location: item.location
                            })}
                            className="where__to__go__item city-item"
                            style={{
                                backgroundImage: `url(${item.photo})`,
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
                                   {minPrices[item.city] !== undefined ? `От ${minPrices[item.city]}` : "Загрузка..."}
                                </span>
                            </div>
                            <div className="row__c__c" style={{width: "100%"}}>
                                <span className="hotel__city__card" style={{background: BLACK_OPACITY}}>
                                    {item.city}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
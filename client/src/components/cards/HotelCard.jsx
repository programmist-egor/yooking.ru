import {Button} from "../buttons/Button";
import metro from "../../assets/image/metro.png"
import {GREY_BLACK, WHITE} from "../../theme/colors";
import {Rating} from "./Rating";
import {SliderMini} from "../slider/SliderMini";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    dataNumbersListHandler,
    loadingMapHandler, loadNumberListModalHandler,
    showPlaceMarkHandler
} from "../../store/HotelsList";
import {useEffect, useState} from "react";
import {formatMoney} from "../../utils/formating-money";
import PhotoObjectService from "../../services/photo-object.service";
import {parseJSONPropertiesInArray} from "../../utils/json-parse-object";
import RatingService from "../../services/rating.service";
import NumberService from "../../services/number.service";

export const HotelCard = (
    {
        toggleDrawerMap,
        name,
        nearMetro,
        address,
        distance,
        hotelId,
        location,
        item,
        hotelCity,
    }) => {
    const dispatch = useDispatch()
    const showMetro = useSelector(state => state.hotels_list.metroShow)
    const dataNumbersList = useSelector(state => state.hotels_list.dataNumbersList)
    const [objectPhotos, setObjectPhotos] = useState([]);
    const [averagePrice, setAveragePrice] = useState("");
    const [rating, setRating] = useState(0)
    const [ratingObject, setRatingObject] = useState(null);
    const [ratingCount, setRatingCount] = useState([]);
    const requestParameters = useSelector(state => state.hotels_item.cityOrHotel)

    const roundToOneDecimal = (num) => Math.round(num * 10) / 10;

    const calculateTotalRating = (ratings) => {
        const totalRating = Object.values(ratings).reduce((acc, curr) => acc + curr, 0);
        const averageRating = totalRating / Object.keys(ratings).length;
        return roundToOneDecimal(averageRating);
    };

    useEffect(() => {
        if (!ratingObject) {
            RatingService.getAllRatingObject(hotelId)
                .then(data => {
                    if(data.data.length !== 0) {
                        setRatingCount(data.data)
                        const ratings = data.data.reduce((acc, item, index, array) => {
                            acc.cleanliness = (acc.cleanliness || 0) + item.cleanliness / array.length;
                            acc.mood = (acc.mood || 0) + item.mood / array.length;
                            acc.timelyCheckIn = (acc.timelyCheckIn || 0) + item.timelyCheckIn / array.length;
                            acc.priceQuality = (acc.priceQuality || 0) + item.priceQuality / array.length;
                            acc.photoMatch = (acc.photoMatch || 0) + item.photoMatch / array.length;
                            acc.qualityService = (acc.qualityService || 0) + item.qualityService / array.length;
                            return acc;
                        }, {});

                        Object.keys(ratings).forEach(key => {
                            ratings[key] = roundToOneDecimal(ratings[key]);
                        });

                        // Вызов функции для расчета общего рейтинга и сохранение результата в локальную переменную rating
                        const totalRating = calculateTotalRating(ratings);
                        setRating(totalRating);
                        setRatingObject(ratings);
                    } else {
                        const ratings = {
                            cleanliness: 0,
                            mood: 0,
                            timelyCheckIn: 0,
                            priceQuality: 0,
                            photoMatch: 0,
                            qualityService: 0
                        }
                        setRating(0);
                        setRatingObject(ratings);
                    }

                })
                .catch(error => console.log(error));
        }
        if (objectPhotos.length === 0) {
            PhotoObjectService.getAllPhotosObject("hotels_map", hotelId)
                .then(data => setObjectPhotos(data))
        }

        // Фильтрация номеров по hotelId
        const filteredPrices = dataNumbersList.filter(price => price.hotelId === hotelId);
        // Поиск средней цены
        if (filteredPrices.length > 0) {
            const minPrice = Math.min(...filteredPrices.map(price => price.priceBase));
            const filteredMinPrice = minPrice > 0 ? minPrice : 0;
            setAveragePrice(filteredMinPrice);
        } else {
            console.log("Нет данных для указанного hotelId");
        }
    }, [])


    const showHotelOnMap = () => {
        toggleDrawerMap()
        dispatch(showPlaceMarkHandler(true))
        dispatch(loadingMapHandler(true))
        setTimeout(() => {
            dispatch(loadingMapHandler(false))
        }, 1000)
        console.log("// Обновление местоположения", location);
        const localDataLocation = {lat: location.lat, lon: location.lon, zoom: 16}
        localStorage.setItem('location', JSON.stringify(localDataLocation));
    }

    const showHotelOnMapDesktop = () => {
        dispatch(showPlaceMarkHandler(true))
        dispatch(loadingMapHandler(true))
        setTimeout(() => {
            dispatch(loadingMapHandler(false))
        }, 1000)
        console.log("// Обновление местоположения", location);
        const localDataLocation = {lat: location.lat, lon: location.lon, zoom: 16}
        localStorage.setItem('location', JSON.stringify(localDataLocation));
    }

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

    const chooseHotelMore = () => {
        localStorage.setItem("hotelId", hotelId)
        NumberService.getAllNumbers("hotels_map", hotelId)
            .then(data => {
                const resultNumb = parseJSONPropertiesInArray(data)
                filterNumbers(resultNumb)
                    .then(data => {
                        dispatch(dataNumbersListHandler(data))
                    })
                    .catch(e => console.log(e))
                    .finally(() => {
                        dispatch(loadNumberListModalHandler(false))
                    })
            })
    }


    return (
        <div>
            <div
                className="row__c__fs desktop__1250__card__block"
                style={{
                    background: WHITE,
                    borderRadius: "20px",
                    height: "260px",
                    marginBottom: "20px",
                    width: "auto"
                }}
            >
                {/*SLIDER*/}
                <SliderMini
                    item={item}
                    hotelId={hotelId}
                    photoHotel={objectPhotos}
                    width={"360px"}
                    minWidth={"300px"}
                    height={"260px"}
                    borderRadius={"10px 0 0 10px"}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "space-between",
                        flexGrow: 2,
                        margin: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            minWidth: "400px",
                            maxWidth: "100%"
                        }}
                    >
                        <div className="column__fs">
                        <span className="text__content__black__b__16 "
                              style={{overflowWrap: "break-word", width: "100%", marginBottom: "5px"}}>{name}</span>
                            <span className="text__content__black__12 marginsCards"
                                  style={{marginLeft: 0}}>{address}
                        </span>
                            <span className="text__content__black__12 marginsCards"
                                  style={{marginLeft: 0}}>
                            {distance} км от центра города
                        </span>
                            {showMetro ?
                                nearMetro.map(item => (
                                    <div className="row__c__fs" key={item.id}>
                                        <img src={metro} alt="metro"/>
                                        <span className="text__content__grey__12 marginsCards">{item.name}</span>
                                    </div>
                                ))
                                :
                                ""
                            }

                            <Button
                                name={"Показать на карте"}
                                marginLeft={"0"}
                                marginTop={"10px"}
                                height={"20px"}
                                style={"showOnMapBtn"}
                                styleText={"text__content__white__12"}
                                color={GREY_BLACK}
                                handler={() => hotelCity ? showHotelOnMap() : showHotelOnMapDesktop()}
                            />
                        </div>
                        {/*Пустышка*/}
                        <div className="null">---------</div>
                        {/*Оценка отеля*/}
                        <div className="column__c">
                            <Rating
                                rating={rating}
                                countReviews={ratingCount.length}
                            />
                            <div className="row__c__c price__card">
                            <span
                                className="text__content__white__b__15">от {formatMoney(averagePrice)} ₽</span>
                            </div>
                        </div>
                    </div>
                    <Link to={"/hotel"}>
                        <Button
                            name={"Выбрать свободный номер"}
                            marginLeft={"0"}
                            style={"chooseHotelBtn"}
                            marginTop={"35px"}
                            styleText={"text__content__white__15"}
                            handler={() => chooseHotelMore()}
                            height={"40px"}/>
                    </Link>
                </div>
            </div>
            <div
                className="row__c__fs laptop__908_1249__card__block"
                style={{
                    background: WHITE,
                    borderRadius: "20px",
                    height: "260px",
                    marginBottom: "20px",
                    width: "auto",
                    marginRight: "10px"
                }}
            >
                {/*SLIDER*/}
                <SliderMini
                    hotelId={hotelId}
                    photoHotel={objectPhotos}
                    width={"360px"}
                    minWidth={"300px"}
                    height={"260px"}
                    borderRadius={"10px 0 0 10px"}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "space-between",
                        flexGrow: 2,
                        margin: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <div className="column__fs">
                        <span className="text__content__black__b__16 "
                              style={{overflowWrap: "break-word", width: "100%", marginBottom: "5px"}}>{name}</span>
                            <span className="text__content__black__12 marginsCards"
                                  style={{marginLeft: 0}}>{address}
                                </span>
                            <span className="text__content__black__12 marginsCards"
                                  style={{marginLeft: 0}}>
                            {distance} км от центра города
                        </span>
                            {showMetro ?
                                nearMetro.map(item => (
                                    <div className="row__c__fs" key={item.id}>
                                        <img src={metro} alt="metro"/>
                                        <span className="text__content__grey__12 marginsCards">{item.name}</span>
                                    </div>
                                ))
                                :
                                ""
                            }

                            <Button
                                name={"Показать на карте"}
                                marginLeft={"0"}
                                marginTop={"10px"}
                                height={"20px"}
                                style={"showOnMapBtn"}
                                styleText={"text__content__white__12"}
                                color={GREY_BLACK}
                                handler={() => showHotelOnMap()}
                            />
                        </div>
                        {/*Пустышка*/}
                        <div className="null">----</div>
                        {/*Оценка отеля*/}
                        <div className="column__c">
                            <Rating
                                rating={rating}
                                countReviews={ratingCount.length}
                            />
                            <div className="row__c__c price__card">
                            <span
                                className="text__content__white__b__15">от {formatMoney(averagePrice)} ₽</span>
                            </div>
                        </div>
                    </div>
                    <Link to={"/hotel"}>
                        <Button
                            name={"Выбрать свободный номер"}
                            marginLeft={"0"}
                            style={"chooseHotelBtn"}
                            marginTop={"35px"}
                            styleText={"text__content__white__15"}
                            handler={() => chooseHotelMore()}
                            height={"40px"}/>
                    </Link>
                </div>
            </div>
            <div
                className="row__c__fs tablet__661_907__card__block"
                style={{
                    background: WHITE,
                    borderRadius: "20px",
                    height: "240px",
                    marginBottom: "20px",
                    width: "auto",
                    marginRight: "10px",
                    marginLeft: "10px"
                }}
            >
                {/*SLIDER*/}
                <SliderMini
                    hotelId={hotelId}
                    photoHotel={objectPhotos}
                    width={"360px"}
                    minWidth={"300px"}
                    height={"240px"}
                    borderRadius={"10px 0 0 10px"}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "space-between",
                        flexGrow: 1,
                        margin: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            minWidth: "300px",
                            maxWidth: "100%"
                        }}
                    >
                        <div className="column__fs">
                        <span className="text__content__black__b__16 "
                              style={{overflowWrap: "break-word", width: "100%", marginBottom: "5px"}}>{name}</span>
                            <span className="text__content__black__12 marginsCards"
                                  style={{marginLeft: 0}}>{address}
                        </span>
                            <span className="text__content__black__12 marginsCards"
                                  style={{marginLeft: 0}}>
                            {distance} км от центра города
                        </span>
                            {showMetro ?
                                nearMetro.map(item => (
                                    <div className="row__c__fs" key={item.id}>
                                        <img src={metro} alt="metro"/>
                                        <span className="text__content__grey__12 marginsCards">{item.name}</span>
                                    </div>
                                ))
                                :
                                ""
                            }

                            <Button
                                name={"Показать на карте"}
                                marginLeft={"0"}
                                marginTop={"10px"}
                                height={"20px"}
                                style={"showOnMapBtn"}
                                styleText={"text__content__white__12"}
                                color={GREY_BLACK}
                                handler={() => showHotelOnMap()}
                            />
                        </div>
                        {/*Пустышка*/}
                        <div className="null">----</div>
                        {/*Оценка отеля*/}
                        <div className="column__c">
                            <Rating
                                rating={rating}
                                countReviews={ratingCount.length}
                            />
                            <div className="row__c__c price__card">
                            <span
                                className="text__content__white__b__15">от {formatMoney(averagePrice)} ₽</span>
                            </div>
                        </div>
                    </div>
                    <Link to={"/hotel"}>
                        <Button
                            name={"Выбрать свободный номер"}
                            marginLeft={"0"}
                            style={"chooseHotelBtn"}
                            marginTop={"35px"}
                            styleText={"text__content__white__15"}
                            handler={() => chooseHotelMore()}
                            height={"30px"}/>
                    </Link>
                </div>
            </div>

            <div className="column__card mobile__0_660__card__block">
                <div
                    className="row__sb__c"
                    style={{marginBottom: "20px", marginTop: "10px"}}
                >
                <span
                    className="text__content__black__b__16"
                    style={{
                        overflowWrap: "break-word",
                        width: "100%",
                        marginBottom: "5px",
                    }}
                >
                  {name}
                </span>
                    <div
                        className="row__c__c"
                        style={{
                            background: GREY_BLACK,
                            padding: "5px",
                            borderRadius: "5px",
                            width: "50px",
                        }}
                    >
                  <span
                      className="assessment__b"
                      style={{textShadow: "0 0 8px rgba(0, 0, 0, 0.55)"}}
                  >
                    {rating}
                  </span>
                    </div>
                </div>

                {/*SLIDER*/}
                <SliderMini
                    hotelId={hotelId}
                    photoHotel={objectPhotos}
                    width={"100%"}
                    height={"240px"}
                    borderRadius={"10px 10px 10px 10px"}
                />

                <div className="row__sb__c" style={{marginTop: "10px"}}>
                    <div className="column">
                      <span
                          className="text__content__grey__12 marginsCards"
                          style={{marginLeft: 0, fontWeight: "bold"}}
                      >
                        {address}
                      </span>
                    </div>
                    <div className="column">
      <span
          className="text__content__grey__12 marginsCards"
          style={{marginLeft: 0, fontWeight: "bold"}}
      >
        {distance} км от центра города
      </span>
                    </div>
                </div>

                {showMetro
                    ? nearMetro.map((item) => (
                        <div className="row__c__fs" key={item.id}>
                            <img src={metro} alt="metro"/>
                            <span className="text__content__grey__12 marginsCards">
            {item.name}
          </span>
                        </div>
                    ))
                    : null}

                <div className="row__sb__c" style={{marginBottom: "20px", marginTop: "10px"}}>
                    <div className="row__c__c price__card">
      <span className="text__content__white__b__15">
        {formatMoney(4000)} ₽
      </span>
                    </div>
                    <span
                        className="text__content__black__b__14"
                        style={{marginTop: "10px"}}
                        onClick={() => showHotelOnMap()}
                    >
      Показать на карте
    </span>
                </div>
                <Link to={"/hotel"}>
                    <Button
                        name={"Выбрать свободный номер"}
                        marginLeft={"0"}
                        style={"chooseHotelBtn"}
                        marginTop={"5px"}
                        styleText={"text__content__white__15"}
                        handler={() => chooseHotelMore()}
                        height={"35px"}
                    />
                </Link>
            </div>

        </div>
    )
}
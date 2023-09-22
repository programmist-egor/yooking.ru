import {Button} from "../buttons/Button";
import metro from "../../img/metro.png"
import {GREY_BLACK, ORANGE, WHITE} from "../../theme/colors";
import {Rating} from "./Rating";
import {SliderMini} from "../slider/SliderMini";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    loadingHotelListHandler,
    loadingMapHandler, setFilteredHotels,
    showHotelMapHandler,
    showPlaceMarkHandler
} from "../../store/HotelsList";
import {dataHotelHandler} from "../../store/HotelItem";
import {useEffect} from "react";
import {resetParamHandler} from "../../store/Filter";

export const HotelCard = (
    {
        toggleDrawerMap,
        name,
        photoHotel,
        nearMetro,
        rating,
        countReviews,
        lastPriceInfo,
        address,
        distance,
        hotelId,
        favorite,
        location,
        item,
        hotelCity,
        itemPage
    }) => {
    const dispatch = useDispatch()
    const showMetro = useSelector(state => state.hotels_list.metroShow)

    const showHotelOnMap = () => {
        toggleDrawerMap()
        dispatch(showPlaceMarkHandler(true))
        dispatch(loadingMapHandler(true))
        setTimeout(() => {
            dispatch(loadingMapHandler(false))
        }, 1000)
        dispatch(showHotelMapHandler({lat: location.lat, lon: location.lon, zoom: 16}))
    }

    const showHotelOnMapDesktop = () => {
        dispatch(showPlaceMarkHandler(true))
        dispatch(loadingMapHandler(true))
        setTimeout(() => {
            dispatch(loadingMapHandler(false))
        }, 1000)
        dispatch(showHotelMapHandler({lat: location.lat, lon: location.lon, zoom: 16}))
    }

    // Функция для форматирования числа в денежный формат
    function formatMoney(number) {
        // Преобразуем число в строку
        let str = number.toString();
        // Проверяем, есть ли десятичная точка или запятая
        let dotIndex = str.indexOf(".");
        let commaIndex = str.indexOf(",");
        // Если есть точка, то разделяем строку на целую и дробную части
        if (dotIndex > -1) {
            let integerPart = str.slice(0, dotIndex);
            let decimalPart = str.slice(dotIndex + 1);
            // Добавляем пробелы между тысячами в целой части
            integerPart = integerPart.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
            // Возвращаем отформатированную строку
            return integerPart + "," + decimalPart;
        }
        // Если есть запятая, то разделяем строку на целую и дробную части
        else if (commaIndex > -1) {
            let integerPart = str.slice(0, commaIndex);
            let decimalPart = str.slice(commaIndex + 1);
            // Добавляем пробелы между тысячами в целой части
            integerPart = integerPart.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
            // Возвращаем отформатированную строку
            return integerPart + "." + decimalPart;
        }
        // Если нет точки и запятой, то просто добавляем пробелы между тысячами
        else {
            return str.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
        }
    }

    const chooseHotelMore = () => {
        dispatch(setFilteredHotels(null));
        dispatch(resetParamHandler())
        dispatch(dataHotelHandler(item))
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
                    photoHotel={photoHotel}
                    favorite={favorite}
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
                                  style={{marginLeft: 0}}>{address.ru === undefined ? "" : address.ru || address.en}
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
                                countReviews={countReviews.length}
                            />
                            <div className="row__c__c price__card">
                            <span
                                className="text__content__white__b__15">{lastPriceInfo === 0 ? "0" : formatMoney(lastPriceInfo.price)} ₽</span>
                            </div>
                        </div>
                    </div>
                    <Link to={"/Отель"}>
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
                    photoHotel={photoHotel}
                    favorite={favorite}
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
                                  style={{marginLeft: 0}}>{address.ru === undefined ? "" : address.ru || address.en}
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
                                countReviews={countReviews.length}
                            />
                            <div className="row__c__c price__card">
                            <span
                                className="text__content__white__b__15">{lastPriceInfo === 0 ? "0" : formatMoney(lastPriceInfo.price)} ₽</span>
                            </div>
                        </div>
                    </div>
                    <Link to={"/Отель"}>
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
                    photoHotel={photoHotel}
                    favorite={favorite}
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
                                  style={{marginLeft: 0}}>{address.ru === undefined ? "" : address.ru || address.en}
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
                                countReviews={countReviews.length}
                            />
                            <div className="row__c__c price__card">
                            <span
                                className="text__content__white__b__15">{lastPriceInfo === 0 ? "0" : formatMoney(lastPriceInfo.price)} ₽</span>
                            </div>
                        </div>
                    </div>
                    <Link to={"/Отель"}>
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
                    photoHotel={photoHotel}
                    favorite={favorite}
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
                        {address.ru === undefined ? "" : address.ru || address.en}
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
        {lastPriceInfo === 0 ? "0" : formatMoney(lastPriceInfo.price)} ₽
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
                <Link to={"/Отель"}>
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
import {SliderMini} from "../slider/SliderMini";
import {GREY_BLACK, ORANGE} from "../../theme/colors";

import {Link} from "react-router-dom";
import {Button} from "../buttons/Button";
import {useDispatch, useSelector} from "react-redux";
import {dataHotelHandler} from "../../store/HotelItem";
import {useEffect, useState} from "react";
import PhotoObjectService from "../../services/photo-object.service";


export const BalloonYandexMap = ({ hotelId, name, rating, item}) => {
    const dispatch = useDispatch()
    const dataNumbersList = useSelector(state => state.hotels_list.dataNumbersList)
    const [objectPhotos, setObjectPhotos] = useState([]);
    const [averagePrice, setAveragePrice] = useState("");


    useEffect(() => {
        if (objectPhotos.length === 0) {
            PhotoObjectService.getAllPhotosObject("hotels_map", hotelId)
                .then(data => setObjectPhotos(data))
        }
        // Фильтрация номеров по hotelId
        const filteredPrices = dataNumbersList.filter(price => price.hotelId === hotelId);
        // Поиск средней цены
        if (filteredPrices.length > 0) {
            const totalPrices = filteredPrices.map(price => price.priceBase);
            const sumPrices = totalPrices.reduce((acc, curr) => acc + curr, 0);
            const averagePrice = sumPrices / filteredPrices.length;
            setAveragePrice(averagePrice)
        } else {
            console.log("Нет данных для указанного hotelId");
        }
    }, [])
    return (
        <div className="column"
             key={hotelId}
        >
            <SliderMini
                photoHotel={objectPhotos}
                width={"360px"}
                hotelId={hotelId}
                minWidth={""}
                item={item}
                height={"200px"}
                borderRadius={"10px"}
            />
            <span className="text__content__black__b__14" style={{textAlign: "center", marginTop: "5px"}}>{name}</span>
            <div className="row__sb__c" style={{margin: "10px"}}>
                <span style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: GREY_BLACK,
                    borderRadius: "5px",
                    padding: "8px 14px  8px 14px",
                    color: ORANGE,
                    fontWeight: "bold",
                    textShadow: "0 0 5px var(--black-opacity)"
                }}>
                    {rating}
                </span>
                <div className="column">
                    <span className="text__content__grey__12">Цена</span>
                    <span className="text__content__black__b__16">{averagePrice} ₽</span>
                </div>
            </div>
            <Link to={"/hotel"}>
                <Button
                    name={"Выбрать свободный номер"}
                    marginLeft={"0"}
                    style={"chooseHotelMapBtn"}
                    marginTop={"10px"}
                    styleText={"text__content__white__14"}
                    handler={() => dispatch(dataHotelHandler(item))}
                />
            </Link>
        </div>
    )
}
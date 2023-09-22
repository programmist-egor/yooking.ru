import {SliderMini} from "../slider/SliderMini";
import {GREY_BLACK, ORANGE} from "../../theme/colors";

import {Link} from "react-router-dom";
import {Button} from "../buttons/Button";
import {useDispatch} from "react-redux";
import {dataHotelHandler} from "../../store/HotelItem";


export const BalloonYandexMap = ({img, hotelId, price, name, favorite, rating, item}) => {
    const dispatch = useDispatch()
    return (
        <div className="column"
             key={hotelId}
        >
            <SliderMini
                photoHotel={img}
                width={"360px"}
                hotelId={hotelId}
                favorite={favorite}
                minWidth={""}
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
                    <span className="text__content__black__b__16">{price === 0 ? "0" : price.price} ₽</span>
                </div>
            </div>
            <Link to={"/Отель"}>
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
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
import {BLACK_OPACITY} from "../../theme/colors";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {handlerHotelCityId} from "../../store/Main";


export const WhereToGo = () => {
    const dispatch = useDispatch()
    const data = [
        {id: 1, img: img__1, text: "Ростов на Дону", header: "ГДЕ ОСТАНОВИТЬСЯ В РОСТОВЕ НА ДОНУ?", banner: rostov},
        {id: 2, img: img__2, text: "Санкт - Петербург", header: "ГДЕ ОСТАНОВИТЬСЯ В САНКТ - ПЕТЕРБУРГЕ?", banner: piter},
        {id: 3, img: img__3, text: "Москва", header: "ГДЕ ОСТАНОВИТЬСЯ В МОСКВЕ?", banner: moscow},
        {id: 4, img: img__4, text: "Сочи", header: "ГДЕ ОСТАНОВИТЬСЯ В СОЧИ", banner: sochi},
        {id: 5, img: img__5, text: "Самара", header: "ГДЕ ОСТАНОВИТЬСЯ В САМАРЕ?", banner: samara},
        {id: 6, img: img__6, text: "Новосибирск", header: "ГДЕ ОСТАНОВИТЬСЯ В НОВОСИБИРСКЕ?", banner: novosib},
    ]
    return (
        <div className="column__c where__to__go">
            <div className="row__c__fs">
                <h2 className="text__content__black__b__32">Куда поехать?</h2>
            </div>
            <div className="row__wrap__c__c">
                {data.map(item => (
                    <Link
                        to={"/HotelCity"}
                        key={item.id}
                        onClick={() => dispatch(handlerHotelCityId(item))}
                        className="where__to__go__item"
                        style={{
                            backgroundImage: `url(${item.img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <span
                            className="text__content__white__20"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                height: "41px",
                                background: BLACK_OPACITY,
                                flexGrow: 1,
                                borderRadius: "0 0 20px 20px",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                        {item.text}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
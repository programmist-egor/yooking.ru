import "./Header.css"
import {Button} from "../buttons/Button";
import mapBtn from "../../assets/image/mapBtn.png"

export const HeaderHotel = ({value, toggleDrawerMap}) => {
    return (
        <div>
                <div className="laptop__header__hotel__block">
                    <h1 className="text__content__black__b__26">
                        Найдено {value} вариантов
                    </h1>
                    <div className="mapBtn" style={{backgroundImage: `url(${mapBtn})`, borderRadius: "15px"}}>
                        <Button
                            style={"mapButton"}
                            styleText={"text__content__white__16"}
                            padding={10}
                            handler={toggleDrawerMap}
                            name={"Показать на карте"}/>
                    </div>
                </div>

                <div className="tablet__header__hotel__block">
                    <h1 className="text__content__black__b__24">
                        Найдено {value} вариантов
                    </h1>
                </div>
        </div>
    )
}
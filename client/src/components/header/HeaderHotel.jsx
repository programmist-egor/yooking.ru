import "./Header.css"
import {Button} from "../buttons/Button";
import {Link} from "react-router-dom";
import mapBtn from "../../img/blocks/mapBtn.png"

export const HeaderHotel = ({value}) => {
    return (
        <div
            className="row__sb__c"
            style={{
                marginTop: "15px",
                marginBottom: "15px"
            }}
        >
            <h1 className="header__block__black__b__36">
                Найдено {value} варианта
            </h1>
            <Link
                to={"/"}
                className="mapBtn"
                style={{
                    backgroundImage: `url(${mapBtn})`,
                }}
            >
                <Button
                    style={"mapButton"}
                    styleText={"text__content__white__16"}
                    padding={10}
                    handler={() => console.log("Показать на карте")}
                    name={"Показать на карте"}/>
            </Link>
        </div>
    )
}
import "./SearchPanel.css"
import {useState} from "react";
import {Icon24ChevronDown, Icon28LocationMapOutline} from '@vkontakte/icons';
import {GREY, WHITE} from "../../theme/colors";
import line from "../../img/line.png"
import {ButtonIcon} from "../buttons/ButtonIcon";


export const SearchPanel = () => {
    const [valueDate, setValueDate] = useState("27 - 28 апр.")
    const [valueDay, setValueDay] = useState("1 Ночь")

    const handlerText = () => {
        console.log("text");
    }
    const handlerDate = (e) => {
        console.log(e);
        setValueDate(e)
    }
    return (
        <div className="row__c__c">
            <div
                className="row__sb__c input__search"
            >
                <input
                    type="text"
                    className="search__input__text"
                    placeholder="Город, регион или отель"
                    value={""}
                    onChange={handlerText}
                />
                <img
                    src={line}
                    alt="line"
                    height={28}
                    width={1}
                    style={{
                        paddingLeft: "10px",
                        paddingRight: "10px"
                    }}
                />
                <div
                    className="row__sb__c"
                    style={{
                        flexGrow: 0.3,
                        cursor: "pointer"
                    }}
                >
                <span className="text__content__black__16">
                    {valueDate}
                    <span className="text__content__grey__16">
                        {valueDay}
                    </span>
                </span>
                    <span className="iconBtn"><Icon24ChevronDown color={GREY}/></span>
                </div>
                <img
                    src={line}
                    alt="line"
                    height={28}
                    width={1}
                    style={{
                        paddingLeft: "10px",
                        paddingRight: "10px"
                    }}
                />
                <div
                    className="row__sb__c"
                    style={{
                        flexGrow: 0.3,
                        cursor: "pointer"
                    }}
                >
                <span className="text__content__black__16">
                    2 Гостя
                    <span className="text__content__grey__16">
                        1 Номер
                    </span>
                </span>
                    <span className="iconBtn"><Icon24ChevronDown color={GREY}/></span>
                </div>
            </div>
            <ButtonIcon
                icon={<Icon28LocationMapOutline color={WHITE}/>}
                name={"Найти"}
                style={"searchBtn"}
                handler={() => console.log("НАЙТИ")}
            />
        </div>
    )
}
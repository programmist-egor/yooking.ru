import "./Header.css"
import {Icon28Menu} from '@vkontakte/icons';
import {BLACK, WHITE} from "../../theme/colors";
import flag from "../../img/flags/ru.png"
import logo from "../../img/logo_blue.png"

export const Header = () => {
    return (
        <div className="row__sb__c"
             style={{
                 paddingRight: "20px",
                 paddingLeft: "20px",
                 background: WHITE
             }}
        >
            <img
                src={logo}
                alt="logo"
                width={207}
                height={30}
            />
            <div className="row__sb__c">
                <img
                    src={flag}
                    alt="ru"
                    width={30}
                    height={30}
                />
                <div
                    className="row__sb__c"
                    onClick={() => console.log("menu")}
                >
                    <Icon28Menu width={30} height={30} color={BLACK}/>
                    <span className="text__content__black__16" style={{marginLeft: "10px"}}>Меню</span>
                </div>
            </div>
        </div>
    )
}
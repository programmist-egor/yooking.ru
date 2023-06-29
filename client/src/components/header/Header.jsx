import "./Header.css"
import {Icon28Menu} from '@vkontakte/icons';
import {BLACK, WHITE} from "../../theme/colors";
import flag from "../../img/flags/ru.png"
import logo from "../../img/logo_blue.png"
import {Link} from "react-router-dom";
import {Lang} from "../modals/Lang";
import {modalLangHandler, modalMenuHandler} from "../../store/Main";
import {Menu} from "../modals/Menu";
import {useDispatch, useSelector} from "react-redux";


export const Header = () => {
    const dispatch = useDispatch()
    const modalLang = useSelector(state => state.main.modalLang);
    const modalMenu = useSelector(state => state.main.modalMenu);

    return (
        <div className="row__sb__c"
             style={{
                 paddingRight: "40px",
                 paddingLeft: "40px",
                 background: WHITE,
                 height: "40px"
             }}
        >
            <Link to={"/"}>
                <img
                    src={logo}
                    alt="logo"
                    width={207}
                    height={28}
                    style={{cursor: "pointer"}}
                />
            </Link>
            <div className="row__sb__c">
                <img
                    onClick={() => dispatch(modalLangHandler(true))}
                    src={flag}
                    alt="ru"
                    width={26}
                    height={26}
                    style={{marginRight: "30px", cursor: "pointer"}}
                />
                <div
                    className="row__sb__c"
                    style={{cursor: "pointer"}}
                    onClick={() => dispatch(modalMenuHandler(true))}
                >
                    <Icon28Menu width={30} height={30} color={BLACK}/>
                    <span className="text__content__black__16" style={{marginLeft: "10px"}}>Меню</span>
                </div>
            </div>
            <Lang
                handleLang={() => dispatch(modalLangHandler(false))}
                style={modalLang ? "modal" : "modal__none"}
            />
            <Menu
                handleMenu={() => dispatch(modalMenuHandler(false))}
                style={modalMenu? "modal" : "modal__none"}
            />
        </div>
    )
}
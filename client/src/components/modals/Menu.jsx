import {
    Icon24UserOutline,
    Icon24UserAddOutline,
    Icon24BuildingOutline
} from '@vkontakte/icons';
import {BLACK} from "../../theme/colors";
import {Link} from "react-router-dom";


export const Menu = ({style, handleMenu}) => {
    return (
        <div className={style}

        >
            <div className="modal__content__menu">
                <div className="modal__body">
                    <Link
                        to={"/api/login"}
                        className="row__c__fs"
                        onClick={handleMenu}
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        <Icon24UserOutline color={BLACK}/>
                        <span
                            className="text__content__black__16"
                            style={{
                                marginLeft: "5px"
                            }}
                        >Войти</span>
                    </Link>
                    <Link
                        to={"/api/registration"}
                        className="row__c__fs"
                        onClick={handleMenu}
                        style={{
                            cursor: "pointer",
                            marginTop: "5px",
                        }}
                    >
                        <Icon24UserAddOutline color={BLACK}/>
                        <span
                            className="text__content__black__16"
                            style={{
                                marginLeft: "5px"
                            }}
                        >Зарегистрироваться</span>
                    </Link>
                    <Link
                        to={"extranet.yooking.ru"}
                        className="row__c__fs"
                        onClick={handleMenu}
                        style={{
                            cursor: "pointer",
                            marginTop: "5px"
                        }}
                    >
                        <Icon24BuildingOutline color={BLACK}/>
                        <span
                            className="text__content__black__16"
                            style={{
                                marginLeft: "5px"
                            }}
                        >Зарегистрировать объект</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
import {
    Icon24UserOutline,
    Icon24UserAddOutline,
    Icon24BuildingOutline
} from '@vkontakte/icons';
import {BLACK, WHITE} from "../../theme/colors";


export const Menu = ({style, handleMenu}) => {
    return (
        <div className={style}
             onClick={handleMenu}
        >
            <div className="modal__content__menu">
                <div className="modal__body">
                    <div
                        className="row__c__fs"
                        onClick={() => console.log("Войти")}
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
                    </div>
                    <div
                        className="row__c__fs"
                        onClick={() => console.log("Зарегистрироваться")}
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
                    </div>
                    <div
                        className="row__c__fs"
                        onClick={() => console.log("Зарегистрировать объект")}
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
                    </div>
                </div>
            </div>
        </div>
    )
}
import "./Footer.css"
import {BLACK} from "../../theme/colors";
import {Link} from "react-router-dom"
import logo from "../../assets/image/logo_blue.png";
import vk from "../../assets/image/vk.svg"
import telegram from "../../assets/image/telegram.svg"

export const Footer = () => {
    return (
        <div>
            <div className="column desktop__footer__block">
                <div className="row__sa__fs" style={{background: BLACK}}>
                    <div className="column__sb__c" style={{marginTop: "31.920px"}}>
                        <Link to={"/"}>
                            <img
                                src={logo}
                                alt="logo"
                                width={274}
                                height={37}
                                style={{cursor: "pointer"}}
                            />
                        </Link>
                        {/*<span className="number__phone__white__b__32">8 800 556 69 99</span>*/}
                        <span
                            className="text__content__white__16"
                            style={{
                                marginTop: "10px",
                                marginBottom: "10px"
                            }}
                        >
                        Следите за нами через соц. сети
                    </span>
                        <div className="row__sa__c">
                            <Link to={"https://vk.com/"}>
                                <img
                                    src={vk}
                                    alt="vk"
                                    width={48}
                                    height={48}
                                    style={{cursor: "pointer", padding: "10px"}}
                                />
                            </Link>
                            <Link to={"https://web.telegram.org/"}>
                                <img
                                    src={telegram}
                                    alt="telegram"
                                    width={48}
                                    height={48}
                                    style={{cursor: "pointer", padding: "10px"}}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="column__fs">
                        <h4 className="text__content__white__b__24">Клиентам</h4>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Часто задаваемые вопросы
                </span>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Служба поддержки 24/7
                </span>
                    </div>
                    <div className="column__fs">
                        <h4 className="text__content__white__b__24">Парнтёрам</h4>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Объект размещения
                </span>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Корпоративным клиентам
                </span>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Поиск отелей на вашем сайте
                </span>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Реклама и PR
                </span>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Контакты
                </span>
                    </div>
                </div>
                <div
                    className="row__sa__fs"
                    style={{
                        background: BLACK,
                        paddingTop: "50px",
                        paddingBottom: "30px"
                    }}
                >
                <span
                    className="text__content__grey__16"
                    style={{cursor: "pointer", paddingTop: "5px"}}
                >
                    Политика хранения и обработки персональных данных
                </span>
                </div>
            </div>
            <div className="column tablet__530_919__footer__block">
                <div className="row__sa__fs" style={{background: BLACK}}>
                    <div className="column__fs">
                        <h4 className="text__content__white__b__24">Клиентам</h4>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Часто задаваемые вопросы
                </span>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Служба поддержки 24/7
                </span>
                    </div>
                    <div className="column__fs">
                        <h4 className="text__content__white__b__24">Парнтёрам</h4>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Объект размещения
                </span>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Корпоративным клиентам
                </span>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Поиск отелей на вашем сайте
                </span>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Реклама и PR
                </span>
                        <span
                            className="text__content__grey__16"
                            style={{cursor: "pointer", paddingTop: "5px"}}
                        >
                    Контакты
                </span>
                    </div>
                </div>
                <div className="column__sb__c" style={{paddingTop: "30px", background: BLACK}}>
                    <Link to={"/"}>
                        <img
                            src={logo}
                            alt="logo"
                            width={274}
                            height={37}
                            style={{cursor: "pointer"}}
                        />
                    </Link>
                    {/*<span className="number__phone__white__b__32">8 800 556 69 99</span>*/}
                    <span
                        className="text__content__white__16"
                        style={{
                            marginTop: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        Следите за нами через соц. сети
                    </span>
                    <div className="row__sa__c">
                        <Link to={"https://vk.com/"}>
                            <img
                                src={vk}
                                alt="vk"
                                width={48}
                                height={48}
                                style={{cursor: "pointer", padding: "10px"}}
                            />
                        </Link>
                        <Link to={"https://web.telegram.org/"}>
                            <img
                                src={telegram}
                                alt="telegram"
                                width={48}
                                height={48}
                                style={{cursor: "pointer", padding: "10px"}}
                            />
                        </Link>
                    </div>
                </div>
                <div
                    className="row__sa__fs"
                    style={{
                        background: BLACK,
                        paddingTop: "50px",
                        paddingBottom: "30px"
                    }}
                >
                <span
                    className="text__content__grey__16"
                    style={{cursor: "pointer", paddingTop: "5px"}}
                >
                    Политика хранения и обработки персональных данных
                </span>
                </div>
            </div>

            <div className="column__sb__c mobile__0_529__footer__block" style={{background: BLACK}}>
                <div className="column__fs">
                    <h4 className="text__content__white__b__24" style={{textAlign: "center"}}>Клиентам</h4>
                    <span
                        className="text__content__grey__16"
                        style={{cursor: "pointer", paddingTop: "5px", textAlign: "center"}}
                    >
                    Часто задаваемые вопросы
                </span>
                    <span
                        className="text__content__grey__16"
                        style={{cursor: "pointer", paddingTop: "5px", textAlign: "center"}}
                    >
                    Служба поддержки 24/7
                </span>
                </div>
                <div className="column__fs">
                    <h4 className="text__content__white__b__24" style={{textAlign: "center"}}>Парнтёрам</h4>
                    <span
                        className="text__content__grey__16"
                        style={{cursor: "pointer", paddingTop: "5px", textAlign: "center"}}
                    >
                    Объект размещения
                </span>
                    <span
                        className="text__content__grey__16"
                        style={{cursor: "pointer", paddingTop: "5px", textAlign: "center"}}
                    >
                    Корпоративным клиентам
                </span>
                    <span
                        className="text__content__grey__16"
                        style={{cursor: "pointer", paddingTop: "5px", textAlign: "center"}}
                    >
                    Поиск отелей на вашем сайте
                </span>
                    <span
                        className="text__content__grey__16"
                        style={{cursor: "pointer", paddingTop: "5px", textAlign: "center"}}
                    >
                    Реклама и PR
                </span>
                    <span
                        className="text__content__grey__16"
                        style={{cursor: "pointer", paddingTop: "5px", textAlign: "center"}}
                    >
                    Контакты
                </span>
                </div>

                <div className="column__sb__c" style={{paddingTop: "30px", background: BLACK}}>
                    <Link to={"/"}>
                        <img
                            src={logo}
                            alt="logo"
                            width={274}
                            height={37}
                            style={{cursor: "pointer"}}
                        />
                    </Link>
                    <span className="number__phone__white__b__32">8 800 556 69 99</span>
                    <span
                        className="text__content__white__16"
                        style={{
                            marginTop: "10px",
                            marginBottom: "10px",

                        }}
                    >
                        Следите за нами через соц. сети
                    </span>
                    <div className="row__sa__c">
                        <Link to={"https://vk.com/"}>
                            <img
                                src={vk}
                                alt="vk"
                                width={48}
                                height={48}
                                style={{cursor: "pointer", padding: "10px"}}
                            />
                        </Link>
                        <Link to={"https://web.telegram.org/"}>
                            <img
                                src={telegram}
                                alt="telegram"
                                width={48}
                                height={48}
                                style={{cursor: "pointer", padding: "10px"}}
                            />
                        </Link>
                    </div>
                </div>
                <div className="row__c__c" style={{
                    background: BLACK,
                    paddingTop: "50px",
                    paddingBottom: "30px"
                }}>
                        <span className="text__content__grey__12"
                              style={{cursor: "pointer", paddingTop: "5px", textAlign: "center"}}>
                            Политика хранения и обработки персональных данных
                        </span>
                </div>
            </div>
        </div>
    )
}
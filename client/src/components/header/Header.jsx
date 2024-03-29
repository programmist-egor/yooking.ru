import "./Header.css"
import {
    Icon28Menu,
    Icon24User,
    Icon24NotebookCheckOutline,
    Icon24DoorArrowRightOutline,
    Icon24Like,
    Icon24WriteOutline
} from '@vkontakte/icons';
import {BLACK, GREY_BLACK, WHITE} from "../../theme/colors";
import logo from "../../assets/image/logo_blue.png"
import {Link} from "react-router-dom";
import {Lang} from "../modals/Lang";
import { modalLangHandler, modalMenuHandler} from "../../store/Main";
import {Menu} from "../modals/Menu";
import {useDispatch, useSelector} from "react-redux";
import {DrawerMenu} from "../modals/DrawerMenu";
import Drawer from "react-modern-drawer";
import React, {useState} from "react";
import {SpinnerUserMenu} from "../spinner/SpinnerUserMenu";
import {loginFailure, logout} from "../../store/authSlice";
import AuthService from "../../services/auth.service";

export const Header = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const langChoose = useSelector((state) => state.main.langChoose);
    const loadingUserMenu = useSelector((state) => state.main.loadingUserMenu);
    const modalLang = useSelector((state) => state.main.modalLang);
    const modalMenu = useSelector((state) => state.main.modalMenu);
    const clientData = useSelector((state) => state.client__data.dateClient);
    const [isOpenSort, setIsOpenSort] = useState(false);


    const toggleDrawerSort = () => {
        setIsOpenSort((prevState) => !prevState);
    };

    const logoutUser = async () => {
        try {
            await AuthService.logout();
            dispatch(logout());
            toggleDrawerSort()
        } catch (error) {
            dispatch(loginFailure(error.message));
        } finally {
            console.log("logout");
        }
    }

    const handleClickOutsideMenu = () => {
        dispatch(modalMenuHandler(!modalMenu))
    };
    const handleClickOutsideLang = () => {
        dispatch(modalLangHandler(!modalLang))
    };
    return (
        <div>
            <div className="row__sb__c desktop__header"
                 style={{
                     paddingRight: "40px",
                     paddingLeft: "40px",
                     background: WHITE,
                     height: "40px"
                 }}
            >
                <Link
                    to={"/"}
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <img
                        src={logo}
                        alt="logo"
                        width={160}
                        height={22}
                        style={{cursor: "pointer"}}
                    />
                </Link>

                <div className="row__sb__c">
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        {
                            modalLang && (
                                <div
                                    className="click-outside-modal-handler"
                                    onClick={handleClickOutsideLang}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                ></div>
                            )
                        }
                        <img
                            onClick={() => dispatch(modalLangHandler(!modalLang))}
                            src={langChoose.img}
                            alt="ru"
                            width={22}
                            height={22}
                            style={{
                                marginRight: "30px",
                                cursor: "pointer",
                                border: "1px solid white",
                                borderRadius: "50%",
                                boxShadow: "0 0 5px var(--grey)"
                            }}
                        />
                        <Lang
                            handleLang={() => dispatch(modalLangHandler(!modalLang))}
                            style={modalLang ? "modal__lang" : "modal__none"}
                        />
                    </div>
                    {
                        !loadingUserMenu ?
                            token ?
                                <div >
                                    <div
                                        className="row__sb__c"
                                        style={{cursor: "pointer"}}
                                        onClick={() => toggleDrawerSort()}
                                    >
                                        <span className="user__icon">
                                            <Icon24User width={20} height={20} color={WHITE}/>
                                        </span>
                                        <div className="column__fs__c ">
                                            <span className="text__content__black__b__16" style={{marginLeft: "10px"}}>
                                                {clientData.name === "" ? "Пользователь" : clientData.name}
                                            </span>
                                            <span className="text__content__grey__12" style={{marginLeft: "10px"}}>
                                                Личный кабинет
                                            </span>
                                        </div>

                                    </div>
                                    <Drawer
                                        open={isOpenSort}
                                        onClose={toggleDrawerSort}
                                        direction='right'
                                        style={{height: "100vh"}}
                                    >
                                        <div className="column__fs__c">
                                            <div className="row__c__fs borderBottom">
                                                <span className="user__icon">
                                                    <Icon24User width={20} height={20} color={WHITE}/>
                                                </span>
                                                <h3 style={{marginLeft: "10px"}}>
                                                    {clientData.name === "" ? "Пользователь" : clientData.name}
                                                </h3>
                                            </div>
                                            <Link className="row__c__fs nav__item__user" to={"/booking"}>
                                                <span className="nav__item__user__icon">
                                                    <Icon24NotebookCheckOutline width={24} height={24}
                                                                                color={GREY_BLACK}/>
                                                </span>
                                                <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Бронирование
                                                </span>
                                            </Link>
                                            <Link className="row__c__fs nav__item__user" to={"/favorites"}>
                                                <span className="nav__item__user__icon">
                                                    <Icon24Like width={24} height={24} color={GREY_BLACK}/>
                                                </span>
                                                <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Избранное
                                                </span>
                                            </Link>
                                            <Link className="row__c__fs nav__item__user" to={"/edit_user"}>
                                                <span className="nav__item__user__icon">
                                                    <Icon24WriteOutline width={24} height={24} color={GREY_BLACK}/>
                                                </span>
                                                <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Редактировать данные
                                                </span>
                                            </Link>
                                            <div
                                                className="row__c__fs exit__item__btn"
                                                onClick={() => logoutUser()}
                                            >
                                                <span className="nav__item__user__icon">
                                                    <Icon24DoorArrowRightOutline width={24} height={24} color={GREY_BLACK}/>
                                                </span>
                                                <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Выйти
                                                </span>
                                            </div>
                                        </div>
                                    </Drawer>
                                </div>
                                :
                                <div style={{position: "relative"}}>
                                    {
                                        modalMenu && (
                                            <div
                                                className="click-outside-modal-handler"
                                                onClick={handleClickOutsideMenu}
                                                style={{
                                                    position: 'fixed',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    zIndex: 1,
                                                }}
                                            ></div>
                                        )
                                    }
                                    <div
                                        className="row__sb__c"
                                        style={{cursor: "pointer"}}
                                        onClick={() => dispatch(modalMenuHandler(!modalMenu))}
                                    >
                                        <Icon28Menu width={30} height={30} color={BLACK}/>
                                        <span className="text__content__black__16" style={{marginLeft: "10px"}}>
                                            Меню
                                        </span>
                                    </div>
                                    <Menu
                                        handleMenu={() => dispatch(modalMenuHandler(!modalMenu))}
                                        style={modalMenu ? "modal__menu" : "modal__none"}
                                    />
                                </div>
                            :
                            <SpinnerUserMenu/>
                    }
                </div>
            </div>

            <div className="row__sb__c tablet__header"
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
                        width={160}
                        height={22}
                        style={{cursor: "pointer"}}
                    />
                </Link>
                {
                    !loadingUserMenu ?
                        token ?
                            <div style={{position: "relative"}}>
                                <div
                                    className="row__sb__c"
                                    style={{cursor: "pointer"}}
                                    onClick={() => toggleDrawerSort()}
                                >
                                        <span className="user__icon">
                                            <Icon24User width={20} height={20} color={WHITE}/>
                                        </span>
                                    <div className="column__fs__c ">
                                            <span className="text__content__black__b__16" style={{marginLeft: "10px"}}>
                                                {clientData.name === "" ? "Пользователь" : clientData.name}
                                            </span>
                                        <span className="text__content__grey__12" style={{marginLeft: "10px"}}>
                                                Личный кабинет
                                            </span>
                                    </div>

                                </div>
                                <Drawer
                                    open={isOpenSort}
                                    onClose={toggleDrawerSort}
                                    direction='right'
                                    style={{height: "100vh"}}
                                >
                                    <div className="column__fs__c">
                                        <div className="row__c__fs borderBottom">
                                                <span className="user__icon">
                                                    <Icon24User width={20} height={20} color={WHITE}/>
                                                </span>
                                            <h3 style={{marginLeft: "10px"}}>
                                                {clientData.name === "" ? "Пользователь" : clientData.name}
                                            </h3>
                                        </div>
                                        <Link className="row__c__fs nav__item__user" to={"/booking"}>
                                                <span className="nav__item__user__icon">
                                                    <Icon24NotebookCheckOutline width={24} height={24}
                                                                                color={GREY_BLACK}/>
                                                </span>
                                            <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Бронирование
                                                </span>
                                        </Link>
                                        <Link className="row__c__fs nav__item__user" to={"/favorites"}>
                                                <span className="nav__item__user__icon">
                                                    <Icon24Like width={24} height={24} color={GREY_BLACK}/>
                                                </span>
                                            <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Избранное
                                                </span>
                                        </Link>
                                        <Link className="row__c__fs nav__item__user" to={"/edit_user"}>
                                                <span className="nav__item__user__icon">
                                                    <Icon24WriteOutline width={24} height={24} color={GREY_BLACK}/>
                                                </span>
                                            <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Редактировать данные
                                                </span>
                                        </Link>
                                        <div
                                            className="row__c__fs exit__item__btn"
                                            onClick={() => logoutUser()}
                                        >
                                                <span className="nav__item__user__icon">
                                                    <Icon24DoorArrowRightOutline width={24} height={24}
                                                                                 color={GREY_BLACK}/>
                                                </span>
                                            <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Выйти
                                                </span>
                                        </div>
                                    </div>
                                </Drawer>
                            </div>
                            :
                            <div style={{position: "relative"}}>
                                <div
                                    className="row__sb__c"
                                    style={{cursor: "pointer"}}
                                    onClick={() => dispatch(modalMenuHandler(!modalMenu))}
                                >
                                    <DrawerMenu/>
                                </div>
                            </div>
                        :
                        <SpinnerUserMenu/>
                }
            </div>
            <div className="row__sb__c mobile__avatar__user"
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
                        width={160}
                        height={22}
                        style={{cursor: "pointer"}}
                    />
                </Link>
                {
                    !loadingUserMenu ?
                        token ?
                            <div style={{position: "relative"}}>
                                <div
                                    className="row__sb__c"
                                    style={{cursor: "pointer"}}
                                    onClick={() => toggleDrawerSort()}
                                >
                                <span className="user__icon">
                                    <Icon24User width={20} height={20} color={WHITE}/>
                                </span>
                                </div>
                                <Drawer
                                    open={isOpenSort}
                                    onClose={toggleDrawerSort}
                                    direction='right'
                                    style={{height: "100vh"}}
                                >
                                    <div className="column__fs__c">
                                        <div className="row__c__fs borderBottom">
                                                <span className="user__icon">
                                                    <Icon24User width={20} height={20} color={WHITE}/>
                                                </span>
                                            <h3 style={{marginLeft: "10px"}}>
                                                {clientData.name === "" ? "Пользователь" : clientData.name}
                                            </h3>
                                        </div>
                                        <Link className="row__c__fs nav__item__user" to={"/booking"}>
                                                <span className="nav__item__user__icon">
                                                    <Icon24NotebookCheckOutline width={24} height={24}
                                                                                color={GREY_BLACK}/>
                                                </span>
                                            <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Бронирование
                                                </span>
                                        </Link>
                                        <Link className="row__c__fs nav__item__user" to={"/favorites"}>
                                                <span className="nav__item__user__icon">
                                                    <Icon24Like width={24} height={24} color={GREY_BLACK}/>
                                                </span>
                                            <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Избранное
                                                </span>
                                        </Link>
                                        <Link className="row__c__fs nav__item__user" to={"/edit_user"}>
                                                <span className="nav__item__user__icon">
                                                    <Icon24WriteOutline width={24} height={24} color={GREY_BLACK}/>
                                                </span>
                                            <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Редактировать данные
                                                </span>
                                        </Link>
                                        <div
                                            className="row__c__fs exit__item__btn"
                                            onClick={() => logoutUser()}
                                        >
                                                <span className="nav__item__user__icon">
                                                    <Icon24DoorArrowRightOutline width={24} height={24}
                                                                                 color={GREY_BLACK}/>
                                                </span>
                                            <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                                    Выйти
                                                </span>
                                        </div>
                                    </div>
                                </Drawer>
                            </div>
                            :
                            <div style={{position: "relative"}}>
                                <div
                                    className="row__sb__c"
                                    style={{cursor: "pointer"}}
                                    onClick={() => dispatch(modalMenuHandler(!modalMenu))}
                                >
                                    <DrawerMenu/>
                                </div>
                            </div>
                        :
                        <SpinnerUserMenu/>
                }
            </div>
        </div>
    )
}
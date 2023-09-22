import './App.css';
import './components/buttons/Buttons.css'
import "./components/blocks/Blocks.css"
import "./components/modals/Modals.css"
import "./components/filters/Filter.css"
import "./components/cards/Cards.css"
import "./components/slider/Slider.css"
import "./components/forms/Forms.css"
import "./components/search/SearchPanel.css"
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Main} from "./routes/Main";
import {HotelCity} from "./routes/HotelCity";
import {HotelAndMap} from "./routes/HotelAndMap";
import {HotelNumber} from "./routes/HotelNumber";
import {ErrorPage} from "./routes/ErrorPage";
import {Login} from "./routes/Login";
import {Registration} from "./routes/Registration";
import {RegisterObject} from "./routes/RegisterObject";
import {useDispatch, useSelector} from "react-redux";
import {handlerLoadingStartPage, modalLangHandler, modalMenuHandler} from "./store/Main";
import {PersonalArea} from "./routes/PersonalArea";
import {FavoriteUserHotel} from "./routes/user__data/FavoriteUserHotel";
import {EditUserData} from "./routes/user__data/EditUserData";
import {BookingUser} from "./routes/user__data/BookingUser";
import {useEffect, useState} from "react";
import {onValue, ref, update} from "firebase/database";
import {database} from "./firebase";
import {addFavoriteUserDataHandler, dateClientHandler, favoriteUserDataDB, setUidHandler} from "./store/ClientData";
import {PhoneAuth} from "./routes/PhoneAuth";
import {StartingPage} from "./routes/StartingPage";
import setCookie from "./components/hooks/setCookie";
import getCookie from "./components/hooks/getCookie";
import removeCookie from "./components/hooks/removeCookie";

function App() {
    const dispatch = useDispatch()
    const [userList, setUserList] = useState([]);
    const dateClient = useSelector(state => state.client__data.dateClient)
    const loading = useSelector(state => state.main.loading)

    const [userFavoriteList, setUserFavoriteList] = useState([]);
    useEffect(() => {
        (async () => {
            await fetchDataUsers();
            // if(favoriteUserData === undefined  || favoriteUserData.length === 0) {
            //     console.log("ПУСТЫЕ ДАННЫЕ");
            //     dispatch(favoriteUserDataDB([]));
            //
            // } else {
            //     await updateDataFavorite()
            //     await fetchDataFavorite()
            //     await fetchDataUserFavorite()
            // }

            setTimeout(() => dispatch(handlerLoadingStartPage(false)), 3000);
        })();
    }, []);

    async function fetchDataUsers() {
        await onValue(ref(database), snapshot => {
            setUserList([]);
            const data = snapshot.val();
            if (data.usersData !== null) {
                Object.values(data.usersData).map(item => {
                    setUserList(oldArray => [...oldArray, item]);
                });
            }
        });
    }
    // async function updateDataFavorite() {
    //     const uid = getCookie("uid");
    //     await update(ref(database, `/usersData/${uid}`), {
    //         favoriteBase: favoriteUserData,
    //     })
    //     console.log("Данные обновлены")
    //
    // }

    // async function fetchDataUserFavorite() {
    //     await onValue(ref(database), snapshot => {
    //         // setFavList([]);
    //         const uid = getCookie("uid");
    //         const data = snapshot.val();
    //         if (data.usersData !== null) {
    //             Object.values(data.usersData).map(item => {
    //                 if (item.userid === uid) {
    //                     console.log("Избранное", item.favoriteBase);
    //                     dispatch(favoriteUserDataDB(item.favoriteBase));
    //                 }
    //             });
    //         }
    //     });
    // }

    // async function fetchDataFavorite() {
    //     await onValue(ref(database), snapshot => {
    //         const data = snapshot.val();
    //         const uid = getCookie("uid");
    //         if (data.usersData !== null) {
    //             Object.values(data.usersData).map(item => {
    //                 if (item.userid === uid) {
    //                     dispatch(favoriteUserDataDB(item.favorite));
    //                 }
    //             });
    //         }
    //
    //     });
    // }

    // removeCookie('userData')
    useEffect(() => {

        if (userList.length !== 0) {
            console.log(userList)
            const uid = getCookie("uid");
            console.log("UID UNDEFINED", uid);
            const idx = userList.findIndex(i => i.userid === uid);
            console.log("INDEX", idx);
            if (idx === -1) {
                console.log("USER UNDEFINED", idx);
                dispatch(dateClientHandler({
                    auth: false,
                    email: "",
                    name: "",
                    phone: "",
                    token: "",
                    userid: ""
                }));
            } else {
                // dispatch(dateClientHandler(userList[idx]));
                // dispatch(handlerLoadingStartPage(true))
                //             setTimeout(() => {
                //                 dispatch(handlerLoadingStartPage(false))
                //             }, 1000)
                (async () => {
                    await dispatch(dateClientHandler(userList[idx]));
                    let userCookies = await getJSONCookie('userData');
                    // console.log("GET COOKIE", userCookies);

                    if (userCookies) {
                        console.log("GET COOKIE", userCookies);
                        if (await compareUserData(userCookies, {
                            email: userList[idx].email,
                            id: userList[idx].userid
                        })) {

                            console.log("АВТОРИЗАЦИЯ СОХРАНИНА", userCookies);
                            // await update(ref(database, `/usersData/${uid}`), {
                            //     auth: true,
                            // })
                            dispatch(handlerLoadingStartPage(true))
                            setTimeout(() => {
                                dispatch(handlerLoadingStartPage(false))
                            }, 1000)
                        } else {
                            console.log("ВЫХОД ИЗ АККАУНТА", userCookies);
                            await update(ref(database, `/usersData/${uid}`), {
                                auth: false,
                            });
                            dispatch(handlerLoadingStartPage(true))
                            setTimeout(() => {
                                dispatch(handlerLoadingStartPage(false))
                            }, 1000)
                            removeCookie('uid')

                        }
                    } else {
                        console.log("NO GET COOKIE", userCookies);
                        const userData = {email: userList[idx].email, id: userList[idx].userid}
                        await setJSONCookie('userData', userData)
                    }
                })()
            }
        }
    }, [userList]);


    function getJSONCookie(cookieName) {
        const cookieValue = getCookie(cookieName);

        try {
            return cookieValue ? JSON.parse(cookieValue) : null;
        } catch (e) {
            return null;
        }
    }

    function setJSONCookie(cookieName, cookieData) {
        setCookie(cookieName, JSON.stringify(cookieData));
    }

    async function compareUserData(userData, value) {
        return userData && userData.email === value.email && userData.id === value.id;
    }

    const closeModals = () => {
        dispatch(modalLangHandler(false))
        dispatch(modalMenuHandler(false))
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={loading ? <StartingPage/> : <Main closeModals={closeModals}/>}/>
                <Route path="Отели_города" element={<HotelCity closeModals={closeModals}/>}/>
                <Route path="Отели_на_карте" element={<HotelAndMap closeModals={closeModals}/>}/>
                <Route path="Отель" element={<HotelNumber closeModals={closeModals}/>}/>
                <Route path="Нет_такой_страницы" element={<ErrorPage closeModals={closeModals}/>}/>
                <Route path="Войти" element={<Login closeModals={closeModals}/>}/>
                <Route path="Личный_кабинет" element={<PersonalArea closeModals={closeModals}/>}/>
                <Route path="Зарегистрироваться" element={<Registration closeModals={closeModals}/>}/>
                <Route path="Зарегистрировать_объект" element={<RegisterObject closeModals={closeModals}/>}/>
                <Route path="Бронирование" element={<BookingUser closeModals={closeModals}/>}/>
                <Route path="Редактировать_данные" element={<EditUserData closeModals={closeModals}/>}/>
                <Route path="Аунтефикация_по_телефону" element={<PhoneAuth closeModals={closeModals}/>}/>
                <Route path="Избранное" element={<FavoriteUserHotel closeModals={closeModals}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

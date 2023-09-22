import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import {ListFavoriteUser} from "../../components/blocks/ListFavoriteUser";
import {useEffect, useState} from "react";
import {handlerLoadingStartPage} from "../../store/Main";
import {onValue, ref, set, update} from "firebase/database";
import {database} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {dateClientHandler, favoriteUserDataDB, loaderFavoriteAndBookingHandler} from "../../store/ClientData";
import getCookie from "../../components/hooks/getCookie";


export const FavoriteUserHotel = () => {
    const dispatch = useDispatch()
    const favoriteUserData = useSelector(state => state.client__data.favoriteUserData)
    const favoriteUser = useSelector(state => state.client__data.favoriteUserDataDB)
    const [userFavoriteList, setUserFavoriteList] = useState([]);

    useEffect(() => {
        (async () => {
            // if(favoriteUserData === undefined || favoriteUserData.length === 0) {
            //     console.log("ПУСТЫЕ ДАННЫЕ");
            //
            //         dispatch(favoriteUserDataDB([]));
            //     // await fetchDataFavorite();
            // } else {
            //     // await updateDataFavorite();
            //     await fetchDataFavorite();
            // }
            // dispatch(loaderFavoriteAndBookingHandler(true))
            // setTimeout(() => dispatch(loaderFavoriteAndBookingHandler(false)), 2000);
        })();
    }, []);

    // async function updateDataFavorite() {
    //     const uid = getCookie("uid");
    //     await update(ref(database, `/usersData/${uid}`), {
    //         favorite: favoriteUserData,
    //     })
    //     console.log("Данные обновлены")
    //
    // }
    // async function fetchDataFavorite() {
    //     await onValue(ref(database), snapshot => {
    //         setUserFavoriteList([]);
    //         const data = snapshot.val();
    //         const uid = getCookie("uid");
    //         if (data.usersData !== null) {
    //             Object.values(data.usersData).map(item => {
    //                 if(item.userid === uid) {
    //                     dispatch(favoriteUserDataDB(item.favorite));
    //                 }
    //             });
    //         }
    //     });
    //     console.log("Данные выгружены")
    // }


    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <ListFavoriteUser/>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
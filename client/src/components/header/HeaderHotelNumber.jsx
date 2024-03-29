import {Icon24ShareExternalOutline, Icon24LikeOutline, Icon24Like} from '@vkontakte/icons';
import {BLACK, GREY_BLACK} from "../../theme/colors";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, { useEffect, useState} from "react";
import {getCurrentDate} from "../../utils/createDataNow";
import FavoriteService from "../../services/favorite.service";
import {v4 as uuidv4} from "uuid";


export const HeaderHotelNumber = ({dataHotelNumber, width, hotelId}) => {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.isAuth);
    const [favorite, setFavorite] = useState([]);
    const userId = useSelector((state) => state.auth.userId);



    const loadFavorite = () => {
        FavoriteService.getAllFavorites("hotel", userId)
            .then(data => {
                setFavorite(data)
            })
    }
    useEffect(() => {
        if (auth) {
            if (favorite.length === 0) {
                loadFavorite()
            }
        } else {
            console.log("Не авторизован!");
        }
    }, [])





    const addFavorite = () => {
        if (auth) {
            const isFavorite = favorite.some(fav => fav.hotelId === hotelId);
            if (!isFavorite) {
                const dataFavorite = {
                    id: uuidv4(),
                    userId: userId,
                    hotelId: hotelId,
                    date: getCurrentDate()
                };
                setFavorite(prevFavorite => [...prevFavorite, dataFavorite]); // Добавление нового элемента в массив favorite
                FavoriteService.createFavorite("hotel", dataFavorite)
                    .then(data => console.log("Add favorite", data))
                    .catch(e => console.log(e))
                    .finally(() => loadFavorite());
            }
        } else {
            navigate('/api/login');
        }
    };

    const removeFavorite = () => {

        if (auth) {
            const isFavorite = favorite.some(fav => fav.hotelId === hotelId);
            if (isFavorite) {
                const deleteFavorite = favorite.filter(fav => fav.hotelId !== hotelId)
                setFavorite(deleteFavorite)
                FavoriteService.deleteFavorite("hotel", hotelId)
                    .then(data => console.log("Del favorite", data))
                    .catch(e => console.log(e))
                    .finally(() => loadFavorite())
            }
        } else {
            navigate('/api/login');
        }
    };


    return (
        <div>
            {width >= 0 && width <= 920 ?
                <div
                    className="row__sb__c "
                    style={{marginTop: "15px", marginBottom: "15px"}}>
                    <h1 className="text__content__black__b__20">
                        {dataHotelNumber?.name}
                    </h1>
                    <div className="row__sb__c">
                        <div
                            className="row__c__fs"
                            onClick={() => console.log("Поделиться")}
                            style={{
                                cursor: "pointer",
                                marginLeft: "20px",
                                marginRight: "7px"
                            }}
                        >
                            <Icon24ShareExternalOutline color={BLACK}/>
                        </div>
                        {favorite.some(fav => fav.hotelId === hotelId) ?
                            <div
                                className="row__c__fs"
                                style={{cursor: "pointer", marginLeft: "7px", marginRight: "0px"}}>
                                <span onClick={() => removeFavorite()}>
                                        <Icon24Like width={24} height={24} color={GREY_BLACK}/>
                                </span>
                            </div>
                            :
                            <div
                                className="row__c__fs"
                                style={{cursor: "pointer", marginLeft: "7px", marginRight: "0px"}}>
                                   <span onClick={() =>  addFavorite() }>
                                   <Icon24LikeOutline width={24} height={24} color={GREY_BLACK}/>
                                </span>
                            </div>
                        }

                    </div>
                </div>
                :
                <div
                    className="row__sb__c "
                    style={{marginTop: "15px", marginBottom: "15px"}}>
                    <h1 className="header__block__black__b__36">
                        {dataHotelNumber?.name}
                    </h1>
                    <div className="row__sb__c">
                        <div
                            className="row__c__fs"
                            onClick={() => console.log("Поделиться")}
                            style={{
                                cursor: "pointer",
                                marginLeft: "20px",
                                marginRight: "20px"
                            }}
                        >
                            <Icon24ShareExternalOutline color={BLACK}/>
                            <span
                                className="text__content__black__16"
                                style={{
                                    marginLeft: "10px"
                                }}
                            >Поделиться</span>
                        </div>
                        <div
                            className="row__c__fs"
                            style={{
                                cursor: "pointer",
                                marginLeft: "20px",
                                marginRight: "0px"
                            }}
                        >
                            {favorite.some(fav => fav.hotelId === hotelId) ?
                                <div
                                    className="row__c__fs"
                                    style={{cursor: "pointer", marginLeft: "7px", marginRight: "0px"}}>

                                <span onClick={() => removeFavorite()}>
                                        <Icon24Like width={24} height={24} color={GREY_BLACK}/>
                                </span>
                                </div>
                                :
                                <div
                                    className="row__c__fs"
                                    style={{cursor: "pointer", marginLeft: "7px", marginRight: "0px"}}>
                                   <span onClick={() =>  addFavorite()}>
                                   <Icon24LikeOutline width={24} height={24} color={GREY_BLACK}/>
                                </span>
                                </div>
                            }
                            <span
                                className="text__content__black__16"
                                style={{
                                    marginLeft: "10px"
                                }}
                            >В избранное</span>
                        </div>

                        {/*<Link*/}
                        {/*    to={"/Отели_на_карте"}*/}
                        {/*    style={{*/}
                        {/*        marginLeft: "20px",*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <Button*/}
                        {/*        style={"mapButton"}*/}
                        {/*        styleText={"text__content__white__16"}*/}
                        {/*        padding={10}*/}
                        {/*        handler={() => console.log("Показать на карте")}*/}
                        {/*        name={"Показать на карте"}/>*/}
                        {/*</Link>*/}
                    </div>
                </div>

            }

        </div>
    )
}
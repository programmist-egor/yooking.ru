import {useDispatch, useSelector} from "react-redux";
import {Favorite} from "../cards/Favorite";
import {useEffect, useState} from "react";
import {Spinner} from "../spinner/Spinner";
import {addFavoriteUserDataHandler, favoriteUserDataDB, loaderFavoriteAndBookingHandler} from "../../store/ClientData";
import getCookie from "../hooks/getCookie";
import {ref, update} from "firebase/database";
import {database} from "../../firebase";


export const ListFavoriteUser = () => {
    const dispatch = useDispatch()

    const favoriteUserData = useSelector(state => state.client__data.favoriteUserData)
    const loaderFavoriteAndBooking = useSelector(state => state.client__data.loaderFavoriteAndBooking)
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    console.log("DB FAV", favoriteUserData);

    useEffect(() => {

        dispatch(loaderFavoriteAndBookingHandler(true))
        setTimeout(() => dispatch(loaderFavoriteAndBookingHandler(false)), 2000);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    return (
        <div className="column__c__c " style={{marginLeft: "3%", marginRight: "3%"}}>
            <div className="row__fs booking__user__block"
                 style={{overflowX: "hidden", paddingBottom: "100px", overflowY: "hidden"}}>
                <div className="column__fs " style={{margin: "15px"}}>
                    {width >= 0 && width <= 425 ?
                        <h3 className="borderBottom" style={{paddingBottom: "10px"}}>Избранное</h3>
                        :
                        <h2 className="borderBottom" style={{paddingBottom: "10px"}}>Избранное</h2>
                    }
                    {loaderFavoriteAndBooking ?
                        <div className="column__c__c">
                            <Spinner/>
                        </div>
                        :
                        <div className="column" style={{overflowY: "scroll", height: "70vh"}}>
                            {favoriteUserData.length === 0 ?
                                <div className="row__c__c">
                                    <span className="text__content__grey__16">Список избранного пуст</span>
                                </div>
                                :
                                favoriteUserData.map(favorite => {
                                    return (
                                        <Favorite
                                            width={width}
                                            header={favorite.name}
                                            photos={favorite.photos}
                                            item={favorite}
                                            address={favorite.address}
                                            price={favorite.last_price_info.price}
                                            id={favorite.idObject}
                                        />
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
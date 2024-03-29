import {useDispatch, useSelector} from "react-redux";
import {Favorite} from "../cards/Favorite";
import {useEffect, useState} from "react";
import {Spinner} from "../spinner/Spinner";
import {loaderFavoriteAndBookingHandler} from "../../store/ClientData";
import FavoriteService from "../../services/favorite.service";
import ObjectService from "../../services/object.service";
import {parseJSONPropertiesInArray} from "../../utils/json-parse-object";

export const ListFavoriteUser = () => {
    const dispatch = useDispatch();
    const loaderFavoriteAndBooking = useSelector(state => state.client__data.loaderFavoriteAndBooking);
    const [width, setWidth] = useState(window.innerWidth);
    const [object, setObject] = useState([])
    const auth = useSelector(state => state.auth.isAuth);
    const userId = useSelector((state) => state.auth.userId);


    const searchFavoriteObject = (array) => {
        ObjectService.getAllObject()
            .then(data => {
                const result = parseJSONPropertiesInArray(data)
                console.log("result",result);
                console.log("array",array);
                const resultObject = result.filter(object => {
                   return array.find(number => +number.hotelId === +object.hotelId);
                })
                console.log("resultObject",resultObject);
                setObject(resultObject)
            })
    }

    const loadFavorite = () => {
        FavoriteService.getAllFavorites("hotels_map", userId)
            .then(data => {
                searchFavoriteObject(data)
            })
    }
    useEffect(() => {
        if (auth) {
            if (object.length === 0) {
                loadFavorite()
            }
        } else {
            console.log("Не авторизован!");
        }
    }, [])

    console.log("favorite", object);



    useEffect(() => {
        dispatch(loaderFavoriteAndBookingHandler(true));
        setTimeout(() => dispatch(loaderFavoriteAndBookingHandler(false)), 2000);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className="column__c__c custom__container">
            <div className="row__fs booking__user__block">
                <div className="column__fs custom__content">
                    <h3 className={`borderBottom custom__title ${width > 425 ? "large" : ""}`}>Избранное</h3>
                    {
                        loaderFavoriteAndBooking ?
                            <div className="column__c__c">
                                <Spinner/>
                            </div>
                            :
                            <div className="column custom__scroll">
                                {
                                    object.length === 0 ? // проверка на пустую data
                                        <div className="row__c__c">
                                            <span className="text__content__grey__16">Список избранного пуст</span>
                                        </div>
                                        :
                                        object.map(favorite => {
                                            return (
                                                <Favorite
                                                    key={favorite.id} // Уникальный ключ для каждого элемента списка
                                                    width={width}
                                                    header={favorite.name}
                                                    item={favorite}
                                                    address={favorite.address}
                                                    hotelId={favorite.hotelId}
                                                    setObject={setObject}
                                                    object={object}
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

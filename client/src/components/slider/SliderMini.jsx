import React, {useState, useEffect} from 'react';
import {
    Icon24BrowserBack,
    Icon24BrowserForward,
    Icon24LikeOutline,
    Icon24Like,
    Icon24RadioOn,
    Icon24RadioOff
} from '@vkontakte/icons';
import no_photo from "../../assets/image/no_photo.jpg";
import {WHITE} from '../../theme/colors';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import FavoriteService from "../../services/favorite.service";
import {v4 as uuidv4} from "uuid";
import {getCurrentDate} from "../../utils/createDataNow";

export const SliderMini = React.memo(({photoHotel, hotelId, width, height, borderRadius, minWidth}) => {
    const [count, setCount] = useState(0);
    const [favorite, setFavorite] = useState([]);
    const userId = useSelector((state) => state.auth.userId);
    const [arrayImage, setArrayImage] = useState([]);
    const auth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();

    const loadFavorite = () => {
        FavoriteService.getAllFavorites("hotels_map", userId)
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




    useEffect(() => {
        if (photoHotel) {
            setArrayImage(photoHotel.slice(0, 10).map(item => item.url));
        }
    }, [photoHotel]);

    const addFavorite = () => {
        if (auth) {
            const isFavorite = favorite.some(fav => +fav.hotelId === hotelId);
            if (!isFavorite) {
                const dataFavorite = {
                    id: uuidv4(),
                    userId: userId,
                    hotelId: hotelId,
                    date: getCurrentDate()
                };
                setFavorite(prevFavorite => [...prevFavorite, dataFavorite]); // Добавление нового элемента в массив favorite
                FavoriteService.createFavorite("hotels_map", dataFavorite)
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
            const isFavorite = favorite.some(fav => +fav.hotelId === hotelId);
            if (isFavorite) {
                const deleteFavorite = favorite.filter(fav => +fav.hotelId !== hotelId)
                setFavorite(deleteFavorite)
                FavoriteService.deleteFavorite("hotels_map", hotelId)
                    .then(data => console.log("Del favorite", data))
                    .catch(e => console.log(e))
                    .finally(() => loadFavorite())
            }
        } else {
            navigate('/api/login');
        }
    };

    const handlerForward = () => {
        setCount(prevCount => (prevCount + 1) % arrayImage.length);
    };

    const handlerBack = () => {
        setCount(prevCount => (prevCount - 1 + arrayImage.length) % arrayImage.length);
    };


    return (
        <div
            className="column__sb"
            style={{
                height: height,
                minWidth: minWidth,
                maxWidth: width,
                borderRadius: borderRadius,
                backgroundImage: arrayImage.length === 0 ? `url(${no_photo})` : `url(${arrayImage[count]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="row__c__fe">
                {favorite.some(fav => +fav.hotelId === hotelId) ? (
                    <div className="cardControlSlider" onClick={() => removeFavorite()}>
        <Icon24Like width={35} height={35} color={WHITE}/>
    </div>
                ) : (
                    <div className="cardControlSlider" onClick={() =>  addFavorite() }>
        <Icon24LikeOutline width={35} height={35} color={WHITE}/>
    </div>
                )}
            </div>
            <div className="row__sb__c">
                <span className="cardControlSlider" onClick={handlerBack}>
                    <Icon24BrowserBack color={WHITE}/>
                </span>
                <span className="cardControlSlider" onClick={handlerForward}>
                    <Icon24BrowserForward color={WHITE}/>
                </span>
            </div>
            <span className="row__c__c cardControlSlider">
                {arrayImage.map((url, index) => (
                    <span key={index} style={{padding: index === count ? '5px' : '2.5px'}}>
                        {index === count ? (
                            <Icon24RadioOn width={9} height={9} color={WHITE}/>
                        ) : (
                            <Icon24RadioOff width={9} height={9} color={WHITE}/>
                        )}
                    </span>
                ))}
            </span>
        </div>
    );
});


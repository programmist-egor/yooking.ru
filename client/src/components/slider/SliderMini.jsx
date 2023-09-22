import {
    Icon24BrowserBack,
    Icon24BrowserForward,
    Icon24LikeOutline,
    Icon24RadioOn,
    Icon24RadioOff,
    Icon24Like
} from '@vkontakte/icons';
import no_photo from "../../img/no_photo.jpg"
import {WHITE} from "../../theme/colors";
import {useEffect, useState} from "react";
import {addFavoriteHandler} from "../../store/HotelsList";
import {useDispatch, useSelector} from "react-redux";
import {addFavoriteUserDataHandler} from "../../store/ClientData";
import {useNavigate} from "react-router-dom";
import getCookie from "../hooks/getCookie";
import {ref, update} from "firebase/database";
import {database} from "../../firebase";


export const SliderMini = ({photoHotel, hotelId, favorite, width, height, borderRadius, minWidth, item}) => {
    const slideItem = [{id: 0, active: false}]
    const navigate = useNavigate();
    const [count, setCount] = useState(0)
    const [newArray, setNewArray] = useState([])
    const arrayImage = []
    const imageArray = photoHotel.map(item => item.url)
    const dispatch = useDispatch()
    const clientData = useSelector(state => state.client__data.dateClient)
    const itemPage = useSelector(state => state.hotels_list.itemPage)
    const favoriteUserData = useSelector(state => state.client__data.favoriteUserData)
    if (photoHotel.length < 1) {
        if (slideItem.length < 1) {
            slideItem.push({id: 0, active: true})
        }
    }

    if (photoHotel.length < 10 && photoHotel.length > 1) {
        for (let i = 0; i < photoHotel.length; i++) {
            arrayImage.push(imageArray[i])
        }
        for (let i = 1; i < photoHotel.length; i++) {
            if (slideItem.length <= i) {
                slideItem.push({id: i, active: false})
            }
        }
    }
    if (photoHotel.length > 10) {
        for (let i = 0; i < 10; i++) {
            arrayImage.push(imageArray[i])
        }
        for (let i = 1; i < 10; i++) {
            if (slideItem.length <= i) {
                slideItem.push({id: i, active: false})
            }
        }
    }

    useEffect(() => {
        //preloading image

        arrayImage.forEach((face) => {
            const img = new Image();
            img.src = face;
        });


    }, []);

    slideItem.map(item => {
        if (item.id === count) {
            item.active = true
        }
        return item
    })


    const handlerForward = (i) => {
        if (count >= arrayImage.length - 1 && count <= 10) {
            setCount(0)
        } else {
            setCount(count + i)
        }
    }
    const handlerBack = (i) => {
        if (count <= 0) {
            setCount(arrayImage.length - 1)
        } else {
            setCount(count - i)
        }
    }

    const addDelFavorite = () => {
        if (clientData.auth) {

            dispatch(addFavoriteHandler({id: hotelId, numberPage: itemPage}))
            dispatch(addFavoriteUserDataHandler(item));
        } else {
            navigate("/Войти")
        }

    }


    return (
        <div
            className="column__sb"
            style={{
                height: height,
                minWidth: minWidth,
                maxWidth: width,
                borderRadius: borderRadius,
                backgroundImage: photoHotel.length === 0 ? `url(${no_photo})` : `url(${arrayImage[count]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",

            }}
        >
            <div className="row__c__fe">
                <span className="cardControlSlider"
                      onClick={() => addDelFavorite()}>
                    {favorite ? <Icon24Like width={35} height={35} color={WHITE}/> :
                        <Icon24LikeOutline width={35} height={35} color={WHITE}/>}
                </span>
            </div>
            <div className="row__sb__c">
                <span
                    className="cardControlSlider"
                    onClick={() => handlerBack(1)}
                >
                    <Icon24BrowserBack color={WHITE}/>
                </span>
                <span
                    className="cardControlSlider"
                    onClick={() => handlerForward(1)}
                >
                    <Icon24BrowserForward color={WHITE}/>
                </span>
            </div>

            <span className="row__c__c cardControlSlider">
                {
                    slideItem.map(item => (
                        item.active ?
                            <span
                                key={item.id}
                                style={{
                                    padding: "5px"
                                }}>
                            <Icon24RadioOn
                                width={9}
                                height={9}
                                color={WHITE}
                            />
                        </span>
                            :
                            <span
                                key={item.id}
                                style={{
                                    padding: "2.5px"
                                }}>
                            <Icon24RadioOff
                                width={9}
                                height={9}
                                color={WHITE}
                            />
                        </span>
                    ))}
                </span>
        </div>
    )
}
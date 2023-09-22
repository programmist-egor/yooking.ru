import {Icon24ShareExternalOutline, Icon24LikeOutline, Icon24Like} from '@vkontakte/icons';
import {BLACK, GREY_BLACK, WHITE} from "../../theme/colors";
import {addFavoriteHandler, dataHotelsListHandler} from "../../store/HotelsList";
import {useDispatch, useSelector} from "react-redux";
import {addFavoriteUserDataHandler, delFavoriteUserDataHandler} from "../../store/ClientData";
import {useNavigate} from "react-router-dom";

export const HeaderHotelNumber = ({dataHotelNumber, width, itemPage}) => {
    const dispatch = useDispatch()
    const favoriteUserData = useSelector(state => state.client__data.favoriteUserData)
    const navigate = useNavigate();
    const clientData = useSelector(state => state.client__data.dateClient)
    const addDelFavorite = () => {
        if(clientData.auth){
        const idx = favoriteUserData.findIndex(index => index.idObject === dataHotelNumber.idObject)
        if (idx === -1 || favoriteUserData.length === 0) {
            console.log("YES", idx);
            dispatch(addFavoriteUserDataHandler(dataHotelNumber))
        }
        if (idx !== -1) {
            dispatch(delFavoriteUserDataHandler(dataHotelNumber.idObject))
        }
        } else {
            navigate("/Войти")
        }

    }

    return (
        <div>
            {width >= 0 && width<= 920 ?
                <div
                    className="row__sb__c "
                    style={{marginTop: "15px", marginBottom: "15px"}}>
                    <h1 className="text__content__black__b__20">
                        {dataHotelNumber.name}
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
                        <div
                            className="row__c__fs"
                            onClick={() => addDelFavorite()}
                            style={{
                                cursor: "pointer",
                                marginLeft: "7px",
                                marginRight: "0px"
                            }}
                        >
                            {favoriteUserData.findIndex(index => index.idObject === dataHotelNumber.idObject) !== -1 ?
                                <Icon24Like width={24} height={24} color={GREY_BLACK}/> :
                                <Icon24LikeOutline width={24} height={24} color={GREY_BLACK}/>}
                        </div>
                    </div>
                </div>
                :
                <div
                    className="row__sb__c "
                    style={{marginTop: "15px", marginBottom: "15px"}}>
                    <h1 className="header__block__black__b__36">
                        {dataHotelNumber.name}
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
                            onClick={() => addDelFavorite()}
                            style={{
                                cursor: "pointer",
                                marginLeft: "20px",
                                marginRight: "0px"
                            }}
                        >
                            {favoriteUserData.findIndex(index => index.idObject === dataHotelNumber.idObject) !== -1 ?
                                <Icon24Like width={24} height={24} color={GREY_BLACK}/> :
                                <Icon24LikeOutline width={24} height={24} color={GREY_BLACK}/>}
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
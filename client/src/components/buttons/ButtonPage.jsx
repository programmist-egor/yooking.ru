import {BLACK, GREY, WHITE} from "../../theme/colors";
import {Icon24ArrowLeftOutline, Icon24ArrowRightOutline} from '@vkontakte/icons';
import {useDispatch, useSelector} from "react-redux";
import {
    loadingHotelListHandler,
    loadingMapHandler,
    pageSwitchingHandler,
    showHotelMapHandler
} from "../../store/HotelsList";


export const ButtonPage = () => {
    const dispatch = useDispatch()
    const dataHotelsList = useSelector(state => state.hotels_list.dataHotelsList)
    const elements = []
    const itemPage = useSelector(state => state.hotels_list.itemPage)
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const countPage = useSelector(state => state.hotels_list.countPage)

    for (let i = 0 + (itemPage > 1 ? elements.length + itemPage - 1 : 0); i < countPage; i++) {
        elements.push({id: i, active: false})

    }

    elements.map(item => {
        if (item.id === itemPage) {
            item.active = true
        }
        return item
    })

    const choosePage = (id) => {
        dispatch(loadingMapHandler(true))
        setTimeout(() => {
            dispatch(loadingMapHandler(false))
        }, 300)
        dispatch(loadingHotelListHandler(true))
        setTimeout(() => {
            dispatch(loadingHotelListHandler(false))
        }, 300)
        dispatch(showHotelMapHandler({
            lat: cityOrHotel.hotelAndCity.city.location.lat,
            lon: cityOrHotel.hotelAndCity.city.location.lon,
            zoom: 13
        }))

        dispatch(pageSwitchingHandler(id))
    }

    return (
        <div>
            <div
                className="row__c__c"
                style={{
                    display: "flex",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                <div
                    onClick={() => dispatch(pageSwitchingHandler(0))}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        marginLeft: "5px",
                        marginRight: "5px",
                        background: WHITE,
                        cursor: "pointer"
                    }}
                >
                    <Icon24ArrowLeftOutline color={BLACK}/>
                </div>
                <div className="block__scroll">
                    {elements.map(item => (
                        <section
                            key={item.id}
                            onClick={() => choosePage(item.id)}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexShrink: 0,
                                width: "35px",
                                height: "35px",
                                borderRadius: "50%",
                                marginLeft: "5px",
                                marginRight: "5px",
                                background: item.active ? GREY : WHITE,
                                cursor: "pointer"
                            }}
                        >
                            <span className="text__content__black__b__16">{item.id + 1}</span>
                        </section>
                    ))}
                </div>
                <div
                    onClick={() => dispatch(pageSwitchingHandler(dataHotelsList.length - 1))}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        marginLeft: "5px",
                        marginRight: "5px",
                        background: WHITE,
                        cursor: "pointer"
                    }}
                >
                    <Icon24ArrowRightOutline color={BLACK}/>
                </div>
            </div>
        </div>
    )
}
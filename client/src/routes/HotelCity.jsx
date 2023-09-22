import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {BannerSearch} from "../components/blocks/BannerSearch";
import {useDispatch, useSelector} from "react-redux";
import {HeaderHotel} from "../components/header/HeaderHotel";
import {ButtonSort} from "../components/buttons/ButtonSort";
import {Filter} from "../components/filters/Filter";
import {HotelCard} from "../components/cards/HotelCard";
import {ButtonPage} from "../components/buttons/ButtonPage";
import Drawer from "react-modern-drawer";
import {Sort} from "../components/modals/Sort";
import {HotelMap} from "../components/maps/HotelMap";
import {ButtonIcon} from "../components/buttons/ButtonIcon";
import {
    Icon24ArticleBoxOutline,
    Icon24DismissSubstract,
    Icon24Filter,
    Icon24LocationMapOutline
} from "@vkontakte/icons";
import {GREY, WHITE} from "../theme/colors";
import {
    loadingHotelListHandler,
    loadingListHandler,
    loadingMapHandler, pageSwitchingHandler,
    showHotelMapHandler,
    showMetroHandler
} from "../store/HotelsList";
import {Spinner} from "../components/spinner/Spinner";
import React, {useEffect, useState} from "react";


export const HotelCity = () => {


    const dispatch = useDispatch()
    const dataHotelsList = useSelector(state => state.hotels_list.dataHotelsList)
    const loadingHotelList = useSelector(state => state.hotels_list.loadingHotelList)
    const loadingPageCityHotel = useSelector(state => state.hotels_list.loadingPageCityHotel)
    const itemPage = useSelector(state => state.hotels_list.itemPage)
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const countHotels = useSelector(state => state.main.countHotels)
    const hotelCityId = useSelector(state => state.main.hotelCityId)
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [isOpen, setIsOpen] = React.useState(false)
    const [isOpenMap, setIsOpenMap] = React.useState(false)
    const [isOpenSort, setIsOpenSort] = React.useState(false)
    const filteredHotels = useSelector(state => state.hotels_list.filteredHotels)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const toggleDrawerMap = () => {
        setIsOpenMap((prevState) => !prevState)
        dispatch(loadingMapHandler(true))
        setTimeout(() => {
            dispatch(loadingMapHandler(false))
        }, 1000)
        console.log(dataHotelsList[itemPage].hotels[0].location.lat);
        dispatch(showHotelMapHandler({
            lat: dataHotelsList[itemPage].hotels[0].location.lat,
            lon: dataHotelsList[itemPage].hotels[0].location.lon,
            zoom: 16
        }))
    }
    const toggleDrawerSort = () => {
        setIsOpenSort((prevState) => !prevState)
    }

    const updateHoleList = () => {
        //Возврат на первую страницу
        dispatch(pageSwitchingHandler(0))
        // Лоадеры
        dispatch(loadingHotelListHandler(true))
        setTimeout(() => {
            dispatch(loadingHotelListHandler(false))
        }, 300)
        dispatch(loadingMapHandler(true))
        setTimeout(() => {
            dispatch(loadingMapHandler(false))
        }, 300)
        // Обновление местоположения
        console.log("// Обновление местоположения");
        dispatch(showHotelMapHandler(
            {
                lat: cityOrHotel.hotelAndCity.city.location.lat,
                lon: cityOrHotel.hotelAndCity.city.location.lon,
                zoom: 13
            }))
    }

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
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            {!loadingPageCityHotel ?
                <div className="center">
                    <BannerSearch header={hotelCityId.header} q={"?"} banner={hotelCityId.banner}/>
                    {/*<HeaderHotel value={countHotels} toggleDrawerMap={toggleDrawerMap}/>*/}
                    <div className="row__fs__fs" style={{margin:"20px"}}>
                        {width <= 906 ? "" : <Filter updateHoleList={updateHoleList}/>}
                        <Drawer
                            open={isOpen}
                            onClose={toggleDrawer}
                            direction='left'
                            className='bla bla bla'
                        >
                            {!loadingHotelList ? <Filter updateHoleList={updateHoleList}/> :
                                <div className="row__c__c"><Spinner/></div>}
                        </Drawer>

                        <Drawer
                            open={isOpenSort}
                            onClose={toggleDrawerSort}
                            direction='bottom'
                            style={{height: "22vh"}}
                        >
                            <Sort/>
                        </Drawer>

                        <Drawer
                            open={isOpenMap}
                            onClose={toggleDrawerMap}
                            direction='bottom'
                            style={{height: "88vh"}}
                        >
                            <HotelMap/>
                            <div className="row__c__c" style={{marginTop: "20px",}}>
                                <ButtonIcon
                                    name={"Закрыть"}
                                    handler={() => toggleDrawerMap()}
                                    styleText={"text__content__white__14"}
                                    style={"filterBtn"}
                                    icon={<Icon24DismissSubstract widtth={20} height={20} color={WHITE}/>}
                                    width={"120px"}
                                />
                            </div>
                        </Drawer>

                        <div className="column__fs__c" style={{width: "100%"}}>
                            <div className="row__c__fs">
                                {/*{width <= 660 ? "" : <ButtonSort/>}*/}
                                {width >= 906 && width <= 1249 ?
                                    <ButtonIcon
                                        name={"Карта"}
                                        handler={() => toggleDrawerMap()}
                                        styleText={"text__content__white__14"}
                                        style={"filterBtn"}
                                        icon={<Icon24LocationMapOutline color={WHITE}/>}
                                        width={"100px"}
                                    />
                                    :
                                    ""
                                }
                                {width >= 661 && width <= 905 ?
                                    <>
                                        <ButtonIcon
                                            name={"Параметры"}
                                            handler={() => toggleDrawer()}
                                            styleText={"text__content__white__14"}
                                            style={"filterBtn"}
                                            icon={<Icon24Filter color={WHITE}/>}
                                            width={"150px"}
                                        />
                                        <ButtonIcon
                                            name={"Карта"}
                                            handler={() => toggleDrawerMap()}
                                            styleText={"text__content__white__14"}
                                            style={"filterBtn"}
                                            icon={<Icon24LocationMapOutline color={WHITE}/>}
                                            width={"100px"}
                                        />
                                    </>
                                    :
                                    ""
                                }
                                {width >= 0 && width <= 660 ?
                                    <>
                                        <div className="mobileBtn" onClick={() => toggleDrawerSort()}>
                                            <Icon24ArticleBoxOutline color={WHITE}/>
                                        </div>
                                        <div className="mobileBtn" onClick={() => toggleDrawer()}>
                                            <Icon24Filter color={WHITE}/>
                                        </div>
                                        <div className="mobileBtn" onClick={() => toggleDrawerMap()}>
                                            <Icon24LocationMapOutline color={WHITE}/>
                                        </div>
                                    </>
                                    :
                                    ""
                                }
                            </div>


                            <div className="column" style={{overflowY: "scroll",}}>
                                {!loadingHotelList ?
                                    filteredHotels !== null ?
                                        filteredHotels.length !== 0 || filteredHotels[0].hotels.length !== 0 ?
                                            filteredHotels[itemPage].hotels.map(item => {
                                                // item.metro.length === 0 ? dispatch(showMetroHandler(false)) : dispatch(showMetroHandler(true))
                                                return (
                                                    <HotelCard
                                                        toggleDrawerMap={toggleDrawerMap}
                                                        key={item.hotelId}
                                                        hotelId={item.hotelId}
                                                        name={item.name}
                                                        countReviews={item.countReviews}
                                                        nearMetro={item.metro}
                                                        photoHotel={item.photos}
                                                        lastPriceInfo={item.last_price_info}
                                                        address={item.address}
                                                        distance={item.distance}
                                                        rating={item.rating}
                                                        favorite={item.favorite}
                                                        location={item.location}
                                                        itemPage={itemPage}
                                                        item={item}
                                                        hotelCity={false}
                                                    />
                                                )
                                            })
                                            :
                                            <>
                                                <div className="row__c__c">
                                                    <h2 style={{color: GREY}}>Ничего не найдено</h2>
                                                </div>
                                            </>
                                        :
                                        dataHotelsList.length !== 0 || dataHotelsList[0].hotels.length !== 0 ?
                                            dataHotelsList[itemPage].hotels.map(item => {
                                                // item.metro.length === 0 ? dispatch(showMetroHandler(false)) : dispatch(showMetroHandler(true))
                                                return (
                                                    <HotelCard
                                                        toggleDrawerMap={toggleDrawerMap}
                                                        key={item.hotelId}
                                                        hotelId={item.hotelId}
                                                        name={item.name}
                                                        countReviews={item.countReviews}
                                                        nearMetro={item.metro}
                                                        photoHotel={item.photos}
                                                        lastPriceInfo={item.last_price_info}
                                                        address={item.address}
                                                        distance={item.distance}
                                                        rating={item.rating}
                                                        favorite={item.favorite}
                                                        location={item.location}
                                                        itemPage={itemPage}
                                                        item={item}
                                                        hotelCity={false}
                                                    />
                                                )
                                            })
                                            :
                                            <>
                                                <div className="row__c__c">
                                                    <h2 style={{color: GREY}}>Ничего не найдено</h2>
                                                </div>
                                            </>

                                    :
                                    <div className="column__c__c">
                                        <Spinner/>
                                    </div>
                                }
                            </div>
                            <ButtonPage/>
                        </div>
                        <div className="column__fs map1250 map1250-sticky"
                             style={{width: "100%", marginLeft: "20px", overflowX: "hidden", borderRadius: "15px"}}>
                            <HotelMap/>
                        </div>
                    </div>
                    {/*<div className="row__c__c marginValue">*/}
                    {/*    {width <= 906 ? "" : <Filter updateHoleList={updateHoleList}/>}*/}
                    {/*    <Drawer*/}
                    {/*        open={isOpen}*/}
                    {/*        onClose={toggleDrawer}*/}
                    {/*        direction='left'*/}
                    {/*        className='bla bla bla'*/}
                    {/*    >*/}
                    {/*        <Filter updateHoleList={updateHoleList}/>*/}
                    {/*    </Drawer>*/}

                    {/*    <Drawer*/}
                    {/*        open={isOpenSort}*/}
                    {/*        onClose={toggleDrawerSort}*/}
                    {/*        direction='bottom'*/}
                    {/*        style={{height: "22vh"}}*/}
                    {/*    >*/}
                    {/*        <Sort/>*/}
                    {/*    </Drawer>*/}

                    {/*    <Drawer*/}
                    {/*        open={isOpenMap}*/}
                    {/*        onClose={toggleDrawerMap}*/}
                    {/*        direction='bottom'*/}
                    {/*        style={{height: "88vh"}}*/}
                    {/*    >*/}
                    {/*        <HotelMap/>*/}
                    {/*        <div className="row__c__c" style={{marginTop: "20px",}}>*/}
                    {/*            <ButtonIcon*/}
                    {/*                name={"Закрыть"}*/}
                    {/*                handler={() => toggleDrawerMap()}*/}
                    {/*                styleText={"text__content__white__14"}*/}
                    {/*                style={"filterBtn"}*/}
                    {/*                icon={<Icon24DismissSubstract widtth={20} height={20} color={WHITE}/>}*/}
                    {/*                width={"120px"}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </Drawer>*/}

                    {/*    <div className="column__fs__c" style={{width: "100%"}}>*/}
                    {/*        <div className="row__c__fs"*/}
                    {/*             style={{*/}
                    {/*                 marginTop: "-10px",*/}
                    {/*                 marginRight: "10px",*/}
                    {/*                 marginLeft: "10px",*/}
                    {/*                 marginBottom: "10px"*/}
                    {/*             }}>*/}
                    {/*            /!*{width <= 660 ? "" : <ButtonSort/>}*!/*/}
                    {/*            {width >= 906 && width <= 1249 ?*/}
                    {/*                <ButtonIcon*/}
                    {/*                    name={"Карта"}*/}
                    {/*                    handler={() => toggleDrawerMap()}*/}
                    {/*                    styleText={"text__content__white__14"}*/}
                    {/*                    style={"filterBtn"}*/}
                    {/*                    icon={<Icon24LocationMapOutline color={WHITE}/>}*/}
                    {/*                    width={"100px"}*/}
                    {/*                />*/}
                    {/*                :*/}
                    {/*                ""*/}
                    {/*            }*/}
                    {/*            {width >= 661 && width <= 905 ?*/}
                    {/*                <>*/}
                    {/*                    <ButtonIcon*/}
                    {/*                        name={"Параметры"}*/}
                    {/*                        handler={() => toggleDrawer()}*/}
                    {/*                        styleText={"text__content__white__14"}*/}
                    {/*                        style={"filterBtn"}*/}
                    {/*                        icon={<Icon24Filter color={WHITE}/>}*/}
                    {/*                        width={"150px"}*/}
                    {/*                    />*/}
                    {/*                    <ButtonIcon*/}
                    {/*                        name={"Карта"}*/}
                    {/*                        handler={() => toggleDrawerMap()}*/}
                    {/*                        styleText={"text__content__white__14"}*/}
                    {/*                        style={"filterBtn"}*/}
                    {/*                        icon={<Icon24LocationMapOutline color={WHITE}/>}*/}
                    {/*                        width={"100px"}*/}
                    {/*                    />*/}
                    {/*                </>*/}
                    {/*                :*/}
                    {/*                ""*/}
                    {/*            }*/}
                    {/*            {width >= 0 && width <= 660 ?*/}
                    {/*                <>*/}
                    {/*                    <div className="mobileBtn" onClick={() => toggleDrawerSort()}>*/}
                    {/*                        <Icon24ArticleBoxOutline color={WHITE}/>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="mobileBtn" onClick={() => toggleDrawer()}>*/}
                    {/*                        <Icon24Filter color={WHITE}/>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="mobileBtn" onClick={() => toggleDrawerMap()}>*/}
                    {/*                        <Icon24LocationMapOutline color={WHITE}/>*/}
                    {/*                    </div>*/}
                    {/*                </>*/}
                    {/*                :*/}
                    {/*                ""*/}
                    {/*            }*/}
                    {/*        </div>*/}

                    {/*        <div className="column" style={{overflowY: "scroll", height: "70vh"}}>*/}
                    {/*            {!loadingHotelList ?*/}
                    {/*                filteredHotels !== null ?*/}
                    {/*                    filteredHotels.length !== 0 || filteredHotels[0].hotels.length !== 0 ?*/}
                    {/*                        filteredHotels[itemPage].hotels.map(item => {*/}
                    {/*                            // item.metro.length === 0 ? dispatch(showMetroHandler(false)) : dispatch(showMetroHandler(true))*/}
                    {/*                            return (*/}
                    {/*                                <HotelCard*/}
                    {/*                                    toggleDrawerMap={toggleDrawerMap}*/}
                    {/*                                    key={item.hotelId}*/}
                    {/*                                    hotelId={item.hotelId}*/}
                    {/*                                    name={item.name}*/}
                    {/*                                    countReviews={item.countReviews}*/}
                    {/*                                    nearMetro={item.metro}*/}
                    {/*                                    photoHotel={item.photos}*/}
                    {/*                                    lastPriceInfo={item.last_price_info}*/}
                    {/*                                    address={item.address}*/}
                    {/*                                    distance={item.distance}*/}
                    {/*                                    rating={item.rating}*/}
                    {/*                                    favorite={item.favorite}*/}
                    {/*                                    location={item.location}*/}
                    {/*                                    itemPage={itemPage}*/}
                    {/*                                    item={item}*/}
                    {/*                                    hotelCity={true}*/}
                    {/*                                />*/}
                    {/*                            )*/}
                    {/*                        })*/}
                    {/*                        :*/}
                    {/*                        <>*/}
                    {/*                            <div className="row__c__c">*/}
                    {/*                                <h2 style={{color: GREY}}>Ничего не найдено</h2>*/}
                    {/*                            </div>*/}
                    {/*                        </>*/}
                    {/*                    :*/}
                    {/*                    dataHotelsList.length !== 0 || dataHotelsList[0].hotels.length !== 0 ?*/}
                    {/*                        dataHotelsList[itemPage].hotels.map(item => {*/}
                    {/*                            // item.metro.length === 0 ? dispatch(showMetroHandler(false)) : dispatch(showMetroHandler(true))*/}
                    {/*                            return (*/}
                    {/*                                <HotelCard*/}
                    {/*                                    toggleDrawerMap={toggleDrawerMap}*/}
                    {/*                                    key={item.hotelId}*/}
                    {/*                                    hotelId={item.hotelId}*/}
                    {/*                                    name={item.name}*/}
                    {/*                                    countReviews={item.countReviews}*/}
                    {/*                                    nearMetro={item.metro}*/}
                    {/*                                    photoHotel={item.photos}*/}
                    {/*                                    lastPriceInfo={item.last_price_info}*/}
                    {/*                                    address={item.address}*/}
                    {/*                                    distance={item.distance}*/}
                    {/*                                    rating={item.rating}*/}
                    {/*                                    favorite={item.favorite}*/}
                    {/*                                    location={item.location}*/}
                    {/*                                    itemPage={itemPage}*/}
                    {/*                                    item={item}*/}
                    {/*                                    hotelCity={true}*/}
                    {/*                                />*/}
                    {/*                            )*/}
                    {/*                        })*/}
                    {/*                        :*/}
                    {/*                        <>*/}
                    {/*                            <div className="row__c__c">*/}
                    {/*                                <h2 style={{color: GREY}}>Ничего не найдено</h2>*/}
                    {/*                            </div>*/}
                    {/*                        </>*/}

                    {/*                :*/}
                    {/*                <div className="column__c__c">*/}
                    {/*                    <Spinner/>*/}
                    {/*                </div>*/}
                    {/*            }*/}
                    {/*        </div>*/}
                    {/*        <ButtonPage/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                :
                <Spinner/>
            }
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
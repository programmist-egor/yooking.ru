import React, {useEffect, useRef, useState} from 'react';
import {Header} from "../components/header/Header";
import {Filter} from "../components/filters/Filter";
import {ButtonSort} from "../components/buttons/ButtonSort";
import {HotelCard} from "../components/cards/HotelCard";
import {ButtonPage} from "../components/buttons/ButtonPage";
import {Footer} from "../components/footer/Footer";
import SearchPanel from "../components/search/SearchPanel";
import {GREY, GREY_BANNER, WHITE} from "../theme/colors";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "../components/spinner/Spinner";
import {HotelMap} from "../components/maps/HotelMap";
import {
    Icon24ArticleBoxOutline,
    Icon24DismissSubstract,
    Icon24Filter,
    Icon24LocationMapOutline
} from "@vkontakte/icons";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {ButtonIcon} from "../components/buttons/ButtonIcon";
import {Sort} from "../components/modals/Sort";
import {
    loadingHotelListHandler,
    loadingMapHandler,
    pageSwitchingHandler,
    setFilteredHotels,
    showHotelMapHandler
} from "../store/HotelsList";
import {countOtherSortHandler, resetParamHandler} from "../store/Filter";
import {useLocation, useNavigate} from "react-router-dom";
import {BannerSearch} from "../components/blocks/BannerSearch";
import img__2 from "../img/blocks/2.png";
import piter from "../img/blocks/piter.png";


export const HotelAndMap = ({closeModals}) => {

    const dispatch = useDispatch()
    const dataHotelsList = useSelector(state => state.hotels_list.dataHotelsList)
    const filteredHotels = useSelector(state => state.hotels_list.filteredHotels)
    const loadingHotelList = useSelector(state => state.hotels_list.loadingHotelList)
    const dataBanner = {
        id: 2,
        cityId: "12196",
        name: "Санкт-Петербург, Россия",
        img: img__2,
        text: "Санкт - Петербург",
        header: "ГДЕ ОСТАНОВИТЬСЯ В САНКТ - ПЕТЕРБУРГЕ?",
        banner: piter
    }
    const itemPage = useSelector(state => state.hotels_list.itemPage)
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const loadingMap = useSelector(state => state.hotels_list.loadingMap)
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [isOpen, setIsOpen] = React.useState(false)
    const [isOpenMap, setIsOpenMap] = React.useState(false)
    const [isOpenSort, setIsOpenSort] = React.useState(false)



    function declineToPrepositionalCase(word) {
        // Определите правила склонения для различных окончаний
        const rules = [
            { suffix: 'а', prepositional: 'е' },
            { suffix: 'я', prepositional: 'е'},
            { suffix: 'ь', prepositional: 'и'},
            // Добавьте другие правила по мере необходимости
        ];

        // По умолчанию оставляем слово неизменным
        let prepositionalWord = word;

        // Проверяем, соответствует ли слово одному из правил
        for (const rule of rules) {
            if (word.endsWith(rule.suffix)) {
                // Если слово оканчивается на суффикс, применяем правило склонения
                prepositionalWord = word.slice(0, -rule.suffix.length) + rule.prepositional;
                break; // Выходим из цикла, как только найдено соответствие
            }
        }

        return prepositionalWord;
    }

// // Пример использования
//     const originalWord = 'стол';
//     const prepositionalWord = declineToPrepositionalCase(originalWord);
//     console.log(prepositionalWord); // Выведет "столе"


// Функция для форматирования текста
    function formatText(text) {
        // Оставьте этот код без изменений
        const parts = text.split(",");
        if (parts.length === 2) {
            const beforeComma = parts[0].trim();
            const prepositionalWord = declineToPrepositionalCase(beforeComma);
            return prepositionalWord;
        }
        return text;
    }

    const inputText = cityOrHotel.hotelAndCity.city.name;
    const formattedText = formatText(inputText);
    // console.log(formattedText);
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


    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const toggleDrawerMap = () => {
        setIsOpenMap((prevState) => !prevState)
    }

    const toggleDrawerSort = () => {
        setIsOpenSort((prevState) => !prevState)
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

    const location = useLocation();

    useEffect(() => {
        const handleBackButton = () => {
            // Действие при нажатии кнопки "Назад" в браузере
            console.log('Назад в браузере нажато');
            dispatch(setFilteredHotels(null));
            dispatch(resetParamHandler())
        };

        const unlisten = () => {
            // Вспомогательная функция для отмены следующего слушателя
            window.removeEventListener('popstate', handleBackButton);
        };

        if (location.key) {
            // Если история сопровождается уникальным ключом, добавьте слушателя.
            window.addEventListener('popstate', handleBackButton);
        }

        return unlisten;
    }, [location]);


    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>

            <div className="center" onClick={closeModals}>
                {/*<div*/}
                {/*    className="row__c__c"*/}
                {/*    style={{*/}
                {/*        height: "100%",*/}
                {/*        background: GREY_BANNER,*/}
                {/*        paddingRight: "20%",*/}
                {/*        paddingLeft: "20%",*/}
                {/*        paddingTop: "2.7%",*/}
                {/*        paddingBottom: "2.7%"*/}
                {/*    }}*/}
                {/*>*/}
                {/*</div>*/}

                <BannerSearch header={formattedText} addHeader={"ГДЕ ОСТАНОВИТЬСЯ В "} q={"?"} banner={dataBanner.banner}/>


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
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
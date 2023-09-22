import {Icon24SlidersVerticalOutline} from '@vkontakte/icons';
import {BLACK, ORANGE, WHITE} from "../../theme/colors";
import {RangePrice} from "../inputs/RangePrice";
import {useDispatch, useSelector} from "react-redux";
import {ButtonCounter} from "../buttons/ButtonCounter";
import {Button} from "../buttons/Button";
import {useCallback, useEffect, useState} from "react";
import {
    chooseParamHandler,
    countHandler,
    countOtherSortHandler,
    handlerAddBedroom, handlerDelBedroom,
    resetParamHandler
} from "../../store/Filter";
import {
    copyDataHotelsListHandler,
    countPageHandler,
    dataHotelsListHandler, loadingHotelListHandler,
    loadingListHandler,
    loadingMapHandler,
    pageSwitchingHandler, setFilteredHotels, showHotelMapHandler
} from "../../store/HotelsList";
import {pageDistribution} from "../utils/search-hotels";
import {handlerCountHotels} from "../../store/Main";


export const Filter = ({updateHoleList}) => {
    const dispatch = useDispatch()
    const listFilter = useSelector(state => state.filter.listFilter)
    const bedroomCount = useSelector(state => state.filter.bedroomCount)
    const dataHotelsList = useSelector(state => state.hotels_list.dataHotelsList)
    const filteredHotels = useSelector(state => state.hotels_list.filteredHotels)
    const copyDataHotelsList = useSelector(state => state.hotels_list.copyDataHotelsList)
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const loadingHotelList = useSelector(state => state.hotels_list.loadingHotelList)
    const [typeObject, setTypeObject] = useState([])
    const [reviewScore, setReviewScore] = useState([])
    const [distance, setDistance] = useState([])
    const [stars, setStars] = useState([])
    const [politicalCancel, setPoliticalCancel] = useState([])
    const [nutrition, setNutrition] = useState([])
    const [shortFacilities, setShortFacilities] = useState([])

    const handleCategoryChange = (result, idElement, idBlock, value) => {
        dispatch(chooseParamHandler({idElement: idElement, idBlock: idBlock}));

        if (idBlock === 0) {
            const newTypeObject = typeObject.includes(value)
                ? typeObject.filter((cat) => cat !== value)
                : [...typeObject, value];

            setTypeObject(newTypeObject);
            handleFilterChange(
                newTypeObject,
                stars,
                reviewScore,
                distance,
                politicalCancel,
                nutrition,
                shortFacilities,
                result
            );
        }

        if (idBlock === 1) {
            const newStars = stars.includes(value)
                ? stars.filter((cat) => cat !== value)
                : [...stars, value];

            setStars(newStars);
            handleFilterChange(
                typeObject,
                newStars,
                reviewScore,
                distance,
                politicalCancel,
                nutrition,
                shortFacilities,
                result
            );
        }

        if (idBlock === 2) {
            const newReviewScore = reviewScore.includes(value)
                ? reviewScore.filter((cat) => cat !== value)
                : [...reviewScore, value];

            setReviewScore(newReviewScore);
            handleFilterChange(
                typeObject,
                stars,
                newReviewScore,
                distance,
                politicalCancel,
                nutrition,
                shortFacilities,
                result
            );
        }

        if (idBlock === 3) {
            const newDistance = distance.includes(value)
                ? distance.filter((cat) => cat !== value)
                : [...distance, value];

            setDistance(newDistance);
            handleFilterChange(
                typeObject,
                stars,
                reviewScore,
                newDistance,
                politicalCancel,
                nutrition,
                shortFacilities,
                result
            );
        }

        if (idBlock === 4) {
            const newPoliticalCancel = politicalCancel.includes(value)
                ? politicalCancel.filter((cat) => cat !== value)
                : [...politicalCancel, value];

            setPoliticalCancel(newPoliticalCancel);
            handleFilterChange(
                typeObject,
                stars,
                reviewScore,
                distance,
                newPoliticalCancel,
                nutrition,
                shortFacilities,
                result
            );
        }

        if (idBlock === 5) {
            const newNutrition = nutrition.includes(value)
                ? nutrition.filter((cat) => cat !== value)
                : [...nutrition, value];

            setNutrition(newNutrition);
            handleFilterChange(
                typeObject,
                stars,
                reviewScore,
                distance,
                politicalCancel,
                newNutrition,
                shortFacilities,
                result
            );
        }

        if (idBlock === 6) {
            const newShortFacilities = shortFacilities.includes(value)
                ? shortFacilities.filter((cat) => cat !== value)
                : [...shortFacilities, value];
            setShortFacilities(newShortFacilities);
            handleFilterChange(
                typeObject,
                stars,
                reviewScore,
                distance,
                politicalCancel,
                nutrition,
                newShortFacilities,
                result
            );
        }
    };


    // //Фильтр
    const handleFilterChange = (typeObject, stars, reviewScore, distance, politicalCancel, nutrition, shortFacilities, result) => {
        setTimeout(() => {


            //Базовые данные
            let updatedFilteredHotels = []
            dataHotelsList.map(item => {
                item.hotels.map(hotels => {
                    updatedFilteredHotels.push(hotels)
                })
            })

            console.log("Параметры", typeObject, stars, reviewScore, distance, politicalCancel, nutrition, shortFacilities, !result);


            if (typeObject && typeObject.length > 0) {
                updatedFilteredHotels = updatedFilteredHotels.filter((hotel) =>
                    typeObject.includes(hotel.property_type)
                );

            }

            if (stars && stars.length > 0) {
                updatedFilteredHotels = updatedFilteredHotels.filter((hotel) =>
                    stars.includes(hotel.stars)
                );

            }

            if (reviewScore && reviewScore.length > 0) {
                updatedFilteredHotels = updatedFilteredHotels.filter((hotel) =>
                    reviewScore.includes(Math.floor(hotel.rating))
                );
            }

            if (distance && distance.length > 0) {
                updatedFilteredHotels = updatedFilteredHotels.filter((hotel) =>
                    distance.includes(Math.ceil(hotel.distance))
                );
            }
            if (politicalCancel && politicalCancel.length > 0) {
                updatedFilteredHotels = updatedFilteredHotels.map((hotel) => {
                    hotel.political_cancel.filter(value => {
                        if (politicalCancel.includes(value)) {
                            console.log("Поиск значения", value)
                        }
                    })
                    return hotel
                })
            }

            if (nutrition && nutrition.length > 0) {
                updatedFilteredHotels = updatedFilteredHotels.map((hotel) => {
                    hotel.nutrition.filter(value => {
                        if (nutrition.includes(value)) {
                            console.log("Поиск значения", value)
                        }
                    })
                    return hotel
                })
            }

            if (shortFacilities && shortFacilities.length > 0) {

                updatedFilteredHotels = updatedFilteredHotels.map((hotel) => {
                    hotel.shortFacilities.filter(value => {
                        if (shortFacilities.includes(value)) {
                            console.log("Поиск значения", value)
                        }
                    })
                    return hotel
                })

            }
            dispatch(handlerCountHotels(updatedFilteredHotels.length))
            console.log("Фильтрованный массив", updatedFilteredHotels)
            updateFilteredData(updatedFilteredHotels)
            // addDelBedrooms("update", 0)
        }, 0)
    }

    const updateFilteredData = (array) => {
        const res = pageDistribution(array)

        dispatch(countPageHandler(res.countPage + 1));
        // dispatch(copyDataHotelsListHandler(res.list));
        // Обновление количества отелей в списке параметров
        dispatch(countOtherSortHandler(res.list));
        dispatch(setFilteredHotels(res.list));
        updateHoleList()
    }

    const addDelBedrooms = (action, value) => {
        //Базовые данные
        let updatedFilteredHotelsBedroom = []

        filteredHotels === null ?
            dataHotelsList.map(item => {
                item.hotels.map(hotels => {
                    updatedFilteredHotelsBedroom.push(hotels)
                })
            })
            :
            filteredHotels.map(item => {
                item.hotels.map(hotels => {
                    updatedFilteredHotelsBedroom.push(hotels)
                })
            })
        if (action === 'update') {
            const bedroomSort = updatedFilteredHotelsBedroom.filter(bedroom => bedroom.countBedrooms <= bedroomCount);
            updateFilteredData(bedroomSort)

        }
        if (action === 'add') {
            dispatch(handlerAddBedroom(value))
            const bedroomSort = updatedFilteredHotelsBedroom.filter(bedroom => bedroom.countBedrooms <= bedroomCount);
            updateFilteredData(bedroomSort)

        }
        if (action === 'del') {
            dispatch(handlerDelBedroom(value))
            const bedroomSort = updatedFilteredHotelsBedroom.filter(bedroom => bedroom.countBedrooms <= bedroomCount);
            updateFilteredData(bedroomSort)
        }
    }

    useEffect(() => {
        const checkedArray = []
        listFilter.map(item => {
            item.options.map(opt => {
                if (opt.result === true) {
                    checkedArray[0] = opt.result
                }
            })

        })

        if (checkedArray[0] === undefined) {
            dispatch(setFilteredHotels(null));
        } else {
            console.log("Фильтр еще не пуст");
        }
    }, [handleFilterChange, handleCategoryChange, listFilter])

    const resetParamsHandler = () => {
        dispatch(resetParamHandler())
        dispatch(countOtherSortHandler(dataHotelsList));
        dispatch(dataHotelsListHandler(dataHotelsList))
        updateHoleList()
    }
    //
    // useEffect(() => {
    //     const bedroomSort = baseData.filter(bedroom => bedroom.countBedrooms <= bedroomCount);
    //     sortPageAll(bedroomSort)
    //     // updateHoleList()
    // }, [bedroomCount])


    return (
        <div>
            <div className="column laptop__907__filter"
                 style={{
                     background: WHITE,
                     width: "240px",
                     // height: "79vh",
                     borderRadius: "15px 15px 0 0",
                     marginRight: "30px",
                 }}
            >
                <div className="row__c__fs"
                     style={{marginLeft: "10px", marginTop: "10px", marginBottom: "10px"}}>
                    <Icon24SlidersVerticalOutline color={BLACK}/>
                    <span className="text__content__black__b__20" style={{marginLeft: "10px"}}>
                    Параметры
                </span>
                </div>
                <div className="column__fs filter">
                    <h4 className="text__content__black__b__16">
                        Цена
                    </h4>
                    <RangePrice/>
                    {listFilter.map(item => (
                        <div
                            className="column__fs"
                            key={item.id}
                        >
                            <h4 className="text__content__black__b__16">
                                {item.header}
                            </h4>
                            {item.options.map(option => (
                                <div
                                    className="row__sb__c"
                                    key={option.id}
                                >
                                    <div className="row__c__c">
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCategoryChange(option.result, option.id, item.id, option.value)}
                                            checked={option.result}
                                            disabled={option.count === 0}
                                            style={{
                                                marginTop: "8px",
                                                // width: "20px",
                                                // height: "20px",
                                                cursor: "pointer",
                                                color: ORANGE
                                            }}
                                        />
                                        <span
                                            className="text__content__black__13"
                                            style={{
                                                marginLeft: "5px",
                                                marginTop: "5px"
                                            }}
                                        >
                                    {option.name}
                                </span>
                                    </div>
                                    <span className="text__content__grey__12">
                                {option.result ? "" : option.count }
                            </span>
                                </div>
                            ))}
                        </div>
                    ))}
                    <h4 className="text__content__black__b__16">
                        Количество спален
                    </h4>
                    <div className="row__sb__c">
                <span className="text__content__black__13">
                  Спальни
                </span>
                        <ButtonCounter
                            handleDel={() => addDelBedrooms("del", 1)}
                            handleAdd={() => addDelBedrooms("add", 1)}
                            count={bedroomCount}
                            style={"row__sb__c counterBtn"}
                        />
                    </div>
                </div>

                <Button
                    name={"Сбросить параметры"}
                    style={"resetOptionsBtn"}
                    handler={() => resetParamsHandler()}
                    padding={"0"}
                    styleText={"text__content__white__14"}
                    marginLeft={"0"}
                    marginTop={"0"}
                />
            </div>


            <div className="column tablet__906__filter"
                 style={{background: WHITE, width: "260px", height: "100vh"}}>
                <div className="row__c__fs"
                     style={{marginLeft: "10px", marginTop: "10px", marginBottom: "10px"}}>
                    <Icon24SlidersVerticalOutline color={BLACK}/>
                    <span className="text__content__black__b__20" style={{marginLeft: "10px"}}>
                    Параметры
                </span>
                </div>
                <div className="column__fs filter">
                    <h4 className="text__content__black__b__16">
                        Цена
                    </h4>
                    <RangePrice/>
                    {listFilter.map(item => (
                        <div
                            className="column__fs"
                            key={item.id}
                        >
                            <h4 className="text__content__black__b__16">
                                {item.header}
                            </h4>
                            {item.options.map(option => (
                                <div
                                    className="row__sb__c"
                                    key={option.id}
                                >
                                    <div className="row__c__c">
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCategoryChange(option.result, option.id, item.id, option.value)}
                                            checked={option.result}
                                            style={{
                                                marginTop: "8px",
                                                // width: "20px",
                                                // height: "20px",
                                                cursor: "pointer",
                                                color: ORANGE
                                            }}
                                        />
                                        <span
                                            className="text__content__black__13"
                                            style={{
                                                marginLeft: "5px",
                                                marginTop: "5px"
                                            }}
                                        >
                                    {option.name}
                                </span>
                                    </div>
                                    <span className="text__content__grey__12">
                                {option.count}
                            </span>
                                </div>
                            ))}
                        </div>
                    ))}
                    <h4 className="text__content__black__b__16">
                        Количество спален
                    </h4>
                    <div className="row__sb__c">
                <span className="text__content__black__13">
                  Спальни
                </span>
                        <ButtonCounter
                            handleDel={() => addDelBedrooms("del", 1)}
                            handleAdd={() => addDelBedrooms("add", 1)}
                            count={bedroomCount}
                            style={"row__sb__c counterBtn"}
                        />
                    </div>
                </div>

                <Button
                    name={"Сбросить параметры"}
                    style={"resetOptionsBtn"}
                    handler={() => resetParamsHandler()}
                    padding={"5%"}
                    styleText={"text__content__white__14"}
                    marginLeft={"0"}
                    marginTop={"0px"}
                />
            </div>
        </div>
    )
}
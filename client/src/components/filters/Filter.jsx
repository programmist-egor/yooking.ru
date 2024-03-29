import {Icon24SlidersVerticalOutline} from '@vkontakte/icons';
import {BLACK, ORANGE, WHITE} from "../../theme/colors";
import {RangePrice} from "../inputs/RangePrice";
import {useDispatch, useSelector} from "react-redux";
import {ButtonCounter} from "../buttons/ButtonCounter";
import {Button} from "../buttons/Button";
import { useEffect} from "react";
import {
    chooseParamHandler,
    countOtherSortHandler, distanceHandler,
    handlerAddBedroom, handlerDelBedroom, initFilterHandler, nutritionHandler, politicalCancelHandler,
    resetParamHandler, reviewScoreHandler, shortFacilitiesHandler, starsHandler, typeObjectHandler
} from "../../store/Filter";
import {
 setFilteredHotels,
} from "../../store/HotelsList";
import {handlerCountHotels} from "../../store/Main";
import NumberService from "../../services/number.service";
import {parseJSONPropertiesInArray} from "../../utils/json-parse-object";


export const Filter = ({updateHoleList}) => {
    const dispatch = useDispatch()
    const listFilter = useSelector(state => state.filter.listFilter)
    const bedroomCount = useSelector(state => state.filter.bedroomCount)
    const objectList = useSelector(state => state.hotels_list.objectList)
    const filteredHotels = useSelector(state => state.hotels_list.filteredHotels)
    const initFilter = useSelector(state => state.filter.initFilter)
    const typeObject = useSelector(state => state.filter.typeObject)
    const reviewScore = useSelector(state => state.filter.reviewScore)
    const distance = useSelector(state => state.filter.distance)
    const stars = useSelector(state => state.filter.stars)
    const politicalCancel = useSelector(state => state.filter.politicalCancel)
    const nutrition = useSelector(state => state.filter.nutrition)
    const shortFacilities = useSelector(state => state.filter.shortFacilities)
    const rangeValueStart = useSelector(state => state.filter.rangeValueStart)
    const rangeValueEnd = useSelector(state => state.filter.rangeValueEnd)
    const requestParameters = useSelector(state => state.search.cityOrHotel)


    useEffect(() => {
        if(!initFilter || objectList.length !== 0) {
            dispatch(initFilterHandler(true))
            dispatch(countOtherSortHandler(objectList));
            // console.log("UPDATE")
        }
    }, [])

    const handleCategoryChange = (result, idElement, idBlock, value) => {
        dispatch(chooseParamHandler({idElement: idElement, idBlock: idBlock}));

        switch (idBlock) {
            case 0:
                const newTypeObject = typeObject.includes(value)
                    ? typeObject.filter((cat) => cat !== value)
                    : [...typeObject, value];


                dispatch(typeObjectHandler(newTypeObject))

                handleFilterChange(
                    newTypeObject,
                    stars,
                    reviewScore,
                    distance,
                    politicalCancel,
                    nutrition,
                    shortFacilities,
                    result,

                );
                break;
            case 1:
                const newStars = stars.includes(value)
                    ? stars.filter((cat) => cat !== value)
                    : [...stars, value];
                dispatch(starsHandler(newStars))
                handleFilterChange(
                    typeObject,
                    newStars,
                    reviewScore,
                    distance,
                    politicalCancel,
                    nutrition,
                    shortFacilities,
                    result,

                );
                break;
            case 2:
                const newReviewScore = reviewScore.includes(value)
                    ? reviewScore.filter((cat) => cat !== value)
                    : [...reviewScore, value];
                dispatch(reviewScoreHandler(newReviewScore))
                handleFilterChange(
                    typeObject,
                    stars,
                    newReviewScore,
                    distance,
                    politicalCancel,
                    nutrition,
                    shortFacilities,
                    result,

                );
                break;
            case 3:
                const newDistance = distance.includes(value)
                    ? distance.filter((cat) => cat !== value)
                    : [...distance, value];
                dispatch(distanceHandler(newDistance))
                handleFilterChange(
                    typeObject,
                    stars,
                    reviewScore,
                    newDistance,
                    politicalCancel,
                    nutrition,
                    shortFacilities,
                    result,

                );
                break;
            case 4:
                const newPoliticalCancel = politicalCancel.includes(value)
                    ? politicalCancel.filter((cat) => cat !== value)
                    : [...politicalCancel, value];
                dispatch(politicalCancelHandler(newPoliticalCancel))
                handleFilterChange(
                    typeObject,
                    stars,
                    reviewScore,
                    distance,
                    newPoliticalCancel,
                    nutrition,
                    shortFacilities,
                    result,

                );
                break;
            case 5:
                const newNutrition = nutrition.includes(value)
                    ? nutrition.filter((cat) => cat !== value)
                    : [...nutrition, value];
                dispatch(nutritionHandler(newNutrition))
                handleFilterChange(
                    typeObject,
                    stars,
                    reviewScore,
                    distance,
                    politicalCancel,
                    newNutrition,
                    shortFacilities,
                    result,

                );
                break;
            case 6:
                const newShortFacilities = shortFacilities.includes(value)
                    ? shortFacilities.filter((cat) => cat !== value)
                    : [...shortFacilities, value];
                dispatch(shortFacilitiesHandler(newShortFacilities))
                handleFilterChange(
                    typeObject,
                    stars,
                    reviewScore,
                    distance,
                    politicalCancel,
                    nutrition,
                    newShortFacilities,
                    result,

                );
                break;
            default:
                break;
        }
    };

    const filterObjectPrice = async (array) => {
        try {
            const data = await NumberService.getAllHotelIdNumbers("hotels_map", array);
            const resultNumbers = parseJSONPropertiesInArray(data);
            const number = await filterNumbers(resultNumbers);
            return number;
        } catch (error) {
            console.error("An error occurred:", error);
            return null; // Возвращаем null в случае ошибки
        }
    }
    // //Фильтр
    const handleFilterChange = async (typeObject, stars, reviewScore, distance, politicalCancel, nutrition, shortFacilities, result) => {
        setTimeout(async () => {


            //Базовые данные
            let updatedFilteredHotels = []

            objectList.map(item => {
                updatedFilteredHotels.push(item)
            })

            // console.log("Параметры", typeObject, stars, reviewScore, distance, politicalCancel, nutrition, shortFacilities, !result);


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
                    reviewScore.includes(hotel.rating)
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

            const listNumber = await filterObjectPrice(updatedFilteredHotels.map(hotelId => hotelId.hotelId))
            const newArray = listNumber.filter(price => price.priceBase >= rangeValueStart && price.priceBase <= rangeValueEnd)
            const resultFilterObject = filterObject(updatedFilteredHotels, newArray)
            dispatch(handlerCountHotels(resultFilterObject.length))
            updateFilteredData(resultFilterObject)
        }, 0)
    }

    const updateFilteredData = (array) => {
        dispatch(countOtherSortHandler(array));
        dispatch(setFilteredHotels(array));
        updateHoleList()
    }


    const filterNumbers = async (array) => {
        const checkIn = requestParameters.checkIn
        const checkOut = requestParameters.checkOut
        const guest = requestParameters.guest.adult + requestParameters.guest.child.length
        const filteredNumbers = await array.filter(number => {
            // Проверяем диапазон дат в bookingList
            const isDateAvailable = number.bookingList.every(booking => {
                return !(checkIn >= booking.checkIn && checkIn < booking.checkOut) &&
                    !(checkOut > booking.checkIn && checkOut <= booking.checkOut);
            });
            // Проверяем количество гостей
            const isGuestCountValid = number.guestCount.length >= guest;
            return isDateAvailable && isGuestCountValid;
        });
        return filteredNumbers
    }


    const filterObjectBedRooms = async (array) => {
        try {
            const data = await NumberService.getAllHotelIdNumbers("hotels_map", array);
            const resultNumbers = parseJSONPropertiesInArray(data);
            const number = await filterNumbers(resultNumbers);
            console.log("number filters", number);
            return number;
        } catch (error) {
            console.error("An error occurred:", error);
            return null; // Возвращаем null в случае ошибки
        }
    }

    const filterObject = (array, numbers) => {
        const filterObject = array.filter(object => {
            return numbers.find(number => object.hotelId === number.hotelId);
        });
        return filterObject
    }

    const addDelBedrooms = async (action, value) => {
        //Базовые данные
        let updatedFilteredHotelsBedroom = []

        filteredHotels === null ?
            objectList.map(item => {
                updatedFilteredHotelsBedroom.push(item)

            })
            :
            filteredHotels.map(item => {
                updatedFilteredHotelsBedroom.push(item)
            })
        const listNumber = await filterObjectBedRooms(updatedFilteredHotelsBedroom.map(hotelId => hotelId.hotelId))

        if (action === 'update') {

            const bedroomSort = listNumber.filter(bedroom => bedroom.countBedrooms <= bedroomCount);
            const resultFilterObject = filterObject(updatedFilteredHotelsBedroom, bedroomSort)
            updateFilteredData(resultFilterObject)

        }
        if (action === 'add') {

            dispatch(handlerAddBedroom(value))
            const bedroomSort = listNumber.filter(bedroom => bedroom.countBedrooms <= bedroomCount + (bedroomCount === 4 ? 0 : 1));
            const resultFilterObject = filterObject(updatedFilteredHotelsBedroom, bedroomSort)
            updateFilteredData(resultFilterObject)

        }
        if (action === 'del') {
            dispatch(handlerDelBedroom(value))
            const bedroomSort = listNumber.filter(bedroom => bedroom.countBedrooms <= bedroomCount - (bedroomCount === 1 ? 0 : 1));
            const resultFilterObject = filterObject(updatedFilteredHotelsBedroom, bedroomSort)
            updateFilteredData(resultFilterObject)
        }
    }







    const handlerFocus = async (event) => {
        if (event.currentTarget) {
            //Базовые данные
            if(typeObject.length === 0 && reviewScore.length === 0 && distance.length === 0 && stars.length === 0 && politicalCancel.length === 0 && nutrition.length === 0 && shortFacilities.length === 0 ){
                const listNumber = await filterObjectPrice(objectList.map(hotelId => hotelId.hotelId))
                const newArray = listNumber.filter(price => price.priceBase >= rangeValueStart && price.priceBase <= rangeValueEnd)
                const resultFilterObject = filterObject(objectList, newArray)
                updateFilteredData(resultFilterObject)
            } else {
                handleFilterChange(
                    typeObject,
                    stars,
                    reviewScore,
                    distance,
                    politicalCancel,
                    nutrition,
                    shortFacilities,
                    false,
                );
            }
        }

    }
    //
    // useEffect(() => {
    //     const checkedArray = []
    //     listFilter.map(item => {
    //         item.options.map(opt => {
    //             if (opt.result === true) {
    //                 checkedArray[0] = opt.result
    //             }
    //         })
    //
    //     })
    //
    //     if (checkedArray[0] === undefined) {
    //         dispatch(setFilteredHotels(null));
    //     } else {
    //         console.log("Фильтр еще не пуст");
    //     }
    // }, [handleFilterChange, handleCategoryChange, listFilter])

    const resetParamsHandler = () => {
        dispatch(resetParamHandler())
        dispatch(setFilteredHotels(null))
        dispatch(countOtherSortHandler(objectList));
        updateHoleList()
    }


    return (
        <div>
            <div className="column laptop__907__filter"
                 style={{
                     background: WHITE,
                     width: "240px",
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
                    <RangePrice handlerFocus={handlerFocus}/>
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
                                {option.result ? "" : option.count}
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
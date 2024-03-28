import {WHITE} from "../../theme/colors";
import {Rating} from "../cards/Rating";
import {useEffect, useState} from "react";
import RatingService from "../../services/rating.service";

export const GuestRating = ({hotelId}) => {
    const [rating, setRating] = useState(0)
    const [ratingObject, setRatingObject] = useState(null);
    const [ratingCount, setRatingCount] = useState([]);

// Функция для округления числа до одной цифры после запятой или целого числа
    const roundToOneDecimal = (num) => Math.round(num * 10) / 10;

    const calculateTotalRating = (ratings) => {
        const totalRating = Object.values(ratings).reduce((acc, curr) => acc + curr, 0);
        const averageRating = totalRating / Object.keys(ratings).length;
        return roundToOneDecimal(averageRating);
    };

    useEffect(() => {
        if (!ratingObject) {
            RatingService.getAllRatingObject(hotelId)
                .then(data => {
                    if(data.data.length !== 0) {
                        setRatingCount(data.data)
                        const ratings = data.data.reduce((acc, item, index, array) => {
                            acc.cleanliness = (acc.cleanliness || 0) + item.cleanliness / array.length;
                            acc.mood = (acc.mood || 0) + item.mood / array.length;
                            acc.timelyCheckIn = (acc.timelyCheckIn || 0) + item.timelyCheckIn / array.length;
                            acc.priceQuality = (acc.priceQuality || 0) + item.priceQuality / array.length;
                            acc.photoMatch = (acc.photoMatch || 0) + item.photoMatch / array.length;
                            acc.qualityService = (acc.qualityService || 0) + item.qualityService / array.length;
                            return acc;
                        }, {});

                        Object.keys(ratings).forEach(key => {
                            ratings[key] = roundToOneDecimal(ratings[key]);
                        });

                        // Вызов функции для расчета общего рейтинга и сохранение результата в локальную переменную rating
                        const totalRating = calculateTotalRating(ratings);
                        setRating(totalRating);
                        setRatingObject(ratings);
                    } else {
                        const ratings = {
                            cleanliness: 0,
                            mood: 0,
                            timelyCheckIn: 0,
                            priceQuality: 0,
                            photoMatch: 0,
                            qualityService: 0
                        }
                        setRating(0);
                        setRatingObject(ratings);
                    }

                })
                .catch(error => console.log(error));
        }
    }, []);

    const nameRating = [
        {name: "Чистота", value: "cleanliness"},
        {name: "Расположение", value: "mood"},
        {name: "Своевременность заселения", value: "timelyCheckIn"},
        {name: "Цена - качество", value: "priceQuality"},
        {name: "Соответствие фото", value: "photoMatch"},
        {name: "Качество обслуживания", value: "qualityService"},
    ]

    return (
        <div
            className=""
            style={{
                background: WHITE,
                borderRadius: "20px",
                padding: "20px",
                height: "100%",
                marginBottom: "40px"
            }}
        >
            <span className="text__content__black__b__20" style={{marginBottom: "15px"}}
            >
                Оценка гостей
            </span>
            <div className="row__sb__c">
                <div style={{marginLeft: "25px", marginRight: "25px"}}>
                    <Rating
                        rating={rating}
                        countReviews={ratingCount.length}
                    />
                </div>

                <div className="main__block">
                    {ratingObject && Object.keys(ratingObject).map((key, index) => (
                        <div key={index} className="ratingItem">
                            <div className="lineRating mt__mr">
                                <div className="filledLine mt__mr" style={{width: `${(ratingObject[key] - 5) * 20}%`}}></div>
                                <div className="row__sb__c mt__mr">
                                    <span className="text__content__black__14">{nameRating.find(item => item.value === key).name}</span>
                                    <span className="text__content__black__14">{ratingObject[key]}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
import {Rating} from "../cards/Rating";
import "./Review.css"
import {GREEN, RED} from "../../theme/colors";
import {Icon24AddCircleOutline, Icon28RemoveCircleOutline} from "@vkontakte/icons";
import {useEffect, useState} from "react";
import BookingService from "../../services/booking.service";
import {parseJSONProperties} from "../../utils/json-parse-object";

export const Review = ({
                           bookingId,
                           cleanliness,
                           date,
                           mood,
                           flaws,
                           dignity,
                           priceQuality,
                           qualityService,
                           timelyCheckIn,
                           photoMatch
                       }) => {
    const [booking, setBooking] = useState(null)


    useEffect(() => {
        if (!booking) {
            BookingService.getBooking(bookingId)
                .then(data => setBooking(parseJSONProperties(data)))
        }
    }, [])


    const ratings = {
        cleanliness: Number(cleanliness),
        mood: Number(mood),
        timelyCheckIn: Number(timelyCheckIn),
        priceQuality: Number(priceQuality),
        photoMatch: Number(photoMatch),
        qualityService: Number(qualityService)
    };

    const calculateTotalRating = (ratings) => {
        const totalRating = Object.values(ratings).reduce((acc, curr) => acc + curr, 0);
        const averageRating = totalRating / Object.keys(ratings).length;
        const roundedRating = Math.round(averageRating * 10) / 10; // Округление до одной цифры после точки
        return roundedRating;
    };

    const rating = calculateTotalRating(ratings);

    const nameRating = [
        {name: "Чистота", value: "cleanliness"},
        {name: "Расположение", value: "mood"},
        {name: "Своевременность заселения", value: "timelyCheckIn"},
        {name: "Цена - качество", value: "priceQuality"},
        {name: "Соответствие фото", value: "photoMatch"},
        {name: "Качество обслуживания", value: "qualityService"},
    ]


    return (
        <div className="column"
             style={{
                 height: "100%",
                 marginBottom: "40px"
             }}>
            <div className="row__sb__c header__review">
                <span className="text__content__white__b__15 pl">{booking?.name}</span>
                <span className="text__content__orange__b__16 ml__mr_10">
                        {date}
                    </span>
            </div>
            <div className="row__fs__fs review__block">
                <div className="column__sb__c block__booking__info">
                    <div>
                        <Rating
                            rating={rating}
                            type={"review"}
                            countReviews={0}
                        />
                        <span className="text__content__white__12"
                              style={{
                                  textAlign: "center",
                                  display: "flex",
                                  justifyContent: "center",
                                  wordBreak: "break-word"
                              }}>
                            {booking?.nameNumber}
                        </span>
                    </div>

                </div>
                <div className="column__fs block__review__info">
                    <div className="main__block pr_pl_5" style={{marginTop: 15}}>
                        {ratings && Object.keys(ratings).map((key, index) => (
                            <div key={index} className="ratingItem">
                                <div className="lineRating mt__mr">
                                    <div className="filledLine mt__mr"
                                         style={{width: `${(ratings[key] - 5) * 20}%`}}></div>
                                    <div className="row__sb__c mt__mr">
                                        <span
                                            className="text__content__black__14">{nameRating.find(item => item.value === key).name}</span>
                                        <span className="text__content__black__14">{ratings[key]}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row__c__fs mt__mr__20 pr_pl_5">
                        <Icon24AddCircleOutline color={GREEN}/>
                        <span className="text__content__black__b__14 ml__mr_10 pr_pl_5">Достоинства</span>
                    </div>
                    <span className="text__content__black__12 ml__mr_10 pr_pl_5" style={{wordBreak: "break-word"}}>
                        {dignity}
                    </span>
                    <div className="row__c__fs mt__mr__20 pr_pl_5">
                        <Icon28RemoveCircleOutline width={24} height={24} color={RED}/>
                        <span className="text__content__black__b__14 ml__mr_10 pr_pl_5">Недостатки</span>
                    </div>
                    <span className="text__content__black__12 ml__mr_10 pr_pl_5" style={{wordBreak: "break-word"}}>
                        {flaws}
                    </span>
                </div>
            </div>
        </div>
    )
}
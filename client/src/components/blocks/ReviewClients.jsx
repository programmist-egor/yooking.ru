import {Review} from "../review/Review";
import {useEffect, useState} from "react";
import RatingService from "../../services/rating.service";


export const ReviewClients = ({hotelId}) => {
    const [ratingObject, setRatingObject] = useState(null);


    useEffect(() => {
        if (!ratingObject) {
            RatingService.getAllRatingObject(hotelId)
                .then(data => {
                    if (data.data.length !== 0) {
                        setRatingObject(data.data)
                    }
                })
        }
    },[])

    return (
        <div
            className="column__fs"
            style={{
                borderRadius: "20px",
                padding: "20px",
                height: "100%",
                marginBottom: "40px"
            }}
        >
            <span
                className="text__content__black__b__20"
                style={{marginBottom: "15px"}}
            >
                Отзывы
            </span>
            <div className="row__c__c"
                 style={{marginTop: "30px", marginBottom: "30px"}}
            >
                {
                    ratingObject && ratingObject.length !== 0 ?
                        ratingObject.map(review => {
                            return (
                                <Review
                                    bookingId={review.bookingId}
                                    cleanliness={review.cleanliness}
                                    mood={review.mood}
                                    timelyCheckIn={review.timelyCheckIn}
                                    priceQuality={review.priceQuality}
                                    photoMatch={review.photoMatch}
                                    qualityService={review.qualityService}
                                    dignity={review.dignity}
                                    flaws={review.flaws}
                                    date={review.date}
                                />
                            )
                        })

                        :
                        <h2 className="text__content__grey__16">Еще нет отзывов</h2>
                }


            </div>
        </div>
    )
}
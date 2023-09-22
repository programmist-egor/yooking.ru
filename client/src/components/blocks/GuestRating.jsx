import {WHITE} from "../../theme/colors";
import {Rating} from "../cards/Rating";

export const GuestRating = ({dataHotelNumber}) => {
    return (
        <div
            className="column__fs"
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
                        rating={dataHotelNumber.rating}
                        countReviews={dataHotelNumber.countReviews.length}
                    />
                </div>

                <div className="column__sb__fs" style={{ marginLeft: "15px", marginRight: "15px"}}>
                    <span className="text__content__black__16" style={{ marginTop: "15px", marginBottom: "15px"}}>Чистота</span>
                    <span className="text__content__black__16" style={{ marginTop: "15px", marginBottom: "15px"}}>Расположение</span>
                    <span className="text__content__black__16" style={{ marginTop: "15px", marginBottom: "15px"}}>
                            Своевременность заселения
                        </span>
                </div>
                <div className="column__sb__c" >
                    <div className="lineRating" style={{ marginTop: "25px", marginBottom: "25px"}}/>
                    <div className="lineRating" style={{ marginTop: "25px", marginBottom: "25px"}}/>
                    <div className="lineRating" style={{ marginTop: "25px", marginBottom: "25px"}}/>
                </div>
                <div className="column__sb__c" style={{ marginLeft: "15px", marginRight: "15px"}}>
                    <span className="text__content__black__b__16" style={{ marginTop: "20px", marginBottom: "20px"}}>10</span>
                    <span className="text__content__black__b__16" style={{ marginTop: "20px", marginBottom: "20px"}}>10</span>
                    <span className="text__content__black__b__16" style={{ marginTop: "20px", marginBottom: "20px"}}>10</span>
                </div>
                <div className="column__sb__fs" style={{ marginLeft: "15px", marginRight: "15px"}}>
                    <span className="text__content__black__16" style={{ marginTop: "15px", marginBottom: "15px"}}>Цена - качество</span>
                    <span className="text__content__black__16" style={{ marginTop: "15px", marginBottom: "15px"}}>Соответсвие фото</span>
                    <span className="text__content__black__16" style={{ marginTop: "15px", marginBottom: "15px"}}>
                            Качество обслуживания
                        </span>
                </div>
                <div className="column__sb__c" >
                    <div className="lineRating" style={{ marginTop: "25px", marginBottom: "25px"}}/>
                    <div className="lineRating" style={{ marginTop: "25px", marginBottom: "25px"}}/>
                    <div className="lineRating" style={{ marginTop: "25px", marginBottom: "25px"}}/>
                </div>
                <div className="column__sb__c" style={{ marginLeft: "15px", marginRight: "15px"}}>
                    <span className="text__content__black__b__16" style={{ marginTop: "20px", marginBottom: "20px"}}>10</span>
                    <span className="text__content__black__b__16" style={{ marginTop: "20px", marginBottom: "20px"}}>10</span>
                    <span className="text__content__black__b__16" style={{ marginTop: "20px", marginBottom: "20px"}}>10</span>
                </div>
            </div>
        </div>
    )
}
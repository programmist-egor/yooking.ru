import {WHITE} from "../../theme/colors";

export const DescriptionHotel = ({dataHotelNumber}) => {
    return (
        <div
            className="column__fs"
            style={{
                background: WHITE,
                borderRadius: "20px",
                padding: "20px",
                height: "100%",
                marginBottom: "40px",

            }}
        >
            <span className="text__content__black__b__20" style={{marginBottom: "15px"}}>
                Описание объекта
            </span>
            <p className="text__content__black__16">
                {dataHotelNumber?.description}
            </p>
        </div>
    )
}
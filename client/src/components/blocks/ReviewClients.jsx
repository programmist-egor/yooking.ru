import {WHITE} from "../../theme/colors";

export const ReviewClients = () => {
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
                style={{
                    marginBottom: "15px"
                }}
            >
                Отзывы
            </span>
            <div className="row__c__c"
                 style={{marginTop: "30px", marginBottom: "30px"}}
            >
                <h2 className="text__content__grey__16">Еще нет озывов</h2>
            </div>
        </div>
    )
}
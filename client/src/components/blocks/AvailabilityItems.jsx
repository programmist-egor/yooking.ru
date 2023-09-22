
import {Link} from "react-router-dom";
import {Button} from "../buttons/Button";

export const AvailabilityItems = ({header, id, img, text, date, price, content}) => {
    return (
        <div
            className="row__sb__c availability__items"
            key={id}
        >
            <div className="row__fs__fs">
                <img
                    src={img}
                    alt={id}
                    width={200}
                    height={130}
                />
                <div
                    className="column__sb__fs"
                    style={{
                        marginLeft: "20px"
                    }}
                >
                    <>
                    <span
                        className="text__content__black__b__24"
                        style={{marginBottom: "5px"}}
                    >{header}</span>
                    <span className="text__content__grey__14">{text}</span>
                    </>
                    <span
                        className="text__content__black__b__20"
                        style={{
                            marginTop: "40px"
                        }}
                    >{content}</span>
                </div>
            </div>
            <div className="column__sb__fe">
                <div
                    className="column__fe"
                    style={{
                        marginBottom: "30px"
                    }}
                >
                    <span className="text__content__black__b__24">{price}</span>
                    <span className="text__content__grey__14">{date}</span>
                </div>
                <div
                    className="row__sb__c"
                    style={{
                        width: "100%"
                    }}
                >
                    <Link
                        to={"/Отели_на_карте"}
                        style={{

                        }}
                    >
                        <Button
                            style={"moreButton"}
                            styleText={"text__content__black__16"}
                            padding={10}
                            handler={() => console.log("Подробнее")}
                            name={"Подробнее"}/>
                    </Link>
                    <div className="null">---</div>
                    <Link
                        to={"/Отели_на_карте"}
                        style={{

                        }}
                    >
                        <Button
                            style={"bookButton"}
                            styleText={"text__content__white__16"}
                            padding={10}
                            handler={() => console.log("Забронировать")}
                            name={"Забронировать"}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}
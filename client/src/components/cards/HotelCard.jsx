import {Button} from "../buttons/Button";
import metro from "../../img/metro.png"
import {GREY_BLACK, ORANGE, WHITE} from "../../theme/colors";
import {Rating} from "./Rating";
import {SliderMini} from "../slider/SliderMini";

export const HotelCard = () => {
    return (
        <div
            className="row__c__fs"
            style={{
                background: WHITE,
                borderRadius: "20px",
                height: "260px",
            }}
        >
            {/*SLIDER*/}
            <SliderMini/>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "space-between",
                    flexGrow: 2,
                    margin: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <div className="column__fs">
                        <span className="text__content__black__b__24 ">Гельвеция</span>
                        <span className="text__content__black__12 marginsCards" style={{marginLeft: 0}}>ул. Марта 11  -  3 км до центра</span>
                        <div className="row__c__fs">
                            <img src={metro} alt="metro"/>
                            <span className="text__content__grey__12 marginsCards">Маяковская 250 м</span>
                        </div>
                        <div className="row__c__fs">
                            <img src={metro} alt="metro"/>
                            <span className="text__content__grey__12 marginsCards">Владимирская 600 м</span>
                        </div>

                        <Button
                            name={"Показать на карте"}
                            marginLeft={"0"}
                            marginTop={"10px"}
                            height={"20px"}
                            style={"showOnMapBtn"}
                            styleText={"text__content__white__14"}
                            color={GREY_BLACK}
                            handler={() => console.log("Показать на карте")}
                        />
                    </div>
                    {/*Оценка отеля*/}
                    <div className="column__c">
                        <Rating/>
                        <div className="row__c__c price__card">
                            <span className="text__content__white__b__15">От 17 560 ₽</span>
                        </div>
                    </div>
                </div>

                    <Button
                        name={"Выбрать свободный номер"}
                        marginLeft={"0"}
                        style={"chooseHotelBtn"}
                        marginTop={"35px"}
                        styleText={"text__content__white__15"}
                        handler={() => console.log("Выбрать свободный номер")}
                        height={"20px"}/>

            </div>
        </div>
    )
}
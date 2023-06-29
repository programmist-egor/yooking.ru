import {Icon24SlidersVerticalOutline} from '@vkontakte/icons';
import {BLACK, WHITE} from "../../theme/colors";
import {RangePrice} from "../inputs/RangePrice";
import {useSelector} from "react-redux";
import {ButtonCounter} from "../buttons/ButtonCounter";
import {Button} from "../buttons/Button";

export const Filter = () => {
    const listFilter = useSelector(state => state.filter.listFilter)
    const countBedrooms = useSelector(state => state.filter.countBedrooms)
    return (
        <div
            className="column__fs filter"
        >
            <div className="row__c__fs">
                <Icon24SlidersVerticalOutline color={BLACK}/>
                <span
                    className="text__content__black__b__24"
                    style={{
                        marginLeft: "10px"
                    }}
                >
                    Параметры
                </span>
            </div>
            <h4 className="text__content__black__b__20">
                Цена
            </h4>
            <RangePrice/>
            {listFilter.map(item => (
                <div
                    className="column__fs"
                    key={item.id}
                >
                    <h4 className="text__content__black__b__20">
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
                                    onChange={() => console.log(option.name)}
                                    checked={option.result}
                                    style={{
                                        marginTop: "8px",
                                        width: "20px",
                                        height: "20px"
                                    }}
                                    // onChange={e => setSomething(e.target.checked)}
                                />
                                <span
                                    className="text__content__black__16"
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
            <h4 className="text__content__black__b__20">
                Количество спален
            </h4>
            <div className="row__sb__c">
                <span className="text__content__black__16">
                  Спальни
                </span>
                <ButtonCounter
                    count={countBedrooms}
                />
            </div>
            <Button
                name={"Сбросить параметры"}
                style={"greyBtn"}
                handler={() => console.log("Сбросить параметры")}
                padding={"10%"}
                styleText={"text__content__white__16"}
                marginLeft={"0"}
                marginTop={"60px"}
            />
        </div>
    )
}
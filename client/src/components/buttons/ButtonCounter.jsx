import { Icon24MinusOutline, Icon24Add } from '@vkontakte/icons';
import {BLACK} from "../../theme/colors";

export const ButtonCounter = ({count}) => {
    return (
        <div className="row__sb__c counterBtn">
            <span
                onClick={() => console.log("DEL")}
                style={{
                    cursor: "pointer"
                }}
            >
                <Icon24MinusOutline color={BLACK}/>
            </span>
            <span className="text__content__black__b__20">{count}</span>
            <span
                onClick={() => console.log("ADD")}
                style={{
                    cursor: "pointer"
                }}
            >
                <Icon24Add color={BLACK}/>
            </span>
        </div>
    )
}
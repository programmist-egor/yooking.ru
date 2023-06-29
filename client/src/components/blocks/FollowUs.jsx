import {Button} from "../buttons/Button";
import {InputFollow} from "../inputs/InputFollow";

export const FollowUs = () => {
    return (
        <div
            className="column__c followUs__block"
            style={{
                paddingLeft: "25%",
                paddingRight: "25%"
            }}
        >
            <div className="row__c__c">
                <h2 className="text__content__black__b__32">Следите за новостями и скидками!</h2>
            </div>
            <div
                className="row__sa__c"
                style={{
                    width: "100%",
                }}
            >
                <InputFollow
                    value={""}
                    handler={() => console.log("onChange")}
                />
                <Button
                    name={"Подписаться"}
                    styleText={"text__content__white__20"}
                    style={"greyBtn"}
                    handler={() => console.log("Подписаться")}
                />
            </div>
        </div>
    )
}
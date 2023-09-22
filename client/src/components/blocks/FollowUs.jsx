import {Button} from "../buttons/Button";
import {InputFollow} from "../inputs/InputFollow";
import {useDispatch, useSelector} from "react-redux";
import {handlerFollowUs, handlerResultFollow} from "../../store/Main";
import {GREEN, RED} from "../../theme/colors";

export const FollowUs = () => {
    const dispatch = useDispatch()
    const followUs = useSelector(state => state.main.followUs);
    const resultFollow = useSelector(state => state.main.resultFollow);

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const follow = () => {
        if (validateEmail(followUs) && followUs !== "") {
            dispatch(handlerFollowUs(""))
            dispatch(handlerResultFollow("Вы подписались!"))
            setTimeout(() => {
                dispatch(handlerResultFollow(""))
            }, 5000)
        } else {
            dispatch(handlerResultFollow("Ошибка! Проверьте EMAIL!"))
            setTimeout(() => {
                dispatch(handlerResultFollow(""))
            }, 5000)
        }
    }


    return (
        <div>
            <div
                className="column__c followUs__block desktop__follow__us__block"
                style={{
                    paddingLeft: "25%",
                    paddingRight: "25%",
                    paddingBottom: "20px"
                }}
            >
                <div className="row__c__c">
                    <h2 className="text__content__black__b__26">Следите за новостями и скидками!</h2>
                </div>
                <div className="row__sa__c" style={{width: "80%",}}>
                    <InputFollow/>
                    <Button
                        name={"Подписаться"}
                        styleText={"text__content__white__16"}
                        style={"greyBtn"}
                        handler={() => follow()}
                    />
                </div>
                {resultFollow === "Вы подписались!" ?
                    <span className={"text__content__white__14"}
                          style={{color: GREEN, marginTop: "10px"}}>{resultFollow}</span> :
                    <span className={"text__content__white__14"}
                          style={{color: RED, marginTop: "10px"}}>{resultFollow}</span>}
            </div>

            <div
                className="column__c followUs__block tablet__0_920__follow__us__block"
                style={{
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    paddingBottom: "20px"
                }}
            >
                <div className="row__c__c">
                    <h2 className="text__content__black__b__16">Следите за новостями и скидками!</h2>
                </div>
                <div
                    className="row__sa__c"
                    style={{
                        width: "80%",
                    }}
                >
                    <InputFollow/>
                    <Button
                        name={"Подписаться"}
                        styleText={"text__content__white__14"}
                        style={"greyBtn"}
                        padding={"5px"}
                        handler={() => follow()}
                    />
                </div>
                {resultFollow === "Вы подписались!" ?
                    <span className={"text__content__white__14"}
                          style={{color: GREEN, marginTop: "10px"}}>{resultFollow}</span> :
                    <span className={"text__content__white__14"}
                          style={{color: RED, marginTop: "10px"}}>{resultFollow}</span>}
            </div>
        </div>
    )
}
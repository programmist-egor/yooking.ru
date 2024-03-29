import {BLACK, GREEN, GREY, GREY_BLACK, RED, WHITE} from "../../theme/colors";
import React, {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import InputMask from "react-input-mask";
import { Icon24Done} from "@vkontakte/icons";
import {ButtonIcon} from "../buttons/ButtonIcon";
import UsersService from "../../services/users.service";
import {Button} from "../buttons/Button";


export const EditUserContactData = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [saveData, setSaveData] = useState(false);
    const userId = useSelector((state) => state.auth.userId);
    const [nameValue, setNameValue] = useState("")
    const [city, setCity] = useState("")
    const [lastNameValue, setLastNameValue] = useState("")
    const [phoneUser, setPhoneUser] = useState("")
    const [emailUser, setEmailUser] = useState("")
    const [isConfirmPhone, setIsConfirmPhone] = useState(false);
    const [confirmPhone, setConfirmPhone] = useState(true);
    const [codeConfirmForPhone, setCodeConfirmForPhone] = useState("");
    const [codeConfirmForPhoneInput, setCodeConfirmForPhoneInput] = useState("");
    const [userYooking, setUserYooking,] = useState({})
    const [msg, setMsg] = useState("")


    const updateUserExtranet = () => {
        UsersService.getUserYooking("edit_user", userId)
            .then(data => {
                setUserYooking(data)
                console.log("data", data);
                setNameValue(data.name)
                setCity(data.city)
                setLastNameValue(data.lastName)
                setPhoneUser(data.phone)
                setEmailUser(data.email)
                setIsConfirmPhone(data.isConfirmPhone)
                setCodeConfirmForPhone(data.codeConfirmForPhone)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (nameValue === "" || lastNameValue === "" || phoneUser === "" || emailUser === "") {
            updateUserExtranet()
        }


    }, [])

    const setNameInputChange = (e) => {
        setNameValue(e.target.value)
    }
    const setLastNameInputChange = (e) => {
        setLastNameValue(e.target.value)
    }
    const setCityInputChange = (e) => {
        setCity(e.target.value)
    }
    const setCodeConfirm = (e) => {
        setCodeConfirmForPhoneInput(e.target.value)
    }
    console.log(codeConfirmForPhone);
    console.log("codeConfirmForPhoneInput",codeConfirmForPhoneInput);

    const sendCodeConfirm = () => {
        setConfirmPhone(false)
        UsersService.generateCode("edit_user",userId)
            .then(data => console.log(data))
            .catch(e => console.log(e))
            .finally(() => updateUserExtranet())
    }
    const codeConfirm = () => {
        const dataUserYooking = {
            ...userYooking,
            isConfirmPhone: true
        }
        console.log("dataUserYooking",dataUserYooking);
        if (codeConfirmForPhone === +codeConfirmForPhoneInput) {
            UsersService.updateUserYooking("edit_user", userId, dataUserYooking)
                .then(data => console.log("DATA UPDATE CONFIRM PHONE", data))
                .catch(e => console.log(e))
                .finally(() => updateUserExtranet())
        } else {
            console.log("Код не совпадает");
        }
    }
    const saveSettingProfile = () => {
        const dataUserYooking = {
            ...userYooking,
            name: nameValue,
            lastName: lastNameValue,
            city: city,
        }
        UsersService.updateUserYooking("edit_user", userId, dataUserYooking)
            .then(() => setMsg("Данные сохранены!"))
            .catch(() => setMsg("Ошибка при сохранении!"))
            .finally(() => updateUserExtranet())
    }


    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className="column__c__c" style={{margin: "2%"}}>
            <div className="center column__c__c">
                <div className="column width__center__660">
                    <div className="column" style={{height: "100%", background: WHITE, padding: 10}}>
                        <div className="row__c__fs mt__mr">
                            <span className="text__content__black__b__20">Настройки</span>
                        </div>
                        <div className="row__sb__c ">
                            <div className="column__fs">
                                    <span className="text__content__grey__12 mt__mb__5"><span
                                        style={{color: RED}}>*</span> Имя</span>
                                <input
                                    type="text"
                                    id="nameSetting"
                                    required={true}
                                    placeholder="Ваше имя"
                                    className="inputRegObj"
                                    value={nameValue}
                                    style={{color: BLACK}}
                                    onChange={(e) => setNameInputChange(e)}
                                />
                            </div>
                            <div className="column__fs">
                                    <span className="text__content__grey__12 mt__mb__5"><span
                                        style={{color: RED}}>*</span> Фамилия</span>
                                <input
                                    type="text"
                                    id="lastNameSetting"
                                    required={true}
                                    placeholder="Ваша фамилия"
                                    className="inputRegObj"
                                    style={{color: BLACK}}
                                    value={lastNameValue}
                                    onChange={(e) => setLastNameInputChange(e)}
                                />
                            </div>

                        </div>
                        <div className="row__sb__c ">
                            <div className="column__fs">
                                    <span className="text__content__grey__12 mt__mb__5"><span
                                        style={{color: RED}}>*</span> Фамилия</span>
                                <input
                                    type="text"
                                    id="citySetting"
                                    required={true}
                                    placeholder="Ваш город"
                                    className="inputRegObj"
                                    style={{color: BLACK}}
                                    value={city}
                                    onChange={(e) => setCityInputChange(e)}
                                />
                            </div>
                            <div className="column__fs">
                                    <span className="text__content__grey__12 mt__mb__5"><span
                                        style={{color: RED}}>*</span> Email</span>
                                <input
                                    value={emailUser}
                                    // onChange={handleChange}
                                    id="emailObjSetting"
                                    type="email"
                                    placeholder="Введите Email"
                                    style={{color: emailUser !== "" ? GREY : BLACK}}
                                    disabled={emailUser !== "" ? true : false}
                                    className={"inputRegObj"}
                                />

                            </div>
                        </div>
                        <div className="row__sb__c ">
                            <div className="column__fs">
                                    <span className="text__content__grey__12 mt__mb__5"><span
                                        style={{color: RED}}>*</span> Номер телефона</span>
                                <InputMask
                                    id="phoneObjSetting"
                                    value={phoneUser}
                                    // onChange={(e) => handleChange(e)}
                                    type="tel"
                                    style={{color: phoneUser !== "" ? GREY : BLACK}}
                                    mask="+79999999999"
                                    placeholder="+79999999999"
                                    disabled={phoneUser !== "" ? true : false}
                                    className={"inputRegObj"}
                                />
                            </div>



                        </div>
                        {isConfirmPhone ?
                            <span className="text__content__grey__12" style={{color: GREEN}}>Номер телефона
                                подтвержден</span>
                            :
                            confirmPhone ?
                                <div className="column__fs">
                                    <span className="text__content__grey__12" style={{color: RED}}>* Номер телефона не
                                        подтвержден</span>
                                    <p
                                        onClick={() => sendCodeConfirm()}
                                        style={{cursor: "pointer"}}
                                        className="text__content__grey__b__12">
                                        Подтвердить номер?
                                    </p>
                                </div>
                                :
                                <div className="column">
                                    <div className="column">
                                        <input
                                            value={codeConfirmForPhoneInput}
                                            onChange={(e) => setCodeConfirm(e)}
                                            id="emailObjSetting"
                                            type="number"
                                            placeholder="Введите код"
                                            style={{color: BLACK}}
                                            className={"inputRegObj"}
                                        />
                                        <p className="text__content__grey__12" style={{color: GREY}}>
                                            На вашу почту <span
                                            className="text__content__grey__b__12">{emailUser}</span> отправлен код!
                                        </p>
                                        <div className="row__c__fs" style={{marginLeft: -10}}>
                                            <Button
                                                name={"Подтвердить"}
                                                style={"cancelBookingBtn"}
                                                styleText={"text__content__white__14"}
                                                handler={() => codeConfirm()}
                                            />
                                            <Button
                                                name={"Отмена"}
                                                style={"cancelBookingBtn"}
                                                color={GREY_BLACK}
                                                styleText={"text__content__white__14"}
                                                handler={() => setConfirmPhone(true)}
                                            />
                                        </div>
                                    </div>
                                </div>
                        }

                        <Button
                            name={"Сменить пароль"}
                            style={"changePasswordButton"}
                            marginTop={20}
                            styleText={"text__content__white__14"}
                            handler={() => console.log("Сменить пароль")}
                        />
                        <div className="row__c__c" style={{marginBottom: "25px",  marginTop: "25px"}}>
                            <ButtonIcon
                                handler={() => saveSettingProfile()}
                                icon={<Icon24Done color={WHITE}/>}
                                style={"changePasswordButton"}
                                name={"Сохранить"}
                                styleText={"text__content__white__14"}
                                width={width >= 0 && width <= 530 ? "280px" : "300px"}
                            />
                            <div className="row__c__c">
                                {saveData ?
                                    <span className="text__content__black__12"
                                          style={{marginTop: "5px", marginBottom: "5px", textAlign: "center", color: GREEN}}>Данные сохранены!</span>
                                    :
                                    ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
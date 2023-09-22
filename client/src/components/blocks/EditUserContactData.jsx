import {RED, WHITE} from "../../theme/colors";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import InputMask from "react-input-mask";
import {
    dateClientHandler,
    checkHandler, finishedBookingHandler, setClientHandler,
} from "../../store/ClientData";
import {Icon24BriefcaseOutline, Icon24Done} from "@vkontakte/icons";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {ref, update} from "firebase/database";
import {database} from "../../firebase";


export const EditUserContactData = () => {
    const dispatch = useDispatch()
    const clientData = useSelector(state => state.client__data.dateClient)
    const [checkPhone, setCheckPhone] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkName, setCheckName] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    const nameOnChange = (e) => {
        dispatch(setClientHandler({id: "name", value: e.target.value}))
    }
    const phoneOnChange = (e) => {
        dispatch(setClientHandler({id: "phone", value: e.target.value}))
    }
    const emailOnChange = (e) => {
        dispatch(setClientHandler({id: "email", value: e.target.value}))
    }
    const passOnChange = (e) => {
        dispatch(setClientHandler({id: "pass", value: e.target.value}))
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

    const saveHandler = async (name, phone, email) => {
        if (clientData.name !== "") {
            setTimeout(() => {
                setCheckName(false)
            }, 5000)
        } else {
            setCheckName(true)
        }
        const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        if (regex.test(clientData.phone)) {
            setTimeout(() => {
                setCheckPhone(false)
            }, 5000)
        } else {
            setCheckPhone(true)
        }
        if (validateEmail(clientData.email) && clientData.email !== "") {
            setTimeout(() => {
                setCheckEmail(false)
            }, 5000)
        } else {
            setCheckEmail(true)
        }

        //Завершение бронирования
        dispatch(checkHandler(true))
        //Открытие модульного окна об бронировании
        dispatch(finishedBookingHandler(true))

        // dispatch(checkHandler(false))
       await update(ref(database, `/usersData/${clientData.userid}`), {
            name: name,
            phone: phone,
            email: email,
        })

    }

    return (
        <div className="column__c__c" style={{marginLeft: "2%", marginRight: "2%"}}>
            <div className="column__c__c contact__block">

                <h3>Ваши контактные данные</h3>

                <label>
                    <span className="text__content__grey__12"><span
                        style={{color: RED}}>*</span> Обязательное поле</span>
                    <input
                        type="text"
                        required={true}
                        placeholder="Ваше имя"
                        className="inputEditUser"
                        value={clientData.name}
                        onChange={nameOnChange}
                    />
                </label>

                <label >
                    <span className="text__content__grey__12"><span
                        style={{color: RED}}>*</span> Обязательное поле</span>
                    <InputMask
                        value={clientData.phone}
                        className="inputEditUser "
                        onChange={(e) => phoneOnChange(e)}
                        mask="+7 (999) 999-99-99"
                        placeholder="+7 (999) 999-99-99"
                    />
                </label>

                <label>
                    <span className="text__content__grey__12"><span
                        style={{color: RED}}>*</span> Обязательное поле</span>
                    <input
                        type="email"
                        required={true}
                        placeholder="Ваше email"
                        className="inputEditUser"
                        value={clientData.email}
                        onChange={emailOnChange}
                    />
                </label>
                <div className="row__fs__fs">
                    <h4>Изменить пароль</h4>
                </div>
                    <input
                        type="password"
                        required={true}
                        placeholder="Старый пароль"
                        className="inputEditUser"
                        value={oldPassword}
                        onChange={passOnChange}
                    />

                    <input
                        type="password"
                        required={true}
                        placeholder="Новый пароль"
                        className="inputEditUser"
                        value={newPassword}
                        onChange={passOnChange}
                    />


                {checkPhone ?
                    <span className="text__content__black__b__14"
                          style={{
                              marginTop: "5px",
                              marginBottom: "5px",
                              color: RED
                          }}>Некорректный номер телефона</span>
                    :
                    ""
                }
                {checkEmail ?
                    <span className="text__content__black__b__14"
                          style={{marginTop: "5px", marginBottom: "5px", color: RED}}>Некорректный email</span>
                    :
                    ""
                }
                {checkName ?
                    <span className="text__content__black__b__14"
                          style={{marginTop: "5px", marginBottom: "5px", color: RED}}>Вы не указали свое имя</span>
                    :
                    ""
                }
                <div style={{marginBottom: "25px", marginTop: "25px"}}>
                    <ButtonIcon
                        handler={() => saveHandler(clientData.name, clientData.phone, clientData.email)}
                        icon={<Icon24Done color={WHITE}/>}
                        style={"doneBtn"}
                        name={"Сохранить"}
                        styleText={"text__content__white__16"}
                        width={width >= 0 && width <= 530 ? "280px" : "300px"}
                    />
                </div>
            </div>
        </div>
    )
}
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useFormik} from "formik";
import InputMask from "react-input-mask";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import {RED} from "../../theme/colors";
import {basicSchema} from "../../validation/password";
import AuthService from "../../services/auth.service";
import {getCurrentDate} from "../../utils/createDataNow";
import {v4 as uuidv4} from 'uuid';
import {verifedEmailHandler} from "../../store/ClientData";


export const RegistrationForm = () => {
    const phoneUser = useSelector(state => state.client__data.phoneUser)
    const [checkedPersonData, setCheckedPersonData] = useState(false)
    const [emailUsed, setEmailUsed] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const onSubmit = async (values, actions) => {
        //Добавление в базу данных нового пользователя
        const newUser = {
            id:uuidv4(),
            name: "",
            lastName: "",
            password: values.password,
            city: "",
            phone: values.phone,
            note: "",
            type: "Пользователь",
            email: values.email,
            isActivated: false,
            isConfirmPhone: false,
            codeConfirmForPhone: 0,
            twoStepVerification: false,
            twoStepVerificationType: "",
            activationLink: "",
            date: getCurrentDate(),
            bookingList: JSON.stringify([])
        }
        try {
            await AuthService.registration(newUser);
            //setEmailUsed(true)
            dispatch(verifedEmailHandler(true))
            navigate("/api/login")
            console.log("Регистрация прошла успешно!")
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.log("Ошибка регистрации!")
        }
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            email: "",
            password: "",
            phone: phoneUser,
            confirmPassword: "",
        },
        validationSchema: basicSchema,
        onSubmit,
    });


    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <form
                onSubmit={handleSubmit}
                className="registration"
                autoComplete="off"
            >
                <h2 className="text__content__black__b__26" style={{textAlign: "center"}}>Регистрация</h2>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                    <input
                        value={values.email}
                        onChange={handleChange}
                        id="email"
                        type="email"
                        placeholder="Введите Email"
                        onBlur={handleBlur}
                        className={errors.email && touched.email ? "input-error registration__input" : "registration__input"}
                    />
                    {errors.email && touched.email && <p className="error">{errors.email}</p>}
                    <input
                        id="password"
                        type="password"
                        placeholder="Введите пароль"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password ? "input-error registration__input" : "registration__input"}
                    />
                    {errors.password && touched.password && (
                        <p className="error">{errors.password}</p>
                    )}
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Подтвердите пароль"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.confirmPassword && touched.confirmPassword ? "input-error registration__input" : "registration__input"
                        }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                    )}
                    <InputMask
                        id="phone"
                        value={values.phone}
                        onChange={(e) => handleChange(e)}
                        onBlur={handleBlur}
                        type="tel"
                        mask="+7 (999) 999-99-99"
                        placeholder="+7 (999) 999-99-99"
                        className={
                            errors.phone && touched.phone ? "input-error registration__input" : "registration__input"
                        }
                    />
                    {errors.phone && touched.phone && (
                        <p className="error">{errors.phone}</p>
                    )}
                    {emailUsed ? <p className="error">Ваш Email уже зарегистрирован!</p> : ""}
                </div>
                <div
                    className="row__c__fs"
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <input
                        type="checkbox"
                        name="acceptedTos"
                        checked={checkedPersonData}
                        onChange={() => setCheckedPersonData(!checkedPersonData)}
                        style={{
                            cursor: "pointer",
                            marginRight: "5px"
                        }}
                    />
                    <span
                        className="text__content__grey__12"
                        style={{
                            marginTop: "5px",
                            marginBottom: "5px",
                            marginLeft: "5px"
                        }}>
                           Я согласен на обработку персональных <br/>
                           данных и принимаю условия
                           пользовательского <br/>соглашения
                       </span>
                </div>
                {!checkedPersonData &&
                    <div className="error">
                        <span style={{color: RED, marginRight: "5px"}}>*</span>
                        <span className="text__content__grey__12">
                            {"Подтвердите пользовательское соглашение"}
                        </span>
                    </div>}
                <div className="row__c__c">
                    {checkedPersonData ?
                        <button
                            type="submit"
                            className="login__button"
                            disabled={isSubmitting}
                        >
                            Зарегистрироваться
                        </button> :
                        <button
                            className="login__button"
                            disabled={true}
                        >
                            Зарегистрироваться
                        </button>
                    }

                </div>
                <div className="row__sa__c" style={{marginTop: "10px", marginBottom: "10px",}}>
                            <span className="text__content__grey__12">
                                Есть аккаунт?
                            </span>
                    <Link
                        to={"/api/login"}
                        className="text__content__orange__12"
                        style={{
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Вход
                    </Link>
                </div>
            </form>
        </div>
    )
}
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetPasswordLogInHandler} from "../../store/ClientData";
import React, {useState} from "react";
import {useFormik} from "formik";
import {loginSchema} from "../../validation/password";
import {handlerLoadingStartPage} from "../../store/Main";
import ResetPassword from "../modals/ResetPassword";
import VerifedEmail from "../modals/VerifedEmail";
import ResetPasswordLogIn from "../modals/ResetPasswordLogIn";
import {loginFailure, loginSuccess} from "../../store/authSlice";
import AuthService from "../../services/auth.service";


export const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [errorLogIn, setErrorLogIn] = useState(null)
    const [errorVetific, setErrorVetific] = useState(null)

    const onSubmit = async (values, actions) => {
        try {
            const token = await AuthService.login(values.email_login, values.password_login);
            dispatch(loginSuccess(token.data));

            //Обновление страницы
            dispatch(handlerLoadingStartPage(true))
            setTimeout(() => {
                dispatch(handlerLoadingStartPage(false))
            }, 1500)
            //Переход на страницу
            navigate("/")
            setErrorLogIn(false)
            setErrorVetific(false)
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.log("user is not logged in");
            setErrorVetific(true)
            setErrorLogIn(true)
            dispatch(loginFailure(error.message));
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
            email_login: "",
            password_login: "",
        },
        validationSchema: loginSchema,
        onSubmit,
    });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
            <form
                onSubmit={handleSubmit}
                className="login"
                autoComplete="off"
            >
                <h2 className="text__content__black__b__26" style={{textAlign: "center"}}>Войти</h2>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                    <input
                        value={values.email_login}
                        onChange={handleChange}
                        id="email_login"
                        type="email"
                        placeholder="Введите Email"
                        onBlur={handleBlur}
                        className={errors.email_login && touched.email_login ? "input-error login__input" : "login__input"}
                    />
                    {errors.email_login && touched.email_login && <p className="error">{errors.email_login}</p>}
                    <input
                        id="password_login"
                        type="password"
                        placeholder="Введите пароль"
                        value={values.password_login}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password_login && touched.password_login ? "input-error login__input" : "login__input"}
                    />
                    {errors.password_login && touched.password_login && (
                        <p className="error">{errors.password_login}</p>
                    )}
                    <button
                        type="submit"
                        className="login__button"
                        disabled={isSubmitting}
                    >
                        Войти
                    </button>
                    {errorLogIn ? <p className="error">Пользователь не найден!</p> : ""}
                    {errorVetific ? <p className="error">Ваш Email не подтвержден!</p> : ""}
                </div>
                <div
                    className="row__sb__c"
                    style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                    }}
                >
                    <Link
                        to={"/api/registration"}
                        className="text__content__orange__12"
                        style={{
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Регистрация
                    </Link>
                    <div
                        onClick={() => dispatch(resetPasswordLogInHandler(true))}
                        className="text__content__grey__12"
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        Забыли пароль?
                    </div>
                </div>

                {/*<div className="column">*/}
                {/*    <span*/}
                {/*        className="text__content__black__b__16"*/}
                {/*        style={{*/}
                {/*            marginBottom: "5px",*/}
                {/*            textAlign: "center"*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        Войти с помощью*/}
                {/*    </span>*/}
                {/*    <div className="row__c__c">*/}
                {/*        <img src={yandex}*/}
                {/*             style={{padding: "5px", cursor: "pointer"}}*/}
                {/*             width={20}*/}
                {/*             height={20}*/}
                {/*             alt="yandex"*/}
                {/*        />*/}
                {/*        <img src={google}*/}
                {/*             style={{padding: "5px", cursor: "pointer"}}*/}
                {/*             width={24}*/}
                {/*             height={24}*/}
                {/*             alt="google"*/}
                {/*        />*/}
                {/*        <img src={vk}*/}
                {/*             style={{padding: "5px", cursor: "pointer"}}*/}
                {/*             width={24}*/}
                {/*             height={24}*/}
                {/*             alt="vk"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <ResetPassword/>
                <VerifedEmail/>
                <ResetPasswordLogIn/>
            </form>
        </div>
    )
}
import yandex from "../../img/yandex.png"
import google from "../../img/google.png"
import vk from "../../img/vkontakte.png"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {dateClientHandler, setUidHandler} from "../../store/ClientData";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {database} from "../../firebase";
import {onValue, update, ref, set} from "firebase/database"
import {useFormik} from "formik";
import {loginSchema} from "../validation/password";
import setCookie from "../hooks/setCookie";
import {handlerLoadingStartPage} from "../../store/Main";





export const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const linkHistory = useSelector(state => state.client__data.link)
    const [errorLogIn, setErrorLogIn] = useState(null)
    const onSubmit = async (values, actions) => {
        console.log("DATA FORM", values.email_login);
        console.log("ACTION FORM", actions);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email_login, values.password_login)
            .then(({user}) => {
                console.log("AUTH USERS");
                update(ref(database, `/usersData/${user.uid}`), {
                    auth: true,
                })

                // setCookie('userData', {email: user.email, id: user.uid})
                setCookie("uid", user.uid)
                // update(ref(database, `/uid`), {
                //     userid: user.uid,
                // });
                dispatch(handlerLoadingStartPage(true))
                setTimeout(() => {
                    dispatch(handlerLoadingStartPage(false))
                }, 1500)
                setErrorLogIn(false)
                navigate(linkHistory)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorLogIn(true)
                console.log(errorCode);
                console.log(errorMessage);
            });

        await new Promise((resolve) => setTimeout(resolve, 1000));
    };



    const emailOnChange = (e) => {
        setEmail(e.target.value)
    }
    const passOnChange = (e) => {
        setPassword(e.target.value);
    }

    //
    // const handleLogin = (email, password) => {
    //     const auth = getAuth();
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then(({user}) => {
    //             update(ref(database, `/usersData/${user.uid}`), {
    //                 auth: true,
    //             })
    //             update(ref(database, `/uid`), {
    //                 userid: user.uid,
    //             });
    //
    //             navigate("/")
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(errorCode);
    //             console.log(errorMessage);
    //         });
    // }
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
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    placeholder="Email"*/}
                    {/*    className="login__input"*/}
                    {/*    onChange={emailOnChange}*/}
                    {/*/>*/}
                    {/*<input*/}
                    {/*    type="password"*/}
                    {/*    style={{marginTop: "10px"}}*/}
                    {/*    placeholder="Пароль"*/}
                    {/*    className="login__input"*/}
                    {/*    onChange={passOnChange}*/}
                    {/*/>*/}
                    <button
                        type="submit"
                        className="login__button"
                        disabled={isSubmitting}
                    >
                        Войти
                    </button>
                    {errorLogIn ? <p className="error">Пользователь не найден!</p> : ""}
                </div>
                <div
                    className="row__sb__c"
                    style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                    }}
                >
                    <Link
                        to={"/Зарегистрироваться"}
                        className="text__content__orange__12"
                        style={{
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Регистрация
                    </Link>
                    <Link
                        to={"/"}
                        className="text__content__grey__12"
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        Забыли пароль?
                    </Link>
                </div>

                <div className="column">
                    <span
                        className="text__content__black__b__16"
                        style={{
                            marginBottom: "5px",
                            textAlign: "center"
                        }}
                    >
                        Войти с помощью
                    </span>
                    <div className="row__c__c">
                        <img src={yandex}
                             style={{padding: "5px", cursor: "pointer"}}
                             width={20}
                             height={20}
                             alt="yandex"
                        />
                        <img src={google}
                             style={{padding: "5px", cursor: "pointer"}}
                             width={24}
                             height={24}
                             alt="google"
                        />
                        <img src={vk}
                             style={{padding: "5px", cursor: "pointer"}}
                             width={24}
                             height={24}
                             alt="vk"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
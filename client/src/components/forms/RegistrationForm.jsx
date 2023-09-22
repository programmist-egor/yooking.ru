import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useFormik} from "formik";
import InputMask from "react-input-mask";
import {dateClientHandler} from "../../store/ClientData";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import {RED} from "../../theme/colors";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {database} from "../../firebase";
import {set, ref} from "firebase/database"
import {basicSchema} from "../validation/password";
import setCookie from "../hooks/setCookie";


export const RegistrationForm = () => {
    const dispatch = useDispatch()
    const clientData = useSelector(state => state.client__data.dateClient)
    const [email, setEmail] = useState('');
    const phoneUser = useSelector(state => state.client__data.phoneUser)
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [checkPhone, setCheckPhone] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [isValid, setIsValid] = useState(true)
    const [checkedPersonData, setCheckedPersonData] = useState(false)
    const navigate = useNavigate();


    const onSubmit = async (values, actions) => {
        console.log("DATA FORM", values.email);
        console.log("ACTION FORM", actions);

        function writeUserData(userId, email, token, phone) {
            set(ref(database, `/usersData/${userId}`), {
                userid: userId,
                email: email,
                token: token,
                auth: false,
                name: "",
                phone: phone,
                favorite: "",
                booking: "",
                hotelList: ""
            });
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(({user}) => {
                writeUserData(user.uid, user.email, user.accessToken, values.phone)
                navigate("/Войти")
                actions.resetForm();
                setCheckedPersonData(!checkedPersonData)
                // setCookie("uid", user.uid)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
                        to={"/Войти"}
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
        // {/*<div className="registration">*/}
        // {/*    <h2 className="text__content__black__b__26" style={{textAlign: "center"}}>Регистрация</h2>*/}
        // {/*    <div style={{*/}
        // {/*        display: "flex",*/}
        // {/*        flexDirection: "column",*/}
        // {/*        justifyContent: "flex-start",*/}
        // {/*        alignItems: "center",*/}
        // {/*    }}>*/}
        //
        // {/*        <input*/}
        // {/*            type="email"*/}
        // {/*            required={true}*/}
        // {/*            placeholder="Email"*/}
        // {/*            className="registration__input"*/}
        // {/*            value={email}*/}
        // {/*            onChange={emailOnChange}*/}
        // {/*        />*/}
        // {/*        {checkEmail ? <span className="text__content__grey__12" style={{*/}
        // {/*            marginTop: "5px",*/}
        // {/*            marginBottom: "5px",*/}
        // {/*            color: RED*/}
        // {/*        }}>Неверный email</span> : ""}*/}
        // {/*        <input*/}
        // {/*            type="password"*/}
        // {/*            style={{marginTop: "10px"}}*/}
        // {/*            placeholder="Пароль"*/}
        // {/*            value={password}*/}
        // {/*            className="registration__input"*/}
        // {/*            onChange={(event) => handlePasswordChange(event)}*/}
        // {/*        />*/}
        // {/*        <Input*/}
        // {/*            type="password"*/}
        // {/*            value={password}*/}
        // {/*            onChange={handlePasswordChange}*/}
        // {/*            error={passwordError}*/}
        // {/*        />*/}
        //
        // {/*        {passwordError !== "" ? "" : <span className="text__content__grey__12" style={{*/}
        // {/*            marginTop: "5px",*/}
        // {/*            marginBottom: "5px",*/}
        // {/*            color: RED*/}
        // {/*        }}>{passwordError}</span>}*/}
        // {/*        /!*<InputMask*!/*/}
        // {/*        /!*    value={phone}*!/*/}
        // {/*        /!*    className="registration__input"*!/*/}
        // {/*        /!*    onChange={(e) => phoneOnChange(e)}*!/*/}
        // {/*        /!*    mask="+7 (999) 999-99-99"*!/*/}
        // {/*        /!*    placeholder="+7 (999) 999-99-99"*!/*/}
        //
        // {/*        /!*{checkPhone ? <span className="text__content__grey__12"*!/*/}
        // {/*        /!*                    style={{marginTop: "5px", marginBottom: "5px", color: RED}}>Неверный номер телефона</span> : ""}*!/*/}
        // {/*        /!*<span*!/*/}
        // {/*        /!*    className="text__content__grey__12"*!/*/}
        // {/*        /!*    style={{marginTop: "5px", marginBottom: "5px",}}*!/*/}
        // {/*        /!*>*!/*/}
        // {/*        /!*    На номер телефона придет код*!/*/}
        // {/*        /!*</span>*!/*/}
        // {/*    </div>*/}
        // {/*    <div*/}
        // {/*        className="row__c__fs"*/}
        // {/*        style={{*/}
        // {/*            marginTop: "20px",*/}
        // {/*            marginBottom: "20px",*/}
        // {/*        }}*/}
        // {/*    >*/}
        // {/*        <input*/}
        // {/*            type="checkbox"*/}
        // {/*            checked={checkedPersonData}*/}
        // {/*            onChange={() => setCheckedPersonData(!checkedPersonData)}*/}
        // {/*            style={{*/}
        // {/*                cursor: "pointer",*/}
        // {/*                marginRight: "5px"*/}
        // {/*            }}*/}
        // {/*        />*/}
        // {/*        <span*/}
        // {/*            className="text__content__grey__12"*/}
        // {/*            style={{*/}
        // {/*                marginTop: "5px",*/}
        // {/*                marginBottom: "5px",*/}
        // {/*            }}>*/}
        // {/*            Я согласен на обработку персональных <br/>*/}
        // {/*            данных и принимаю условия*/}
        // {/*            пользовательского <br/>соглашения*/}
        // {/*        </span>*/}
        // {/*    </div>*/}
        // {/*    <div className="row__c__c">*/}
        // {/*        <button*/}
        // {/*            className="login__button"*/}
        // {/*            onClick={() => handleSignUp(email, password, checkedPersonData, passwordError)}*/}
        // {/*        >*/}
        // {/*            Зарегистрироваться*/}
        // {/*        </button>*/}
        // {/*    </div>*/}
        // {/*    {!isValid ?*/}
        // {/*        <span className="text__content__grey__12" style={{marginTop: "5px", marginBottom: "5px", color: RED}}>Ошибка регистрации!</span>*/}
        // {/*        : ""*/}
        // {/*    }*/}
        // {/*    <div*/}
        // {/*        className="row__sa__c"*/}
        // {/*        style={{marginTop: "20px", marginBottom: "20px",}}*/}
        // {/*    >*/}
        // {/*        <span*/}
        // {/*            className="text__content__grey__12"*/}
        // {/*        >*/}
        // {/*            Есть аккаунт?*/}
        // {/*        </span>*/}
        // {/*        <Link*/}
        // {/*            to={"/Войти"}*/}
        // {/*            className="text__content__orange__12"*/}
        // {/*            style={{*/}
        // {/*                cursor: "pointer",*/}
        // {/*                fontWeight: "bold"*/}
        // {/*            }}*/}
        // {/*        >*/}
        // {/*            Вход*/}
        // {/*        </Link>*/}
        // {/*    </div>*/}
        // {/*</div>*/}

    )
}
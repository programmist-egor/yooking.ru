import yandex from "../../img/yandex.png"
import google from "../../img/google.png"
import vk from "../../img/vkontakte.png"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {dateClientHandler, setUidHandler} from "../../store/ClientData";
import {
    createUserWithEmailAndPassword,
    getAuth, RecaptchaVerifier,
    PhoneAuthProvider,
    signInWithCredential,
    signInWithEmailAndPassword, signInWithPhoneNumber
} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {database} from "../../firebase";
import {onValue, update, ref, set} from "firebase/database"
import {useFormik} from "formik";
import {useAuthState} from "react-firebase-hooks/auth";
import {firebase, auth} from "../../firebase";

export const PhoneAuthForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [password, setPassword] = useState('555555');
    const phoneUser = useSelector(state => state.client__data.phoneUser)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState(false);
    const [verificationId, setVerificationId] = useState('');
    const [user, loading, error] = useAuthState(getAuth());
    const uid = useSelector(state => state.client__data.uid)

    const onSubmit = async (values, actions) => {
        console.log("DATA FORM", values);
        console.log("ACTION FORM", actions);
        if (values.password_code === password) {
            await update(ref(database, `/usersData/${uid}`), {
                auth: true,
                phone: phoneUser,
            })

            navigate("/Личный_кабинет")
            setVerificationCode(false)

            await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
            setVerificationCode(true)
        }
        // const auth = getAuth();
        // window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        //     'size': 'normal',
        //     'callback': (response) => {
        //         signInWithPhoneNumber(auth, `+${phoneNumber}`, window.recaptchaVerifier)
        //             .then(confirmationResult => {
        //                 console.log(response)
        //                 setVerificationId(confirmationResult.verificationId);
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             });
        //     },
        //     'expired-callback': () => {
        //
        //     }
        // });

        await new Promise((resolve) => setTimeout(resolve, 1000));
    };


    // const handleSendCode = () => {
    //
    // }

    const handleConfirmCode = () => {
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
        signInWithCredential(getAuth(), credential)
            .catch(error => {
                console.log(error);
            });
    }

    // if (loading) {
    //     return <div>Loading...</div>
    // }
    //
    // if (error) {
    //     return <div>Error: {error?.message}</div>
    // }
    //
    // if (user) {
    //     return <div>You are logged in!</div>
    // }

    const passOnChange = (e) => {
        setPassword(e.target.value);
    }


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
            password_code: "555555",
        },
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
            <div id="recaptcha-container"></div>
            <form
                onSubmit={handleSubmit}
                className="login"
                autoComplete="off"
            >


                {/*<div>*/}
                {/*    <h2>Phone Auth</h2>*/}
                {/*    <div>*/}
                {/*        <input type="tel" placeholder="Phone Number"*/}
                {/*               value={phoneNumber}*/}
                {/*            onChange={(event) => setPhoneNumber(event.target.value)}*/}
                {/*        />*/}
                {/*        /!*<button onClick={handleSendCode}>Send</button>*!/*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <input type="text" placeholder="Verification Code"*/}
                {/*               value={verificationCode}*/}
                {/*               onChange={(event) => setVerificationCode(event.target.value)}/>*/}
                {/*        <button onClick={handleConfirmCode}>Verify</button>*/}
                {/*    </div>*/}

                {/*</div>*/}
                <h2 className="text__content__black__b__24" style={{textAlign: "center"}}>Подтвердите номер
                    телефона</h2>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                    <div className="column__c">
                        <span className="text__content__grey__12" style={{margin: "10px"}}>Введите код из смс, отправленный Вам на номер</span>
                        <span className="text__content__grey__12"
                              style={{fontWeight: "bold", margin: "5px"}}>{phoneUser}</span>
                    </div>
                    <input
                        id="password_code"
                        type="text"
                        placeholder="Введите смс-код"
                        value={values.password_code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{marginTop: "15px"}}
                        className={errors.password_code && touched.password_code ? "input-error login__input" : "login__input"}
                    />
                    {errors.password_code && touched.password_code && (
                        <p className="error">{errors.password_code}</p>
                    )}
                    {verificationCode && <p className="error">Неверный смс-код</p>}
                    <button
                        type="submit"
                        className="login__button"
                        disabled={isSubmitting}
                    >
                        Подтвердить
                    </button>
                </div>

            </form>

        </div>
    )
}
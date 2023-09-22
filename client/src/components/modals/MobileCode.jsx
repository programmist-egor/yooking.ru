import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import {mobileCodeModalHandler, handlerIsCounting} from "../../store/HotelItem";
import {Icon24Cancel} from '@vkontakte/icons';
import {GREY, GREY_BLACK, RED, WHITE} from "../../theme/colors";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {Icon24SendOutline} from '@vkontakte/icons';
import {useState, useEffect} from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import {
    getAuth,
    signInWithPhoneNumber,
    RecaptchaVerifier,
    signInWithCredential,
    PhoneAuthProvider
} from "firebase/auth";




const getPadTime = (time) => time.toString().padStart(2, "0");

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function MobileCode({header, phone, verificationId}) {
    const dispatch = useDispatch()
    const mobileCodeModal = useSelector(state => state.hotels_item.mobileCodeModal)
    const isCounting = useSelector(state => state.hotels_item.isCounting)
    const [checkCode, setCheckCode] = useState(false)
    const [checkCodeAuth, setCheckCodeAuth] = useState(false)
    const [codeNumber, setCodeNumber] = useState("")
    const [timeLeft, setTimeLeft] = useState(180);
    const code = "55555"
    const [verificationCode, setVerificationCode] = useState('');


    //
    // window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    //     'size': 'normal',
    //     'callback': (response) => {
    //         console.log(response);
    //     },
    //     'expired-callback': () => {
    //
    //     }
    // });
    //
    // const phoneNumber = "+79528956195";
    // const appVerifier = window.recaptchaVerifier;
    //
    //
    // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //     .then((confirmationResult) => {
    //         // SMS sent. Prompt user to type the code from the message, then sign the
    //         // user in with confirmationResult.confirm(code).
    //         console.log("phone",confirmationResult);
    //         window.confirmationResult = confirmationResult;
    //         // ...
    //     }).catch((error) => {
    //     // Error; SMS not sent
    //     // ...
    // });
    //
    //
    // const handlerSendMobileCode = () => {
    //
    //
    //     confirmationResult.confirm(codeNumber).then((result) => {
    //
    //         const user = result.user;
    //         console.log(user);
    //         // ...
    //     }).catch((error) => {
    //         // User couldn't sign in (bad verification code?)
    //         // ...
    //     });
    // }
    //
    const handlerSendMobileCode = () => {
        if (codeNumber === code) {
            setCodeNumber("")
            dispatch(mobileCodeModalHandler(!mobileCodeModal))
        } else {

        }
    }


    const minutes = getPadTime(Math.floor(timeLeft / 60));
    const second = getPadTime(timeLeft - minutes * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
        }, 1000)
        if (timeLeft === 0) {
            dispatch(handlerIsCounting(!isCounting))
        }
        return () => {
            clearInterval(interval);
        }
    }, [timeLeft, mobileCodeModal])

    const sendRepeatCode = () => {
        setTimeLeft(180)
        dispatch(handlerIsCounting(!isCounting))
    }
    const closeMobileCodeModal = () => {
        setTimeLeft(180)
        setCodeNumber("")
        dispatch(mobileCodeModalHandler(!mobileCodeModal))
    }

    const handlerCodeInput = (e) => {
        if(e.target.value.length > 5) {
            setCodeNumber(codeNumber)
            setVerificationCode(e.target.value)

            // if (codeNumber === code) {
            //     setCheckCodeAuth(true)
            //     setCheckCode(false)
            // } else {
            //     setCheckCode(true)
            // }
        } else {
            setCodeNumber(e.target.value)
        }
    }

    return (
        <div>
            <Modal
                open={mobileCodeModal}
                onClose={() => closeMobileCodeModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="column">
                        <div className="row__sb__c">
                            <span className="text__content__black__b__16">{header}</span>
                            <span onClick={() => dispatch(mobileCodeModalHandler(!mobileCodeModal))}
                                  style={{cursor: "pointer"}}>
                               <Icon24Cancel color={GREY_BLACK}/>
                            </span>
                        </div>
                        <div className="column__c">
                            <span className="text__content__grey__12" style={{margin: "15px"}}>Введите код из смс, отправленный Вам на номер</span>
                            <span className="text__content__grey__12" style={{ fontWeight: "bold"}}>{phone}</span>
                        </div>
                        <div className="row__c__c">
                            <input
                                type="number"
                                className="inputCode text__content__black__b__26"
                                value={codeNumber}
                                maxLength="5"
                                onChange={handlerCodeInput}
                            />
                        </div>
                        {
                            checkCode ?
                            <div className="column__c">
                                <span className="text__content__grey__12" style={{marginTop: "5px", marginBottom: "5px", color: RED}}>Неверный код</span>
                            </div> :
                            ""
                        }
                        {isCounting === true ?
                            <div className="row__c__c">
                                <h3 className="text__content__grey__12"
                                    style={{cursor: "pointer", textDecoration: "underline"}}
                                    onClick={() => sendRepeatCode()}>
                                    Отправить код повторно
                                </h3>
                            </div>
                            :
                            <div style={{marginBottom: "10px", marginTop: "10px"}}>
                                <div className="row__c__c">
                                    <span className="text__content__grey__12">Вы можете запросить новый код через</span>
                                </div>
                                <div className="row__c__c">
                                    <span className="text__content__grey__12">{minutes} минуты {second} секунды</span>
                                </div>
                            </div>
                        }

                        <div className="row__c__c">
                            {checkCodeAuth ?
                                <ButtonIcon
                                    name={"Подтвердить"}
                                    height={"35px"}
                                    styleText={"text__content__white__b__15"}
                                    color={GREY_BLACK}
                                    handler={() => handlerSendMobileCode()}
                                    link={"/Личный_кабинет"}
                                    style={"doneBtn"}
                                    icon={<Icon24SendOutline color={WHITE}/>}
                                />
                            :
                                <ButtonIcon
                                    name={"Подтвердить"}
                                    height={"35px"}
                                    styleText={"text__content__white__b__15"}
                                    color={GREY}
                                    link={""}
                                    style={"doneBtnNoActive"}
                                    icon={<Icon24SendOutline color={WHITE}/>}
                                />
                            }
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}
//Выход из приложения
import getCookie from "../components/hooks/getCookie";
import {sendPasswordResetEmail, signOut} from "firebase/auth";
import {auth} from "../firebase";
import removeCookie from "../components/hooks/removeCookie";
import {handlerLoadingUserMenu} from "../store/Main";
import {errorResetLogInEmailHandler, resetPasswordHandler} from "../store/ClientData";


export const exitAccountUser = async (dispatch, toggleDrawerSort) => {

    console.log("Auth cookie", getCookie("auth"));
    await signOut(auth).then(() => {
        console.log("Sign-out successful");
        removeCookie("uid");
        removeCookie("auth");
        toggleDrawerSort()
        dispatch(handlerLoadingUserMenu(true))
        setTimeout(() => {
            dispatch(handlerLoadingUserMenu(false))
        }, 1000)

    }).catch((error) => {
        console.log("error exit", error);
    });
};

export const resetPassword = async (auth, email, navigate, dispatch) => {
   await sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Reset email sent.");
            signOut(auth).then(() => {
                console.log("Sign-out successful");
                removeCookie("uid");
                removeCookie("auth");
                dispatch(resetPasswordHandler(true))
                dispatch(handlerLoadingUserMenu(true))
                setTimeout(() => {
                    dispatch(handlerLoadingUserMenu(false))
                }, 1000)
                navigate("/Войти");
                dispatch(errorResetLogInEmailHandler(false))
            }).catch((error) => {
                console.log("error exit", error);
            });
        })
        .catch((error) => {
            console.error(error);
            dispatch(errorResetLogInEmailHandler(true))
        });

}
import Cookies from "js-cookie";

const SetCookie = (cookieName, dataUser) => {
    Cookies.set(cookieName, dataUser, {
        expires: 1,
        secure: false,
        sameSite: "strict",
        path: "/"
    })
}

export default SetCookie;
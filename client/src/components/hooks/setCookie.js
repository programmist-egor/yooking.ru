import Cookies from "js-cookie";

const SetCookie = (cookieName, dataUser) => {
    Cookies.set(cookieName, dataUser, {
        expires: 25,
        secure: true,
        sameSite: "strict",
        path: "/"
    })
}

export default SetCookie;
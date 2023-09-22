import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import React from "react";

import {PhoneAuthForm} from "../components/forms/PhoneAuthForm";

export const PhoneAuth = () => {

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <PhoneAuthForm/>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}
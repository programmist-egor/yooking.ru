import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {RegistrationForm} from "../components/forms/RegistrationForm";
import React from "react";


export const Registration = () => {

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <RegistrationForm/>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
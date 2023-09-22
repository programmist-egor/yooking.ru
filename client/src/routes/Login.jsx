import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {LoginForm} from "../components/forms/LoginForm";
import React from "react";

export const Login = () => {

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <LoginForm/>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
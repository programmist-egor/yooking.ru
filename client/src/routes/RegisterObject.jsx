import {Header} from "../components/header/Header";
import page_dev from "../img/page_dev.png"
import React from "react";


export const RegisterObject = () => {

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh"
                    }}
                >
                    <div className="column__c__c">
                        <img
                            src={page_dev}
                            alt="page_dev"
                            width={100}
                            height={100}
                            style={{marginBottom: "10px"}}
                        />
                        <h2 className="text__content__black__b__26">Страница в разработке</h2>
                    </div>
                </div>
            </div>
            {/*<div className="footer">*/}
            {/*    <Footer/>*/}
            {/*</div>*/}
        </div>
    )
}
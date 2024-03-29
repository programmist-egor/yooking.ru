import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import React from "react";
import {PayForm} from "../components/forms/PayForm";
import {useSelector} from "react-redux";


export const Pay = () => {
    const dataBooking = useSelector(state => state.dataBooking.dataBooking)
    const updateNumber = useSelector(state => state.dataBooking.updateNumber)
    const updateUser = useSelector(state => state.dataBooking.updateUser)
    const numberId = useSelector(state => state.dataBooking.numberId)
    const userId = useSelector(state => state.dataBooking.userId)

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <PayForm
                    dataBooking={dataBooking}
                    numberId={numberId}
                    updateNumber={updateNumber}
                    updateUser={updateUser}
                    userId={userId}
                />
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
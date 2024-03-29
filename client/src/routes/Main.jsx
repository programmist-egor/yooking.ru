import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {BannerSearch} from "../components/blocks/BannerSearch";
import {WhereToGo} from "../components/blocks/WhereToGo";
import {BenefitBlock} from "../components/blocks/BenefitBlock";
import {MobileApp} from "../components/blocks/MobileApp";
import banner from "../assets/image/banner-main.jpg"
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkInHandler, checkOutHandler, initDateRangeHandler} from "../store/Search";
import {dateFormater} from "../components/hooks/dataFormater";


export const Main = () => {
    const cityOrHotel = useSelector(state => state.search.cityOrHotel)
    const dispatch = useDispatch()

    useEffect(() => {
        if(cityOrHotel.dataRange.checkIn === "" &&  cityOrHotel.dataRange.checkOut === "") {
            const startFull = new Date()
            const endFull = new Date();
            endFull.setDate(endFull.getDate() + 2);

            const start = dateFormater(startFull)
            const end = dateFormater(endFull)
            dispatch(initDateRangeHandler())
            dispatch(checkInHandler(start))
            dispatch(checkOutHandler(end))
        }
    }, [])

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <BannerSearch
                    header={"ЖИВИТЕ ТАМ, ГДЕ НРАВИТСЯ"}
                    banner={banner}

                />
                <div className="column" style={{margin: "1%"}}>
                    <WhereToGo />
                    <BenefitBlock/>
                    <MobileApp/>
                </div>

            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
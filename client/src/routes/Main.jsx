import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {BannerSearch} from "../components/blocks/BannerSearch";
import {WhereToGo} from "../components/blocks/WhereToGo";
import {BenefitBlock} from "../components/blocks/BenefitBlock";
import {MobileApp} from "../components/blocks/MobileApp";
import {FollowUs} from "../components/blocks/FollowUs";
import banner from "../img/banner-main.jpg"


export const Main = () => {

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="body">
                <BannerSearch
                    header={"ЖИВИТЕ ТАМ, ГДЕ НРАВИТСЯ"}
                    banner={banner}
                />
                <WhereToGo/>
                <BenefitBlock/>
                <MobileApp/>
                <FollowUs/>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
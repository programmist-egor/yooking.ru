import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import {EditUserContactData} from "../../components/blocks/EditUserContactData";

export const EditUserData = () => {
    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <EditUserContactData/>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
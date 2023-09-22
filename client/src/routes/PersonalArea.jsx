import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {ContactData} from "../components/blocks/ContactData";

export const PersonalArea = () => {

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <ContactData/>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
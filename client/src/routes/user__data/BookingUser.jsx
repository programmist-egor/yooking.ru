import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import FinishedBooking from "../../components/modals/FinishedBooking";
import {ListBookingUser} from "../../components/blocks/ListBookingUser";


export const BookingUser = () => {

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <ListBookingUser/>
                <FinishedBooking/>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
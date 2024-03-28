import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import {ListFavoriteUser} from "../../components/blocks/ListFavoriteUser";



export const FavoriteUserHotel = () => {

    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="center">
                <ListFavoriteUser />
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}
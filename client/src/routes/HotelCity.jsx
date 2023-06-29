import {Header} from "../components/header/Header";
import {Footer} from "../components/footer/Footer";
import {BannerSearch} from "../components/blocks/BannerSearch";
import {useSelector} from "react-redux";
import {HeaderHotel} from "../components/header/HeaderHotel";
import {ButtonSort} from "../components/buttons/ButtonSort";
import {Filter} from "../components/filters/Filter";
import {HotelCard} from "../components/cards/HotelCard";


export const HotelCity = () => {
    const hotelCityId = useSelector(state => state.main.hotelCityId)
    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="body">
                <BannerSearch
                    header={hotelCityId.header}
                    banner={hotelCityId.banner}
                />
                <div
                    style={{
                        marginRight: "18%",
                        marginLeft: "18%"
                    }}>
                    <HeaderHotel value={5}/>
                    <ButtonSort/>
                    <div
                        className="row__fs__fs"
                        style={{
                            marginTop: "20px",
                            width: "100%"
                        }}
                    >
                        <Filter/>
                        <div
                            className="column__fs"
                            style={{
                                width: "100%"
                            }}
                        >
                            <HotelCard/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <Footer/>
            </div>

        </div>
    )
}
import './App.css';
import './components/buttons/Buttons.css'
import "./components/inputs/Inputs.css"
import "./components/blocks/Blocks.css"
import "./components/modals/Modals.css"
import "./components/filters/Filter.css"
import "./components/cards/Cards.css"
import "./components/slider/Slider.css"
import "./components/forms/Forms.css"
import "./components/search/SearchPanel.css"
import "./components/styles/Styles.css"
import "./components/custom-select/CustomSelect.css"

import { Route, Routes} from "react-router-dom";
import {Main} from "./routes/Main";
import {HotelAndMap} from "./routes/HotelAndMap";
import {HotelNumber} from "./routes/HotelNumber";
import {ErrorPage} from "./routes/ErrorPage";
import {Login} from "./routes/Login";
import {Registration} from "./routes/Registration";
import {useDispatch, useSelector} from "react-redux";
import {PersonalArea} from "./routes/PersonalArea";
import {FavoriteUserHotel} from "./routes/user__data/FavoriteUserHotel";
import {EditUserData} from "./routes/user__data/EditUserData";
import {BookingUser} from "./routes/user__data/BookingUser";
import {useEffect} from "react";
import AuthService from "./services/auth.service";
import {isAuth} from "./store/authSlice";
import {StartingPage} from "./components/starting-page/StartingPage";
import {Pay} from "./routes/Pay";

function App() {
    const loading = useSelector(state => state.main.loading)
    const dispatch = useDispatch()

    const authChecked = async () => {
        try {
            const res = await AuthService.refresh();
            return { accessToken: res.data.accessToken, user: res.data.user }; // Убедитесь, что возвращаемый объект содержит accessToken
        } catch (error) {
            console.log(error);
            return null; // Возвращайте null или другое значение по умолчанию в случае ошибки
        }
    };


    useEffect(() => {
        if (localStorage.getItem('token')) {
            authChecked()
                .then(data => dispatch(isAuth(data)))
        }
    },[]);



    return (
            <Routes>
                <Route path="/" element={loading ? <StartingPage/> : <Main/>}/>
                <Route path="/hotels_map" element={<HotelAndMap/>}/>
                <Route path="/hotel" element={<HotelNumber/>}/>
                <Route path="/error" element={<ErrorPage />}/>
                <Route path="/api/login" element={<Login />}/>
                <Route path="/person" element={<PersonalArea />}/>
                <Route path="/pay" element={<Pay/>}/>
                <Route path="/api/registration" element={<Registration />}/>
                <Route path="/booking" element={<BookingUser />}/>
                <Route path="/edit_user" element={<EditUserData />}/>
                <Route path="/favorites" element={<FavoriteUserHotel />}/>
            </Routes>
    );
}

export default App;

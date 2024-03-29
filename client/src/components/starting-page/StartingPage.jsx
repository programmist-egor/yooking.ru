import "./StartingPage.css"
import map from "../../assets/image/maps.png";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {handlerLoadingStartPage} from "../../store/Main";



export const StartingPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => dispatch(handlerLoadingStartPage(false)), 3000);
    }, []);

    return (
        <div className='loaderContainer'>
            <div className='loaderLogo'>
                <span
                    className='loaderText animate-charcter'
                    style={{fontSize: "36px", fontWeight: "bold"}}>
                    YOOKING.RU
                </span>
                <p className='loaderSubtext'>Сервис по бронированию</p>
            </div>
            <div className="row__c__c">
                <img src={map} alt="map" width={300}/>
            </div>
        </div>
    );
}

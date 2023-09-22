import map from "../img/blocks/maps.png"

export const StartingPage = () => {
    const loaderContainer = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#fff"
    }
    const loaderLogo = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
    const loaderText = {
        fontSize: "36px",
        fontWeight: "bold",
    }
    const loaderSubtext = {
        fontSize: "11px",
        fontWeight: "300",
        color: "#888",
        marginTop: "5px"
    }
    return (
        <div style={loaderContainer}>
            <div style={loaderLogo}>
                <span style={loaderText} className="animate-charcter">YOOKING.RU</span>
                <p style={loaderSubtext}>Сервис по бронированию</p>
            </div>
            <div className="row__c__c">
                <img src={map} alt="map" width={300}/>
            </div>
        </div>
    );
}
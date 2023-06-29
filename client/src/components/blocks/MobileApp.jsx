import phone from "../../img/blocks/phone_1.png";
import imgStore from "../../img/blocks/store.png";
import qr from "../../img/blocks/qr.png";

export const MobileApp = () => {
    return (
        <div className="row__c__c mobileApp__block">
            <div className="row__c__c">
                <img
                    src={phone}
                    alt="phone"
                    height={395}
                />
            </div>
            <div
                className="column__fs"
                style={{
                    marginRight: "5%",
                    marginLeft: "5%"
                }}
            >
                <span className="header__banner__white__b__40">
                    Все отели в вашем телефоне
                </span>
                <span
                    className="text__content__white__24"
                    style={{
                        marginTop: "20px",
                        marginBottom: "20px"
                    }}
                >Скачивайте мобильное приложение
                </span>
                <span
                    className="header__banner__white__b__48"
                >
                    Всегда рядом
                </span>
            </div>
            <div
                className="column__c"
            >
                <span className="text__content__white__b__24">
                    Отсканируй QR - код
                </span>
                <img
                    src={qr}
                    alt="qr"
                    width={220}
                    height={220}
                    style={{
                        marginTop: "10px"
                    }}
                />
                <img
                    src={imgStore}
                    alt="store"
                    width={220}
                    style={{
                        marginTop: "10px"
                    }}
                />
            </div>
        </div>
    )
}
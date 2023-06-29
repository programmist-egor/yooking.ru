import img7 from "../../img/blocks/7.png"
import img8 from "../../img/blocks/8.png"
import img9 from "../../img/blocks/9.png"

export const BenefitBlock = () => {
    return (
        <div
            className="column__c benefit__block"
            style={{
                paddingLeft: "15%",
                paddingRight: "15%"
            }}
        >
            <div className="row__c__c">
                <h2 className="text__content__black__b__32">Путешествуйте вместе с нами</h2>
            </div>
            <div
                className="row__sa__c"
                style={{
                    marginTop: "80px",
                    width: "100%",
                }}
            >
                <div className="column__c">
                    <img
                        src={img8}
                        alt="8"
                        width={80}
                        height={80}
                    />
                    <span
                        className="text__content__black__b__24"
                        style={{
                            marginTop: "20px",
                        }}
                    >Гарантия цены</span>
                </div>
                <div
                    className="column__c"
                    style={{
                        marginLeft: "70px"
                    }}
                >
                    <img
                        src={img7}
                        alt="7"
                        width={80}
                        height={80}
                    />
                    <span
                        className="text__content__black__b__24"
                        style={{
                            marginTop: "20px",
                        }}
                    >Кэшбэк за проживание</span>
                </div>
                <div className="column__c">
                    <img
                        src={img9}
                        alt="9"
                        width={80}
                        height={80}
                    />
                    <span
                        className="text__content__black__b__24"
                        style={{
                            marginTop: "20px",
                        }}
                    >Всегда на связи E-SIM</span>
                </div>
            </div>
        </div>
    )
}
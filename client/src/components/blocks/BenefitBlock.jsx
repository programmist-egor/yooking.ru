import price from "../../assets/image/7.png"
import cash from "../../assets/image/8.png"
import esim from "../../assets/image/esim.png"

export const BenefitBlock = () => {
    return (
        <div>
            <div className="column__c__c benefit__block desktop__benefit__block">
                <h2 className="text__content__black__b__26">Путешествуйте вместе с нами</h2>
                <div className="row__sa__c" style={{marginTop: "10px", width: "100%",}}>
                    <div className="column__c__c" style={{margin: "20px",}}>
                        <img
                            src={price}
                            alt="8"
                            width={50}
                            height={50}
                        />
                        <span className="text__content__black__b__20" style={{marginTop: "20px", textAlign: "center"}}
                        >Гарантия цены</span>
                    </div>
                    <div className="column__c__c" style={{margin: "20px"}}>
                        <img
                            src={cash}
                            alt="7"
                            width={50}
                            height={50}
                        />
                        <span className="text__content__black__b__20" style={{marginTop: "20px", textAlign: "center"}}
                        >Кэшбэк за проживание</span>
                    </div>
                    <div className="column__c__c" style={{margin: "20px",}}>
                        <img
                            src={esim}
                            alt="9"
                            width={50}
                            height={50}
                        />
                        <span className="text__content__black__b__20" style={{marginTop: "20px", textAlign: "center"}}
                        >Всегда на связи E-SIM</span>
                    </div>
                </div>
            </div>


            <div className="column__c__c benefit__block tablet__benefit__block">
                <h2 className="text__content__black__b__16">Путешествуйте вместе с нами</h2>
                <div className="row__wrap__c__c" style={{marginTop: "10px", width: "100%",}}>
                    <div className="column__c__c" style={{margin: "20px",}}>
                        <img
                            src={price}
                            alt="8"
                            width={40}
                            height={40}
                        />
                        <span className="text__content__black__b__16" style={{marginTop: "20px", textAlign: "center"}}
                        >Гарантия цены</span>
                    </div>
                    <div className="column__c__c" style={{margin: "20px"}}>
                        <img
                            src={cash}
                            alt="7"
                            width={40}
                            height={40}
                        />
                        <span className="text__content__black__b__16" style={{marginTop: "20px", textAlign: "center"}}
                        >Кэшбэк за проживание</span>
                    </div>
                    <div className="column__c__c" style={{margin: "20px",}}>
                        <img
                            src={esim}
                            alt="9"
                            width={40}
                            height={40}
                        />
                        <span className="text__content__black__b__16" style={{marginTop: "20px", textAlign: "center"}}
                        >Всегда на связи E-SIM</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
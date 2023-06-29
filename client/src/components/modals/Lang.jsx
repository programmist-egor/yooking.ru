import ru from "../../img/flags/ru.png"
import usa from "../../img/flags/usa.png"

export const Lang = ({style, handleLang}) => {
    return (
        <div className={style}
             onClick={handleLang}
        >
            <div className="modal__content__lang">
                <div className="modal__body">
                    <div
                        className="row__c__fs"
                        onClick={() => console.log("RU")}
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src={ru}
                            alt="ru"
                            width={26}
                            height={26}
                            style={{marginRight: "10px"}}
                        />
                        <span className="text__content__black__16">Русский</span>
                    </div>
                    <div
                        className="row__c__fs"
                        onClick={() => console.log("USA")}
                        style={{
                            cursor: "pointer",
                            marginTop: "5px"
                        }}
                    >
                        <img
                            src={usa}
                            alt="usa"
                            width={26}
                            height={26}
                            style={{marginRight: "10px"}}
                        />
                        <span className="text__content__black__16">English</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
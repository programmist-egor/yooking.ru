
export const Sort = ({style, handleLang}) => {
    return (
        <div className={style}
             onClick={handleLang}
        >
            <div className="modal__content__sort">
                <div className="modal__body">
                    <div
                        className="row__c__fs"
                        onClick={() => console.log("Лучший по отзывам")}
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        <span className="text__content__black__16">Лучший по отзывам</span>
                    </div>
                    <div
                        className="row__c__fs"
                        onClick={() => console.log("Лучший по цене")}
                        style={{
                            cursor: "pointer",
                            marginTop: "5px"
                        }}
                    >
                        <span className="text__content__black__16">Лучший по цене</span>
                    </div>
                    <div
                        className="row__c__fs"
                        onClick={() => console.log("Лучшие отзывы и цена")}
                        style={{
                            cursor: "pointer",
                            marginTop: "5px"
                        }}
                    >
                        <span className="text__content__black__16">Лучшие отзывы и цена</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
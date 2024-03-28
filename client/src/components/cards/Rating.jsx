export const Rating = ({rating, countReviews, type}) => {
    return (
        <>
            {
                type === "review" ?
                    <div className="column__c" style={{
                        margin: 10
                    }}>
                        <div className="column__c__c rating__block">
                            <span className="text__content__white__14">Оценка</span>
                            <span
                                className="assessment__b"
                                style={{textShadow: "0 0 8px rgba(0, 0, 0, 0.55)"}}
                            >{rating}</span>
                        </div>
                    </div>
                    :
                    <div className="column__c">
                        <div className="row__c__c rating__header">
                            <span className="text__content__white__14">Рейтинг</span>
                        </div>
                        <div className="column__c__c rating__block">
                    <span
                        className="assessment__b"
                        style={{textShadow: "0 0 8px rgba(0, 0, 0, 0.55)"}}
                    >{rating}</span>
                            <div className="row__c__c assessment">
                                <span className="text__content__grey__12">{countReviews} оценок</span>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
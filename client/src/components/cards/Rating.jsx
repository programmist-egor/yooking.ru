export const Rating = ({ rating, countReviews}) => {
    return (
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
    )
}
export const Rating = () => {
    return (
        <div className="column__c">
            <div className="row__c__c rating__header">
                <span className="text__content__white__16">Гостиница</span>
            </div>
            <div className="column__c__c rating__block">
                <span
                    className="assessment__b"
                    style={{
                        textShadow: "0 0 8px rgba(0, 0, 0, 0.55)"
                    }}
                >9.7</span>
                <div className="row__c__c assessment">
                    <span className="text__content__grey__12">418 оценок</span>
                </div>
            </div>
        </div>
    )
}
import SearchPanel from "../search/SearchPanel";




export const BannerSearch = ({banner, header,  addHeader, q}) => {
    return (
        <div
            className="row__c__c"
            style={{
                height: "590px",
                backgroundImage: `url(${banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="column__c">
                <h1 className="header__banner" >{addHeader} {header.toLocaleUpperCase()}{q}</h1>
                <SearchPanel/>
            </div>
        </div>
    )
}
import {SearchPanel} from "../search/SearchPanel";
import {GREY_WHITE} from "../../theme/colors";


export const BannerSearch = ({banner, header}) => {
    return (
        <div
            className="row__c__c"
            style={{
                height: "590px",
                backgroundImage: `url(${banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                paddingRight: "20%",
                paddingLeft: "20%"
            }}
        >
            <div className="column__c">
                <h1
                    className="header__banner__white__b__40"
                >{header}</h1>
                <SearchPanel/>
            </div>
        </div>
    )
}
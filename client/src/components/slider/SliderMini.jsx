import cards from "../../img/cards.png"
import {
    Icon24BrowserBack,
    Icon24BrowserForward,
    Icon24LikeOutline,
    Icon24RadioOn,
    Icon24RadioOff
} from '@vkontakte/icons';
import {WHITE} from "../../theme/colors";


export const SliderMini = () => {
    const slideItem = [{id: 0, active: true}, {id: 1, active: false}, {id: 2, active: false},]
    return (
        <div
            className="column__sb"
            style={{
                height: "260px",
                flexGrow: 3,
                minWidth: "360px",
                backgroundImage: `url(${cards})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px 0 0 10px"
            }}
        >
            <div className="row__c__fe">
                         <span
                             className="cardControlSlider"
                             onClick={() => "BACK"}
                         >
                    <Icon24LikeOutline
                        width={35}
                        height={35}
                        color={WHITE}
                    />
                </span>
            </div>
            <div className="row__sb__c">
                <span
                    className="cardControlSlider"
                    onClick={() => "BACK"}
                >
                    <Icon24BrowserBack color={WHITE}/>
                </span>
                <span
                    className="cardControlSlider"
                    onClick={() => "FORWARD"}
                >
                    <Icon24BrowserForward color={WHITE}/>
                </span>
            </div>

            <span
                className="row__c__c cardControlSlider"
                onClick={() => "CHOOSE SLIDE"}
            >
                {slideItem.map(item => (
                    item.active ?
                        <span
                            key={item.id}
                            style={{
                                padding: "5px"
                            }}>
                            <Icon24RadioOn
                                width={9}
                                height={9}
                                color={WHITE}
                            />
                        </span>
                        :
                        <span
                            key={item.id}
                            style={{
                                padding: "2.5px"
                            }}>
                            <Icon24RadioOff
                                width={9}
                                height={9}
                                color={WHITE}
                            />
                        </span>
                ))}
                </span>

        </div>
    )
}
import { Icon24MinusOutline, Icon24Add } from '@vkontakte/icons';
import {BLACK, GREY_WHITE} from "../../theme/colors";

export const ButtonCounter = ({count, style,handleDel, handleAdd}) => {
    return (
        <div className={style}>
            <span
                onClick={handleDel}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: GREY_WHITE,
                }}
            >
                <Icon24MinusOutline width={16} height={16} color={BLACK}/>
            </span>
            <span className="text__content__black__b__16">{count}</span>
            <span
                onClick={handleAdd}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: GREY_WHITE,
                    cursor: "pointer"
                }}
            >
                <Icon24Add width={16} height={16} color={BLACK}/>
            </span>
        </div>
    )
}
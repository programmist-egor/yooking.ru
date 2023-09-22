import "./Buttons.css"
import {Link} from "react-router-dom";

export const ButtonIcon = ({icon, name, handler, style, styleText, flexGrow, width, link}) => {
    return (
        <Link to={link}
            className={style}
            onClick={handler}
            style={{
                width: width,
                flexGrow: flexGrow
            }}
        >
            <span className="iconBtn">{icon}</span>
            <span className={styleText}>{name}</span>
        </Link>
    )
}
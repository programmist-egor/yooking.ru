import "./Buttons.css"
import {Link} from "react-router-dom";

export const ButtonIcon = ({icon, name,ml,mt, handler,background, mb, style, styleText, flexGrow, width, link}) => {
    return (
        <Link to={link}
            className={style}
            onClick={handler}
            style={{
                background: background,
                width: width,
                marginLeft: ml,
                flexGrow: flexGrow,
                marginBottom: mb,
                marginTop: mt
            }}
        >
            <span className="iconBtn">{icon}</span>
            <span className={styleText}>{name}</span>
        </Link>
    )
}
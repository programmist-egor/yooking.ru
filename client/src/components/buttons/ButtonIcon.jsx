import "./Buttons.css"

export const ButtonIcon = ({icon, name, handler, style}) => {
    return (
        <div
            className={style}
            onClick={handler}
        >
            <span className="iconBtn">{icon}</span>
            <span className="text__content__white__20">{name}</span>
        </div>
    )
}
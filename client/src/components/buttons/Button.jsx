import "./Buttons.css"

export const Button = (
    {
        name, handler, style, styleText, padding, marginLeft, marginTop, color, height
}) => {
    return (
        <div
            className={style}
            onClick={handler}
            style={{
                background: color,
                marginLeft: marginLeft,
                marginTop: marginTop
            }}
        >
            <span
                className={styleText}
                style={{
                    paddingLeft: padding,
                    paddingRight: padding,
                    height: height
                }}
            >{name}</span>
        </div>
    )
}
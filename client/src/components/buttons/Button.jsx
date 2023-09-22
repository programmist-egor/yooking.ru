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
                marginTop: marginTop,
                height: height
            }}
        >
            <span
                className={styleText}
                style={{
                    paddingLeft: padding,
                    paddingRight: padding,

                }}
            >{name}</span>
        </div>
    )
}
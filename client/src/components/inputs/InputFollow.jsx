import "./Inputs.css"

export const InputFollow = ({value, handler}) => {
    return (
        <input
            type="text"
            className="inputFollow"
            value={value}
            onChange={handler}
            placeholder="Ваша электронная почта"
        />
    )
}
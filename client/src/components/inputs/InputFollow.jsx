import "./Inputs.css"
import {useDispatch, useSelector} from "react-redux";
import {handlerFollowUs} from "../../store/Main";

export const InputFollow = () => {
    const dispatch = useDispatch()
    const followUs = useSelector(state => state.main.followUs);
    const emailFollow = (e) => {
        dispatch(handlerFollowUs(e.target.value))
    }
    return (
        <input
            type="email"
            className="inputFollow"
            value={followUs}
            onChange={emailFollow}
            placeholder="Ваша электронная почта"
        />
    )
}
import {Button} from "./Button";
import {BLACK} from "../../theme/colors";
import {Sort} from "../modals/Sort";
import {useDispatch, useSelector} from "react-redux";
import {modalSortHandler} from "../../store/Main";

export const ButtonSort = () => {
    const dispatch = useDispatch()
    const modalSort = useSelector(state => state.main.modalSort);
    return (
        <div style={{
            position: "relative"
        }}>
            <div
                className="row__c__fe"
                style={{
                    marginTop: "10px",
                    marginBottom: "10px"
                }}
            >
                <Button
                    name={"Сортировать"}
                    style={"sort"}
                    styleText={"text__content__white__14"}
                    handler={() => dispatch(modalSortHandler(true))}
                    padding={20}
                />
            </div>
            <Sort
                style={modalSort ? "modal__sort" : "modal__none"}
                handleLang={() => dispatch(modalSortHandler(false))}
            />
        </div>
    )
}
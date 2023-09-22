import {GREY} from "../../theme/colors";
import {Sort} from "../modals/Sort";
import {useState} from "react";
import {Icon24ChevronDown} from "@vkontakte/icons";

export const ButtonSort = () => {

    const [modalSort, setModalSort] = useState(false)
    return (
        <div>
            <div style={{position: "relative", width: "100%"}}>
                <div
                    className="sort"
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        cursor: "pointer",
                        width: "180px"
                    }}
                    onClick={() => setModalSort(!modalSort)}
                >
                    <span className="text__content__white__14" style={{marginRight: "10px"}}>Сортировать</span>
                    <span className={modalSort ? 'iconDate' : "iconBtn"}>
                        <Icon24ChevronDown color={GREY}/>
                    </span>
                </div>
                <Sort
                    style={modalSort ? "modal__sort  tablet__661__filter " : "modal__none"}
                    handleSort={() => setModalSort(!modalSort)}
                />
            </div>
        </div>
    )
}
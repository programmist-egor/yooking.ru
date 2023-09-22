import {ButtonCounter} from "../buttons/ButtonCounter";
import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Button} from "../buttons/Button";
import {useDispatch} from "react-redux";
import {
    handlerAddChild,
    handlerAddGuest,
    handlerDelChild,
    handlerDelGuest,
    handlerEditOldChild
} from "../../store/Search";
import {RED} from "../../theme/colors";

export const GuestHotel = ({style, guest, child, handler, checkOld, styles}) => {
    const dispatch = useDispatch()
    const old = [
        {id: 0, name: "до года",}, {id: 1, name: "1 год",}, {id: 2, name: "2 года",},
        {id: 3, name: "3 года",}, {id: 4, name: "4 года",}, {id: 5, name: "5 лет",},
        {id: 6, name: "6 лет",}, {id: 7, name: "7 лет",}, {id: 8, name: "8 лет",},
        {id: 9, name: "9 лет",}, {id: 10, name: "10 лет",}, {id: 11, name: "11 лет",},
        {id: 12, name: "12 лет",}, {id: 13, name: "13 лет",}, {id: 14, name: "14 лет",},
        {id: 15, name: "15 лет",}, {id: 16, name: "16 лет",}, {id: 17, name: "17 лет",},
    ]

    const handlerChooseOld = (e, id) => {
        dispatch(handlerEditOldChild({idChild: id, old: e.target.value}))
    }

    return (
        <div className={style}>
            <div className="modal__content__guest" style={styles}>
                <div className="modal__body">
                    <div className="column__fs"
                        style={{
                            marginBottom: "10px",
                            marginLeft: "5px",
                            marginRight: "10px"
                        }}
                    >
                        <div>
                            <div className="column__fs">
                                <div
                                    className="row__sb__c"
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "5px",
                                        borderBottom: "1px solid var(--grey-white)",
                                        paddingBottom: "10px"
                                    }}
                                >
                                    <div className="column__fs">
                                        <span className="text__content__black__14">Взрослые</span>
                                        <span className="text__content__grey__12">от 18 лет</span>
                                    </div>
                                    <ButtonCounter
                                        count={guest}
                                        style={"row__sb__c counterGuestBtn"}
                                        handleAdd={() => dispatch((handlerAddGuest(1)))}
                                        handleDel={() => dispatch((handlerDelGuest(1)))}
                                    />
                                </div>
                                <div
                                    className="row__sb__c"
                                    style={{
                                        marginTop: "5px",
                                        marginBottom: "10px",
                                        borderBottom: "1px solid var(--grey-white)",
                                        paddingBottom: "10px"
                                    }}
                                >
                                    <div className="column__fs">
                                        <span className="text__content__black__14">Дети</span>
                                        <span className="text__content__grey__12">до 17 лет</span>
                                    </div>
                                    <ButtonCounter
                                        handleAdd={() => dispatch((handlerAddChild(child.length + 1)))}
                                        handleDel={() => dispatch((handlerDelChild(child.length - 1)))}
                                        count={child.length}
                                        style={"row__sb__c counterGuestBtn"}
                                    />
                                </div>
                                {child.length === 0 ?
                                    ""
                                    :
                                    child.map(item => (
                                        <div
                                            className="row__sb__c"
                                            key={item.id}
                                            style={{
                                                marginTop: "5px",
                                                marginBottom: "10px",
                                                borderBottom: "1px solid var(--grey-white)",
                                                paddingBottom: "10px"
                                            }}
                                        >

                                            <FormControl sx={{m: 1, width: "100%"}} size="small">
                                                <InputLabel id="demo-select-small-label">Возраст</InputLabel>
                                                <Select
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    value={item.old}
                                                    label="Возраст"
                                                    onChange={(e) => handlerChooseOld(e, item.id)}
                                                >
                                                    <MenuItem  value="Возраст">
                                                        { checkOld ? <b style={{color: RED}}>Укажите возраст</b> : <b>Возраст</b>}
                                                    </MenuItem>
                                                    {old.map(old => (
                                                        <MenuItem
                                                            value={old.id}
                                                            key={old.id}
                                                        > {old.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                        <div
                            className="row__c__c"
                        >
                            <Button
                                style={"doneBtn"}
                                name={"Применить"}
                                handler={handler}
                                styleText={"text__content__white__16"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
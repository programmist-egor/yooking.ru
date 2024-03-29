import {MenuItem} from "@mui/material";
import React from "react";
import {handlerLangChoose} from "../../store/Main";
import {useDispatch} from "react-redux";
import {langData} from "../../utils/dataLang";

export const Lang = ({style, handleLang}) => {
    const dispatch = useDispatch()
    return (
        <div className={style}
             onClick={handleLang}
        >
            <div className="modal__content__lang">
                <div className="modal__body" >
                    {langData.map(lang => (
                        <MenuItem
                            value={lang.name}
                            key={lang.id}
                            onClick={() => dispatch(handlerLangChoose({id: lang.id, name: lang.name, img: lang.img}))}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",

                                }}
                            >
                                <img
                                    src={lang.img}
                                    alt="ru"
                                    width={22}
                                    height={22}
                                    style={{
                                        marginRight: "10px",
                                        border: "1px solid white",
                                        borderRadius: "50%",
                                        boxShadow: "0 0 5px var(--grey)"
                                }}
                                /><span className="text__content__black__14">{lang.name}</span>
                            </div>
                        </MenuItem>
                    ))}
                </div>
            </div>
        </div>
    )
}
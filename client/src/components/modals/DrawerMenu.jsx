import {Box, Divider, Drawer, FormControl, InputLabel, List, MenuItem, Select} from "@mui/material";
import React, {useState} from "react"
import {Icon24UserAddOutline, Icon24UserOutline, Icon28Menu} from "@vkontakte/icons";
import {BLACK} from "../../theme/colors";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handlerLangChoose} from "../../store/Main";
import {langData} from "../../utils/dataLang";

export const DrawerMenu = () => {
    const dispatch = useDispatch()
    const langChoose = useSelector(state => state.main.langChoose)
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };


    const ListItem = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 280}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {[
                    {
                        name: 'Войти',
                        link: "/api/login",
                        icon: <Icon24UserOutline color={BLACK}/>
                    },
                    {
                        name: 'Зарегистрироваться',
                        link: "/api/registration",
                        icon: <Icon24UserAddOutline color={BLACK}/>
                    },
                    {
                        name: 'Зарегистрировать объект',
                        link: "extranet.yooking.ru",
                        icon: <Icon24UserOutline color={BLACK}/>
                    },
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.link}
                        className="row__c__fs"
                        style={{cursor: "pointer", height: "30px", paddingLeft: "10px"}}
                    >
                        {item.icon}
                        <span
                            className="text__content__black__16"
                            style={{
                                marginLeft: "5px"
                            }}
                        >{item.name}
                        </span>
                    </Link>
                ))}
            </List>
            <Divider/>
            <FormControl sx={{m: 1, width: "90%"}} size="small">
                <InputLabel id="demo-select-small-label">Язык</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={langChoose.name}
                    label="Язык"
                    onChange={(e) => console.log(e.target.value)}
                >
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
                                    alignItems: "center"
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
                                />{lang.name}
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );

    return (
        <>
            <div
                className="row__c__fe"
                style={{cursor: "pointer"}}
                onClick={toggleDrawer("right", true)}
            >
                <Icon28Menu width={30} height={30} color={BLACK}/>
            </div>
            <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
            >
                {ListItem("right")}
            </Drawer>
        </>
    )
}
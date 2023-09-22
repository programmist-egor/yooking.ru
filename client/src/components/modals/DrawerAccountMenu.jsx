import {Box, Divider, Drawer, FormControl, InputLabel, List, MenuItem, Select} from "@mui/material";
import React, {useState} from "react"
import {Icon24UserAddOutline, Icon24UserOutline, Icon28Menu} from "@vkontakte/icons";
import {BLACK, RED} from "../../theme/colors";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handlerLangChoose} from "../../store/Main";
import ru from "../../img/flags/ru.png"
import usa from "../../img/flags/usa.png"

export const DrawerAccountMenu = () => {
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
                    {name: 'Войти', link: "/Войти", icon: <Icon24UserOutline color={BLACK}/>},
                    {
                        name: 'Зарегистрироваться',
                        link: "/Зарегистрироваться",
                        icon: <Icon24UserAddOutline color={BLACK}/>
                    },
                    {
                        name: 'Зарегистрировать объект',
                        link: "/Зарегистрировать_объект",
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
                    value={langChoose}
                    label="Возраст"
                    onChange={(e) => dispatch(handlerLangChoose(e.target.value))}
                >
                    <MenuItem value="Возраст">
                        <b>Язык</b>
                    </MenuItem>
                    {[{id: 1, name: "Русский", img: ru}, {id: 2, name: "England", img: usa}].map(lang => (
                        <MenuItem
                            value={lang.name}
                            key={lang.id}

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
                                    style={{marginRight: "10px"}}
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
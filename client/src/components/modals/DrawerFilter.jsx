import {Box, Drawer, List,} from "@mui/material";
import React, { useState} from "react"
import {Icon28Menu} from "@vkontakte/icons";
import {BLACK} from "../../theme/colors";
import {useDispatch, useSelector} from "react-redux";
import {Filter} from "../filters/Filter";

export const DrawerFilter = ({Tablet426_906, Laptop907}) => {
    const dispatch = useDispatch()
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
            <Filter
                // Tablet426_906={Tablet426_906}
                // Laptop907={Laptop907}
            />
        </Box>
    );

    return (
        <>
            <div
                className="row__c__fe"
                style={{cursor: "pointer"}}
                onClick={toggleDrawer("left", true)}
            >
                <Icon28Menu width={30} height={30} color={BLACK}/>
            </div>
            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {ListItem("left")}
            </Drawer>
        </>
    )
}
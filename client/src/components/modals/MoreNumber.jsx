import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import {Icon24Cancel} from "@vkontakte/icons";
import {GREY_BLACK} from "../../theme/colors";
import { openMoreNumberHandler} from "../../store/HotelsList";
import {useEffect, useState} from "react";
import {Spinner} from "../spinner/Spinner";
import {MoreNumberItem} from "../MoreNumberItem/MoreNumberItem";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
};


export const MoreNumber = ({type}) => {
    const dispatch = useDispatch()
    const openMoreNumber = useSelector(state => state.hotels_list.openMoreNumber)
    const loadMoreNumberModalHandler = useSelector(state => state.hotels_list.loadMoreNumberModalHandler)
    const number = useSelector(state => state.hotels_list.dataNumber)
    const categoryId = useSelector(state => state.hotels_list.categoryId)
    const [width, setWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const closeMobileCodeModal = () => {
        dispatch(openMoreNumberHandler(!openMoreNumber))
    }


    return (
        <>
            <Modal
                open={openMoreNumber}
                onClose={() => closeMobileCodeModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="column">
                        <div className="row__sb__c">
                            <h3>Об номере</h3>
                            <span onClick={() => closeMobileCodeModal()}
                                  style={{cursor: "pointer"}}>
                               <Icon24Cancel color={GREY_BLACK}/>
                            </span>
                        </div>
                        <div className="column modal__center__scroll" style={{height: "550px"}}>
                            {loadMoreNumberModalHandler ?
                                <Spinner/>
                                :
                                number ?
                                    <MoreNumberItem type={type} number={number} categoryId={categoryId}/>
                                    :
                                    <div className="row__c__c">
                                        <span className="text__content__grey__16">Нет свободных номеров</span>
                                    </div>
                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
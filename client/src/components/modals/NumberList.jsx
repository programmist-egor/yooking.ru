import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import {Icon24Cancel} from "@vkontakte/icons";
import {GREY_BLACK} from "../../theme/colors";
import { openNumberListHandler} from "../../store/HotelsList";
import {useEffect, useState} from "react";
import {ListNumberCard} from "../cards/ListNumberCard";
import {Spinner} from "../spinner/Spinner";

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


export const NumberList = ({dataHotelNumber}) => {
    const dispatch = useDispatch()
    const openNumberList = useSelector(state => state.hotels_list.openNumberList)
    const loadNumberListModal = useSelector(state => state.hotels_list.loadNumberListModal)
    const dataNumbersList = useSelector(state => state.hotels_list.dataNumbersList)
    const [width, setWidth] = useState(window.innerWidth);


    console.log("dataNumbersList", dataNumbersList);
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
        dispatch(openNumberListHandler(!openNumberList))
    }


    return (
        <>
            <Modal
                open={openNumberList}
                onClose={() => closeMobileCodeModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="column">
                        <div className="row__sb__c">
                            <h3>Выберите свободный номер</h3>
                            <span onClick={() => closeMobileCodeModal()}
                                  style={{cursor: "pointer"}}>
                               <Icon24Cancel color={GREY_BLACK}/>
                            </span>
                        </div>
                        <div className="column block__center__scroll" style={{height: "550px"}}>
                            {loadNumberListModal ?
                                <Spinner/>
                                :
                                dataNumbersList.length !== 0 ?
                                    dataNumbersList.map(number => {
                                        return (
                                            <ListNumberCard
                                                key={number.id}
                                                name={number.name}
                                                id={number.id}
                                                hotelId={number.hotelId}
                                                number={number}
                                                categoryId={number.categoryId}
                                                guestCount={number.guestCount.length}
                                                area={number.area}
                                                priceBase={number.priceBase}
                                                bedroom={number.countBedrooms}
                                                hasWiFi={number.has_wifi.value}
                                                width={width}
                                                dataHotelNumber={dataHotelNumber}
                                            />
                                        )
                                    })
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
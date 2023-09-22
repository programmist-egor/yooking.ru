import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import { finishedBookingHandler} from "../../store/ClientData";
import {Icon24Cancel, Icon24CheckCircleFilledBlue} from "@vkontakte/icons";
import {GREY_BLACK, ORANGE} from "../../theme/colors";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function FinishedBooking() {
    const dispatch = useDispatch()
    const finishedBooking = useSelector(state => state.client__data.finishedBooking)

    const closeMobileCodeModal = () => {
        dispatch(finishedBookingHandler(!finishedBooking))
    }

    return (
        <div>
            <Modal
                open={finishedBooking}
                onClose={() => closeMobileCodeModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="column">
                        <div className="row__sb__c">
                            <h3>Запрос на бронь отправлен</h3>
                            <span onClick={() => dispatch(finishedBookingHandler(!finishedBooking))}
                                  style={{cursor: "pointer"}}>
                               <Icon24Cancel color={GREY_BLACK}/>
                            </span>
                        </div>
                        <div className="column__c" style={{margin: "15px"}}>
                            <Icon24CheckCircleFilledBlue color={ORANGE} width={50} height={50}/>
                        </div>
                        <div className="row__c__c">
                            <span
                                className="text__content__black__14">В ближайшее время с Вами свяжется менеджер.</span>
                        </div>
                        <div className="column__c" style={{margin: "15px"}}>
                            <span className="text__content__black__b__16">Наш номер</span>
                            <span className="text__content__black__b__20" style={{marginTop: "10px"}}>8 800 556 69 99</span>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import { verifedEmailHandler} from "../../store/ClientData";
import {Icon24Cancel, Icon28CheckCircleFill} from "@vkontakte/icons";
import {GREY_BLACK} from "../../theme/colors";

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

export default function VerifedEmail() {
    const dispatch = useDispatch()
    const verifedEmail = useSelector(state => state.client__data.verifedEmail)
    const clientData = useSelector(state => state.client__data.dateClient)
    const closeMobileCodeModal = () => {
        dispatch(verifedEmailHandler(false))
    }

    return (
        <div>
            <Modal
                open={verifedEmail}
                onClose={() => closeMobileCodeModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="column">
                        <div className="row__sb__c">
                            <h3>Подтвердите Вашу почту</h3>
                            <span onClick={() => dispatch(verifedEmailHandler(false))}
                                  style={{cursor: "pointer"}}>
                               <Icon24Cancel color={GREY_BLACK}/>
                            </span>
                        </div>
                        <div className="column__c" style={{margin: "15px"}}>
                            <Icon28CheckCircleFill  width={50} height={50}/>
                        </div>
                        <div className="row__c__c">
                            <span
                                className="text__content__black__14">На Вашу почту <span className="text__content__orange__b__16">{clientData.email}</span> отправлена ссылка для подтверждения email.
                            </span>
                        </div>
                      <p className="text__content__grey__12">После подтверждения email, войдите в прилоложение.</p>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
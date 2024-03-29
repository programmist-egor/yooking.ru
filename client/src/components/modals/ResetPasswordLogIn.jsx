import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordLogInHandler} from '../../store/ClientData';
import {Icon24Cancel} from '@vkontakte/icons';
import {GREEN, GREY_BLACK} from '../../theme/colors';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export default function ResetPasswordLogIn() {
    const dispatch = useDispatch();
    const resetPasswordLogIn = useSelector((state) => state.client__data.resetPasswordLogIn);
    const navigate = useNavigate();
    const [errorLogIn, setErrorLogIn] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [sendEmail, setSendEmail] = useState(false);

    const resetEmailSchema = yup.object().shape({
        email_login: yup.string().email('Адрес электронной почты не действителен').required('Обязательное поле'),
    });

    const closeMobileCodeModal = () => {
        dispatch(resetPasswordLogInHandler(false));
    };

    return (
        <div>
            <Modal
                open={resetPasswordLogIn}
                onClose={() => dispatch(resetPasswordLogInHandler(false))}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Formik
                        initialValues={{email_login: ''}}
                        validationSchema={resetEmailSchema}
                        onSubmit={() => console.log()}
                    >
                        {({isSubmitting}) => (
                            <Form className="loginResetEmail" autoComplete='off'>
                                <div className='column'>
                                    <div className='row__sb__c'>
                                        <h3>Восстановить доступ</h3>
                                        <span
                                            onClick={() => dispatch(resetPasswordLogInHandler(false))}
                                            style={{cursor: 'pointer'}}
                                        >
                                            <Icon24Cancel color={GREY_BLACK}/>
                                        </span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Field
                                        id='email_reset_login'
                                        type='email'
                                        placeholder='Введите Email'
                                        className='login__input'
                                        name='email_login'
                                    />
                                    <ErrorMessage name='email_login' component='p' className='error'/>

                                    <button
                                        type='submit'
                                        className='login__button'
                                        disabled={isSubmitting}
                                    >
                                        Восстановить
                                    </button>
                                    {errorLogIn ? <p className='error'>Пользователь не найден!</p> : ''}
                                    {errorEmail ? <p className='error'>Такой Email не зарегистрирован!</p> : ''}
                                    {sendEmail ?
                                        <p className='error' style={{color: GREEN}}>На Вашу почту отправлено
                                            сообщение!</p> : ''}
                                </div>
                            </Form>
                        )}
                    </Formik>

                </Box>
            </Modal>
        </div>
    );
}

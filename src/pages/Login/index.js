import { useState, useEffect } from 'react';
import './login.scss';
import Form from './Common/Form'
import {useHistory} from "react-router-dom";
import {Col, Row} from 'react-bootstrap'
import { NounMail } from '../../assets'
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const handleAction = (id) => {
        const authentication = getAuth();
        if (id === 1) {
            signInWithEmailAndPassword(authentication, email, password)
                .then((response) => {
            
                    history.push('/admin')
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                    
                })
                .catch((error) => {
                    console.log(error.code)
                    if (error.code === 'auth/wrong-password') {
                        toast.error('Silahkan Mengecek Kata Sandi Anda');
                    }
                    if (error.code === 'auth/user-not-found') {
                        toast.error('Silahkan Mengecek Email Anda');
                    }
                    if (error.code === 'auth/invalid-email') {
                        toast.error('Silahkan Mengecek Email Anda');
                    }
                })
        }
        // if (id === 2) {
        //     createUserWithEmailAndPassword(authentication, email, password)
        //         .then((response) => {
        //             history.push('/admin')
        //             sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        //         })
        //         .catch((error) => {
        //             if (error.code === 'auth/email-already-in-use') {
        //                 alert('Email Already in Use');
        //             }
        //         })
        // }
    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            history.push('/admin')
        }
    }, [])
    return (
        <div className="Login">
            <>
                <div className="login-page">
                <ToastContainer />
                    <Row className="content-page">
                        <Col className="left-side">
                            <div className="background-cover">
                                <div className="logo-content">
                                </div>
                            </div>
                        </Col>
                        <Col bsPrefix="right-side">
                            <div className="body-content">
                                <p className="font-bold font-24 margin-bottom-32">Slahkan Mengisi Data</p>
                                <Form
                                    title="Login"
                                    setEmail={setEmail}
                                    setPassword={setPassword}
                                    handleAction={() => handleAction(1)}
                                />
                            </div>
                            <div className="footer-content">
                                <p className="font-normal font-12 text-center margin-bottom-12">Jika butuh Bantuan hubungi layanan Bantuan Kami</p>
                                <span className="footer-mail">
                                    <img src={NounMail} alt="NounMail" />
                                    <p className="font-bold font-16 ml-3">jakomkris@gmail.com</p>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        </div>
    );
}

export default Login;

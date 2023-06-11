import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import './admin.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        history.push('/login')
    }
    let history = useHistory();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        console.log(authToken)
        if (authToken) {
            history.push('/admin')
        }

        if (!authToken) {
            history.push('/login')
        }
    }, [])
    return (
        <div className="admin-page content-page">
            <ToastContainer />

            <div className="container-page">
                <p className="title ">Selamat datang</p>
                <p>Selamat Datang di Halaman Admin</p>
                <p>Pada Halaman Admin Anda Dapat Melakukan Pengelolaan Data Gereja</p>
                <Button onClick={handleLogout}>Log out</Button>
            </div>
        </div>

    )
}

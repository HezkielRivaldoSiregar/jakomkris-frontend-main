import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Home() {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    let navigate = useHistory();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        console.log(authToken)
        if (authToken) {
            
            navigate('/admin')
            
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            Home Page

            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

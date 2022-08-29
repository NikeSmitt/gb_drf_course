import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginForm = ({saveTokenAndUsername}) => {

    const navigate = useNavigate()

    const [authData, setAuthData] = useState({username: '', password: ''})

    const get_token = (e) => {
        e.preventDefault()
        const loginUrl = 'http://127.0.0.1:8000/api-token-auth/'
        axios.post(loginUrl, authData)
            .then((response) => {
                saveTokenAndUsername(response.data.token, authData.username)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='container '>
            <form className='loginForm d-flex flex-column mx-auto'>
                <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">Username</label>
                    <input type="text"
                           className="form-control"
                           value={authData.username}
                           onChange={e => setAuthData({...authData, username: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password"
                           className="form-control"
                           value={authData.password}
                           onChange={e => setAuthData({...authData, password: e.target.value})}
                    />
                </div>
                <button className='btn btn-primary' onClick={get_token}>Sign in</button>
            </form>
        </div>
    )
};

export default LoginForm;
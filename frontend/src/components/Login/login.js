import React, { useState } from 'react'
import { logUserIn } from './loginUtil'
import './login.css'
import { FaFacebookF, FaTwitterSquare } from "react-icons/fa";
import jwt_decode from 'jwt-decode'

export default function Login({ history, setToken }) {

    let [userData, setUserData] = useState({})
    let [errorMessage, setErrorMessage] = useState("");

    const getToSignUp = e => {
        e.preventDefault()
        history.push('/register')
    }
    const handleChangeEvent = (e, title) => {
        let value = e.target.value
        setUserData({ ...userData, [title]: value })
    }

    const submitData = e => {
        e.preventDefault()
        logUserIn(userData)
            .then(response => response.data)
            .then(data => {
                let { token } = data;
                
                sessionStorage.setItem('authToken', token);
                setToken(token);
                const tok = sessionStorage.getItem("authToken")
                console.log(jwt_decode(tok).user.role)
                let role = jwt_decode(tok).user.role;
                if(role == 1){
                    history.push('/admin')
                } else {
                    history.push('/routes')
                }
                
            }).catch(e => {
                setErrorMessage("Login Failed!");
                setTimeout(() => { setErrorMessage("") }, 2500);
            })
    }



    return (
        <div className="container">
            <section className="myform-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="form-area login-form">
                                <div className="form-input">
                                    <h2>Enter Login Credentials</h2>
                                    <h4 style={{ margin: "10px 20px", color: "red" }}>{errorMessage}</h4>
                                    <form onSubmit={(e) => { submitData(e) }}>
                                        <div className="form-group">
                                            <input className="loginInfo" type="email" name="name" required onChange={e => handleChangeEvent(e, 'email')} />
                                            <label>Email-Id</label>
                                        </div>
                                        <div className="form-group">
                                            <input className="loginInfo" type="password" name="password" required onChange={e => handleChangeEvent(e, 'password')} />
                                            <label>password</label>
                                        </div>
                                        <div className="myform-button">
                                            <button type="submit" className="myform-btn">Login</button>
                                        </div>
                                        <div style={{ marginTop: "20px" }}>
                                            <span className="form-text text-muted signup-text">New User?
                                            </span>
                                            <span className="signUPtext"><a href="/#" onClick={(e) => getToSignUp(e)}>Sign-Up</a></span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    )
}

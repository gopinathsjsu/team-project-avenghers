import React, { useState } from 'react'
import { registerUser } from './registerUtil'
import { FaFacebookF, FaTwitterSquare } from "react-icons/fa";
import './register.css'

export default function Signup({ history }) {

    let [newUser, setnewUser] = useState({})

    // sign in
    const getToSignIn = e => {
        e.preventDefault()
        history.push('/login')
    }

    const handleChangeEvent = e => { }

    // submiting data to backend
    const submitData = e => {
        e.preventDefault()
        registerUser(newUser)
            .then(response => response.data)
        history.push('/login')
    }

    return (
        <div className="container" style={{marginTop: "40px"}}>
            <div className="col-md-12" style={{display: "flex"}}>
                <form className="rform" onSubmit={e => submitData(e)}>
                    <h2 style={{margin: "10px 20px"}}>Register</h2>
                    <div className="form-group2">
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" className="form-control sgnUp" onChange={e => handleChangeEvent(e, 'name')} />
                    </div>
                    <div class="form-group2">
                        <label htmlFor="email">Email-ID:</label>
                        <input required id="email" type="email" className="form-control sgnUp" onChange={e => handleChangeEvent(e, 'email')} />
                    </div>
                    <div class="form-group2">
                        <label htmlFor="mob-number">Mobile-No.:</label>
                        <input required id="mob-number" type="text" className="form-control sgnUp" onChange={e => handleChangeEvent(e, 'mobile')} />
                    </div>
                    <div class="form-group2">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input required id="dob" type="text" className="form-control sgnUp" onChange={e => handleChangeEvent(e, 'dob')} />
                    </div>
                    <div class="form-check form-check-inline rd">
                        <input required class="form-check-input" type="radio" id="Male" name="gender" value="Male" onChange={e => handleChangeEvent(e, 'gender')} />
                        <label class="form-check-label" htmlFor="Male">Male</label>
                    </div>
                    <div class="form-check form-check-inline rd">
                        <input required class="form-check-input" type="radio" id="Female" name="gender" value="Female" onChange={e => handleChangeEvent(e, 'gender')} />
                        <label class="form-check-label" htmlFor="Female">Female</label>
                    </div>
                    <div class="form-group2">
                        <label htmlFor="password">Password :</label>
                        <input required id="password" type="password" className="form-control sgnUp" onChange={e => handleChangeEvent(e, 'password')} />
                    </div>
                    <div class="form-group2">
                        <input required type="submit" value="submit" className="btn-primary btnn form-submit sub-btn sgnUp" />
                    </div>
                    <div>
                        <small className="form-text text-muted link-text">Already a User?
                        </small>
                        <span className="signuptext"><a href="/#" onClick={(e) => getToSignIn(e)}>Sign-In</a></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

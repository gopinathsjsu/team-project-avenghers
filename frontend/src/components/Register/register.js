import React, { useState } from 'react'
import { registerUser } from './registerUtil'
import './register.css'

export default function Register({ history }) {

    let [newUser, setnewUser] = useState({})
    let [registrationErrorMessage, setRegistrationErrorMessage] = useState("");
    let [registrationMessage, setRegistrationMessage] = useState("");

    // Goto Login Page
    const getToSignIn = e => {
        e.preventDefault()
        history.push('/login')
    }

    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value
        setnewUser({ ...newUser, [field]: fieldValue })
    }

    // submiting data to backend
    const submitData = async e => {
        e.preventDefault()
        try {
            const { data: { status, error } } = await registerUser(newUser);
            if (!status) throw new Error(error);
            setRegistrationErrorMessage("");
            setRegistrationMessage("Registration Successful.");
            setTimeout(() => { history.push('/login') }, 1500);
        } catch (e) {
            setRegistrationErrorMessage(e.message);
            setTimeout(() => { setRegistrationErrorMessage("") }, 3000);
        }
    }

    return (
        <div className="container" style={{ marginTop: "40px" }}>
            <div className="col-md-12" style={{ display: "flex" }}>
                <form className="rform" onSubmit={e => submitData(e)}>
                    <h2 style={{ margin: "10px 20px" }}>Register</h2>
                    <h5 style={{ margin: "10px 20px", color: "red" }}>{registrationErrorMessage}</h5>
                    <h4 style={{ margin: "10px 20px", color: "green" }}>{registrationMessage}</h4>
                    <div className="form-group2">
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" className="form-control sgnUp" onChange={e => handleChangeEvent(e, 'name')} />
                    </div>
                    <div className="form-group2">
                        <label htmlFor="email">Email-ID:</label>
                        <input required id="email" type="email" className="form-control sgnUp" onChange={e => handleChangeEvent(e, 'email')} />
                    </div>
                    <div className="form-group2">
                        <label htmlFor="mob-number">Mobile-No.:</label>
                        <input required id="mob-number" type="text" className="form-control sgnUp" onChange={e => handleChangeEvent(e, 'mobile')} />
                    </div>
                    <div className="form-group2">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input required id="dob" type="date" className="form-control sgnUp" onChange={e => handleChangeEvent(e, 'dob')} />
                    </div>
                    <div className="form-check form-check-inline rd">
                        <input required className="form-check-input" type="radio" id="Male" name="gender" value="male" onChange={e => handleChangeEvent(e, 'gender')} />
                        <label className="form-check-label" htmlFor="Male">Male</label>
                    </div>
                    <div className="form-check form-check-inline rd">
                        <input required className="form-check-input" type="radio" id="Female" name="gender" value="female" onChange={e => handleChangeEvent(e, 'gender')} />
                        <label className="form-check-label" htmlFor="Female">Female</label>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="password">Password :</label>
                        <input required id="password" type="password" className="form-control sgnUp" onChange={e => handleChangeEvent(e, 'password')} />
                    </div>
                    <div className="form-group2">
                        <input required type="submit" value="submit" className="btn-primary btn btn-block form-submit sub-btn sgnUp" />
                    </div>
                    <div className="fl-r">
                        <span className="form-text text-muted link-text">Already a User?
                        </span>
                        <span className="signuptext"><a href="/#" onClick={(e) => getToSignIn(e)}>Sign-In</a></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

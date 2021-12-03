import React from "react";

export default function Logout({ history }) {
    sessionStorage.removeItem('authToken')
    localStorage.removeItem('reservedSeats')
    localStorage.removeItem('nameData')
    localStorage.clear()
    history.push('/')
    return <div>Logging out...</div>;
}
import React from "react";

export default function Logout({ history, unsetToken }) {
    sessionStorage.removeItem('authToken')
    localStorage.removeItem('reservedSeats')
    localStorage.removeItem('nameData')
    localStorage.clear();
    sessionStorage.clear();
    unsetToken("");
    history.push('/')
    return <div>Logging out...</div>;
}
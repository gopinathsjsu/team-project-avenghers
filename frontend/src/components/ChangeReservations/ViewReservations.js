import React from 'react'
import './Reservation.css'
export default function ViewReservation({ history }) {

    const handleSignOut = e => {
        e.preventDefault()
        sessionStorage.removeItem('authToken')
        localStorage.removeItem('reservedSeats')
        localStorage.removeItem('nameData')
        localStorage.clear()
        history.push('/')
    }
    const handleBookAgainIcon = e => {
        e.preventDefault()
        history.push('/routes')
    }
    // const getLocationData = () => {
    //     let from = localStorage.getItem("start")
    //     let to = localStorage.getItem("destination")
    //     return (
    //         <div>
    //             <p>From:  {from}</p>
    //             <p>To:  {to}</p>
    //         </div>
    //     )
    // }
    // const getPassengerName = () => {
    //     let nameArray = localStorage.getItem("nameData")
    //     let names = JSON.parse(nameArray)
    //     return names.map((name, idx) => {
    //         return (
    //             <div key={idx}>
    //                 <p className="names">{name}</p>
    //             </div>
    //         )
    //     })
    // }
    // const getSeatNumbers = () => {
    //     let noArray = localStorage.getItem("reservedSeats")
    //     let arr = JSON.parse(noArray)
    //     return arr.map((element, idx) => {
    //         return (
    //             <div key={idx}>
    //                 <p classsName="seatNo">{element}</p>
    //             </div>
    //         )
    //     })
    // }
    // const getIdNumber = () => {
    //     let tokenData = localStorage.getItem("selectedBusId")
    //     return (
    //         <p className="idData">
    //             {tokenData}
    //         </p>
    //     )
    // }
    // const getDateValue = () => {
    //     let dat = localStorage.getItem("date")
    //     return <p>On: {dat}, 10 AM (Hourly commute)</p>
    // }
    return (

        <div className="container">
            <div>
                    <h3>Your Bookings!</h3>
                    <div class="button medium-btn" align="center" >Update/Cancel</div>
            </div>

        </div>

    )
}

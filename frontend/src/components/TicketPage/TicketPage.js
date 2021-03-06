import React from 'react'
import './TicketPage.css'
export default function TicketPage({ history }) {

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
    const getLocationData = () => {
        let from = localStorage.getItem("start")
        let to = localStorage.getItem("destination")
        return (
            <div>
                <p>From:  {from}</p>
                <p>To:  {to}</p>
            </div>
        )
    }
    const getPassengerName = () => {
        let nameArray = localStorage.getItem("nameData")
        let names = JSON.parse(nameArray)
        return names.map((name, idx) => {
            return (
                <div key={idx}>
                    <p className="names">{name}</p>
                </div>
            )
        })
    }
    const getSeatNumbers = () => {
        let noArray = localStorage.getItem("reservedSeats")
        let arr = JSON.parse(noArray)
        return arr.map((element, idx) => {
            return (
                <div key={idx}>
                    <p classsName="seatNo">{element}</p>
                </div>
            )
        })
    }
    const getIdNumber = () => {
        let tokenData = localStorage.getItem("selectedBusId")
        return (
            <p className="idData">
                {tokenData}
            </p>
        )
    }
    const getDateValue = () => {
        let dat = localStorage.getItem("date")
        return <p>On: {dat}, 10 AM (Hourly commute)</p>
    }
    return (

        <div className="container" style={{ "minHeight": "100vh" }}>
            <div>
                <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
              
                    </div>
                </nav>
            </div>
            <div className="tpMain">
                <article className="ticket">
                    <header className="ticket__wrapper">
                        <div className="ticket__header">
                            1 ???? AvengHerS
                        </div>
                    </header>
                    <div className="ticket__divider">
                        <div className="ticket__notch"></div>
                        <div className="ticket__notch ticket__notch--right"></div>
                    </div>
                    <div className="ticket__body">
                        <section className="ticket__section">
                            {getLocationData()}
                            {getSeatNumbers()}
                            <p>Your seats are together <span>{getDateValue()}</span></p>
                        </section>
                        <section className="ticket__section">
                            <h3>Passenger Names</h3>
                            {getPassengerName()}
                        </section>
                        <section className="ticket__section">
                            <h3>Payment Method</h3>
                            <p>Credit Card</p>
                        </section>
                    </div>
                    <footer className="ticket__footer">
                        <p>Transaction-ID</p>
                        <p>89PJ12345</p>
                    </footer>
                </article>
            </div>

        </div>

    )
}

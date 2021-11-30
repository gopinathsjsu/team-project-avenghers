import React from "react";
import Card from "react-credit-cards";
import './PaymentTab.css'
import jwt_decode from 'jwt-decode'

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
} from "./utils";
import "react-credit-cards/es/styles-compiled.css";

export default class App extends React.Component {

    state = {
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: "",
        token: "",
        useMiles:false
    }

    componentDidMount() {
        const tok = sessionStorage.getItem("authToken")
        //const decoded = jwt_decode(tok)
        //this.setState({ token: decoded.user })
    }
    

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({ formData });
        this.form.reset();
    };

    handleFocus = ({event}) => {
        this.State({
            checked: true 
        });
    };





    moveToTicketPage = (e) => {
        e.preventDefault()
        localStorage.setItem("paymentData", JSON.stringify(this.state.token))
        window.location.href = "/getTicket"
    }

    renderNamesOfPassenger = () => {
        let passArray = localStorage.getItem('nameData')
        if (passArray) {
            let nameArray = JSON.parse(passArray)
            return nameArray.map((name, idx) => {
                return (
                    <p key={idx}>{name}</p>
                )
            })
        }
    }

    renderSeatNumbers = () => {
        let seatArray = localStorage.getItem('reservedSeats')
        if (seatArray) {
            let seaArr = JSON.parse(seatArray)
            return seaArr.map((seat, idx) => {
                return (
                    <span key={idx}>{seat}</span>
                )
            })
        }
    }
    useMilesFunction =(event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        this.setState({
            ['useMiles']:value
        })
        console.log(value)
    }

    getSumTotal = () => {
        let count = 0
        let tax = 150
        let miles = 100
        let seatArray = localStorage.getItem('reservedSeats')
        if (seatArray) {
            let seaArr = JSON.parse(seatArray)
            for (let i = 0; i < seaArr.length; i++) {
                count++
            }
            return (
                <div>
                    <hr className="hr3" />
                    <p>{1000 * count}</p>
                    <p>+{miles}</p>
                    <p>+{tax}</p>
                    <p>{(1000 * count) + tax + miles}</p>
                </div>
            )
        }
    }


    render() {
        const { name, number, expiry, cvc, focused, issuer, formData, token } = this.state;

        return (

            <div className="paym">
                <div className="row">


                    <div key="Payment">
                        <div className="App-payment cl-1">
                            <p className="pPayment">Enter Credit card details</p>
                            <Card
                                number={number}
                                name={name}
                                expiry={expiry}
                                cvc={cvc}
                                focused={focused}
                                callback={this.handleCallback}
                            />
                            <form className="credit-form row" ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                                <div className="form-group col-md-12">
                                    <input
                                        type="tel"
                                        name="number"
                                        className="form-control"
                                        placeholder="Card Number"
                                        pattern="[\d| ]{16,22}"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Name"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
    
                                <div className="form-group col-md-6">
                                    <input
                                        placeholder="Valid Thru"
                                        pattern="\d\d/\d\d"
                                        type="tel"
                                        name="ValidThru"

                                        className="form-control"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        type="tel"
                                        name="cvc"
                                        className="form-control"
                                        placeholder="CVV"
                                        pattern="\d{3,4}"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-1">
                                    <input
                                        type="checkbox"
                                        name="useMiles"
                                        className="form-control-sm" 
                                        checked={this.state.useMiles}
                                        onChange={this.useMilesFunction}  

                                    />
                                </div>
                                <div className="form-group col-md-5">
                                    <span className="floatLeft">Use my Miles</span>
                                </div>
                                { this.state.useMiles ? <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        name="useMilesEntered"
                                        className="form-control" 
                                        placeholder="Miles to redeem"

                                    />
                                </div>: null }
                                
                                <input type="hidden" name="issuer" value={issuer} />
                                <div className="form-group col-md-12">
                                    <button onClick={e => this.moveToTicketPage(e)} className="btn btn-success">PAY</button>
                                </div>
                            </form>
                        </div>
                    </div>


                    <div className="App-payment columnTwo">
                    
                        <h3>Unique Travels</h3>
                        <div>
                            <p>BOOKING DETAILS</p>
                            <div className="row">
                                <div className="col-md-6 pt">
                                    <p className="hdng">Username</p>
                                    <hr className="hr3" />
                                    <p className="hdng">Date</p>
                                    <p className="hdng">From</p>
                                    <p className="hdng">To</p>
                                    <hr className="hr3" />
                                    <p className="hdng">Passengers</p>
                                    <p className="usrName">Username</p>
                                    <hr className="hr3" />
                                    <p className="hdng">Ticket price</p>
                                    <p className="hdng">Payment through miles</p>
                                    <p className="hdng">Tax</p>
                                    <p className="hdng">Toal Sum</p>

                                </div>
                                <div className="col-md-6">
                                    <p className="usrName">Username</p>
                                    <hr className="hr3" />
                                    <p className="usrName">10/12/2021</p>
                                    <p className="usrName">{localStorage.getItem("start")}</p>
                                    <p className="usrName">{localStorage.getItem("destination")}</p>
                                    <hr className="hr3" />
                                    <p className="hdng">Seat No </p>
                                    {this.renderSeatNumbers()}
                                    
                                    <p>{this.getSumTotal()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
   



        );
    }
}

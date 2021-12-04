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
        value:"",
        loaderClass:"paym",
        paymentThroughtMiles:0,
        useMiles:false,
        totalTicketPrice:0
    }
   
    componentDidMount() {
        const tok = sessionStorage.getItem("authToken")
        const decoded = jwt_decode(tok);
        console.log(decoded)
        this.setState({ token: decoded.user })
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
        console.log(this.state)
        this.State({
            checked: true 
        });
    };
    generateBookingId = () =>{
        var today = new Date();
        var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate()+''+today.getTime();
        return date
    }

    moveToTicketPage = (e) => {
        e.preventDefault()
        this.setState({
            loaderClass: "paym loader" 
        });
        localStorage.setItem("paymentData", JSON.stringify(this.state.formData))
       // window.location.href = "/getTicket"
        console.log(localStorage)
        let skywardMiles = parseInt(localStorage.getItem("milesCovered"))/10;
        let bookingId = this.generateBookingId();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": this.state.token.name,
                "emailid": this.state.token.email,
                "bookingstatus": "confirmed",
                "date": localStorage.getItem("date"),
                "flightnumber": localStorage.getItem("flightNumber"),
                "MilesCovered": localStorage.getItem("milesCovered"),
                "PriceofTicket": localStorage.getItem("totalTicketPrice"),
                "SeatNumber": localStorage.getItem("reservedSeats"),
                "SkywardMiles": skywardMiles,
                "skywardMilesUsed": this.state.paymentThroughtMiles,
                "passengers":localStorage.getItem("nameData"),
                "Tripstatus": "pending",
                "destination": localStorage.getItem("destination"),
                "flightname": localStorage.getItem("flightName"),
                "startcity": localStorage.getItem("start"),
                "bookingId":bookingId,
            })
        };
        fetch('http://54.159.225.120/bookTicket', requestOptions).then(response => response.json())
            .then(data => {
                this.setState({ postId: data.id })
                this.setState({
                    loaderClass: "paym" 
                });
                window.location.href = "/getTicket"
            });
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
        let seatArray = localStorage.getItem('reservedSeats');
        console.log(seatArray)
        if (seatArray) {
            let seaArr = JSON.parse(seatArray);
            return seaArr.map((seat, idx) => {
                return (
                    <span key={idx}>{seat}</span>
                )
            })
        }
    }
    useMilesFunction =(event) =>{
        console.log(this.state)
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        this.setState({
            ['useMiles']:value
        })
        console.log(value)
    }
    handleKeyPress = (event) =>{
        
        let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    this.setState({ value });
    console.log(value)
    this.setState({['paymentThroughtMiles']:value})
    }
    getAdditionalSeatPrice(){
        let seatObj = JSON.parse(localStorage.getItem("additionalSeatPrice"));
        let arr = Object.values(seatObj)
        let sum = 0;
        for(let i=0;i<arr.length;i++){
            sum = arr[i].price +sum
        }
        let obj = {};
        obj["sum"] = sum;
        return sum
    }
    getSumTotal = () => {
        let count = 0
        let tax = 150
        let miles = this.state.paymentThroughtMiles;
        let seatPrice = localStorage.pricePerSeat;
        console.log(localStorage)
        let seatArray = localStorage.getItem('reservedSeats')
        if (seatArray) {
            let seaArr = JSON.parse(seatArray)
            for (let i = 0; i < seaArr.length; i++) {
                count++
            }
            let total = (seatPrice * count) + tax + miles + this.getAdditionalSeatPrice();
           
            localStorage.setItem("totalTicketPrice", total)
            return (
                <div>
                    <hr className="hr3" />
                    <p>{seatPrice * count}</p>
                    <p>+{miles}</p>
                    <p>+{this.getAdditionalSeatPrice()}</p>
                    <p>+{tax}</p>
                    <p>{total}</p>
                </div>
            )
        }
    }


    render() {
        const { name, number, expiry, cvc, focused, issuer, formData, token } = this.state;

        return (

                <div className="row container App-payment">


                    <div key="Payment" className="col-md-4 innerbg">
                        <div className="">
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
                                <div className="form-group col-md-4">
                                    <div className="floatLeft">
                                    <input
                                        type="checkbox"
                                        name="useMiles"
                                        className="form-control-sm" 
                                        checked={this.state.useMiles}
                                        onChange={this.useMilesFunction}  

                                    />
                                    <span className=" smallFont">Use my Miles</span>
                                    </div>
                                    
                                </div>
                                { this.state.useMiles ? <div className="form-group col-md-8">
                                    <input
                                        type="number"
                                        min="0"
                                        max={this.state.token.miles}
                                        name="useMilesEntered"
                                        value={this.state.value}
                                        className="form-control"
                                        onChange={this.handleKeyPress}
                                        placeholder={this.state.token.miles+" available to redeem"} 

                                    />
                                </div>: null }
                                
                                <input type="hidden" name="issuer" value={issuer} />
                                <div className="form-group col-md-12">
                                    <button onClick={e => this.moveToTicketPage(e)} className="btn btn-success">PAY</button>
                                </div>
                            </form>
                        </div>
                    </div>


                    <div className="col-md-7 innerbg">
                    
                        <h3>AvengHerS</h3>
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
                                    <hr className="hr3" />
                                    <p className="hdng">Seat</p>
                                    <hr className="hr3" />
                                    <p className="hdng">Ticket price</p>
                                    <p className="hdng">Payment through miles</p>
                                    <p className="hdng">Seat Booking Price</p>
                                    <p className="hdng">Tax</p>
                                    <p className="hdng">Toal Sum</p>

                                </div>
                                <div className="col-md-6">
                                    <p className="usrName">{token.name}</p>
                                    <hr className="hr3" />
                                    <p className="usrName">{localStorage.getItem("date")}</p>
                                    <p className="usrName">{localStorage.getItem("start")}</p>
                                    <p className="usrName">{localStorage.getItem("destination")}</p>
                                    <hr className="hr3" />
                                    <p className="usrName">{localStorage.getItem("nameData")}</p>
                                    <hr className="hr3" />
                                    <p className="hdng">{localStorage.getItem("reservedSeats")} </p>
                                    
                                    
                                    <p>{this.getSumTotal()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
   



        );
    }
}

import React from 'react'
import './account.css'
import jwt_decode from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


export default class Account extends React.Component  {
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
        tableData:[],
        overlay:""
    }
    componentDidMount() {
        const tok = sessionStorage.getItem("authToken")
        const decoded = jwt_decode(tok);
        this.setState({ token: decoded.user })
    }
    cancelTicket = (e,item) => {
        e.preventDefault();
        let btnClicked = e.target.outerText
        this.setState({
            overlay: "overlay"
        });
        e.target.outerText="Cancelling..."
        
        let payload = {
            "bookingId":item.bookingId,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch('http://localhost:8080/cancelTicket', requestOptions).then(response => response.json())
            .then(json => {
                
                if(btnClicked == "Cancel"){
                    this.fetchTravelHistory(e)
                } else {
                    window.location.href = "/routes"
                }
        });
    }
    fetchTravelHistory = (e) => {
        e.preventDefault();
        this.setState({
            overlay: "overlay"
        });
        let tabName = e.target.outerText
        let payload = {};
        if(tabName == "Past Trips"){
            payload = {
                "emailid":this.state.token.email,
                "Tripstatus":"completed"
            }
        } else if(tabName == "Cancelled Trips") {
            payload = {
                "emailid":this.state.token.email,
                "Tripstatus":"cancelled"
            }
        } else {
            payload = {
                "emailid":this.state.token.email,
                "Tripstatus":"pending"
            }
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch('http://localhost:8080/getUserTrips', requestOptions).then(response => response.json())
            .then(json => {
                this.setState({
                    tableData: json
                });
                this.setState({
                    overlay: ""
                });
            });
       
    }
   
    render (){
        
        return (
            <div className="container profile-tabs">
                <div style={{ display: 'block', width: 700, padding: 30 }}>
          <Tabs defaultActiveKey="first" value={this.state.checked}  onClick={(e)=>this.fetchTravelHistory(e)}>
            <Tab eventKey="first" title="Profile">
            <div className="container p-0">
        <div className="row m-0">
            <div className="col-xs-12 col-sm-12 col-md-12 p-0">
                <div className="well well-sm">
                    <div className="row m-0">
                        <div className="col-sm-2 col-md-2 p-0">
                            <img src="http://placehold.it/200x200" alt="" className="img-rounded img-responsive" />
                        </div>
                        <div className="col-sm-8 col-md-8">
                            <h4>
                                {this.state.token.name}</h4>
                            <small><cite title="San Francisco, USA">San Jose, California, USA <i className="glyphicon glyphicon-map-marker">
                            </i></cite></small>
                            <p>
                                <i className="glyphicon glyphicon-envelope"></i>{this.state.token.email}
                                <br />
                                <i className="glyphicon glyphicon-globe"></i>{this.state.token.miles} miles available to redeem
                                <br />
                                <i className="glyphicon glyphicon-gift"></i>June 02, 1996</p>
                                <div className="btn-group">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            </Tab>
            <Tab eventKey="second" title="Past Trips" >
            <div className="container p-0">
                <table className={this.state.overlay+" table table-bordered bg-white"}>
                    <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Flight Name</th>
                        <th>Travel Date</th>
                        <th>Miles Used</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableData.map((item) => (
                                <tr key={item.bookingId}>
                                    <td>{item.bookingId}</td>
                                    <td>{item.startcity}</td>
                                    <td>{item.destination}</td>
                                    <td>{item.flightname}</td>
                                    <td>{item.date}</td>
                                    <td>{item.skywardMilesUsed}</td>
                                    <td>${item.PriceofTicket}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            </Tab>
            <Tab eventKey="third" title="Upcoming Trips" >
            <div className="container p-0">
                <table className={this.state.overlay+" table table-bordered bg-white"}>
                    <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Flight Name</th>
                        <th>Travel Date</th>
                        <th>Miles Used</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableData.map((item) => (
                                <tr key={item.bookingId}>
                                    <td>{item.bookingId}</td>
                                    <td>{item.startcity}</td>
                                    <td>{item.destination}</td>
                                    <td>{item.flightname}</td>
                                    <td>{item.date}</td>
                                    <td>{item.skywardMilesUsed}</td>
                                    <td>${item.PriceofTicket}</td>
                                    <td> <button type="button" className="btn btn-danger btn-sm" onClick={e=>this.cancelTicket(e,item)}>Cancel</button>
                                    <span className="p-10"></span>
                                    <button type="button" className="btn btn-success btn-sm" onClick={e=>this.cancelTicket(e,item)}>Change</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            </Tab>
            <Tab eventKey="fourth" title="Cancelled Trips" >
            <div className="container p-0">
                <table className={this.state.overlay+" table table-bordered bg-white"}>
                    <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Flight Name</th>
                        <th>Travel Date</th>
                        <th>Miles Used</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableData.map((item) => (
                                <tr key={item.bookingId}>
                                    <td>{item.bookingId}</td>
                                    <td>{item.startcity}</td>
                                    <td>{item.destination}</td>
                                    <td>{item.flightname}</td>
                                    <td>{item.date}</td>
                                    <td>{item.skywardMilesUsed}</td>
                                    <td>${item.PriceofTicket}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            </Tab>
          </Tabs>
        </div>
       

        
            </div>
            
        )
    }
}
    

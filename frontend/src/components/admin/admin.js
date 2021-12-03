import React from 'react'
import './admin.css'
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
        airlinesData:[],
        overlay:""
    }
    componentDidMount() {
        const tok = sessionStorage.getItem("authToken")
        const decoded = jwt_decode(tok);
        this.setState({ token: decoded.user })
    }
    completeTrip = (e,booking) => {
        e.preventDefault();
        this.setState({
            overlay: "overlay"
        });
       
        e.target.outerText="Completing..."
        
        let payload = {
            "bookingId": booking.bookingId,
            "status": "completed",
            "existingMileage": 40,
            "newMileage": booking.SkywardMiles,
            "usedMileage": booking.skywardMilesUsed,
            "email":booking.emailid
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch('http://localhost:8080/markTripAsCompleted', requestOptions).then(response => response.json())
            .then(json => {
                this.getAllBookings(e)
        });
    }
    getAllBookings = (e) => {
        e.preventDefault();
        this.setState({
            overlay: "overlay"
        });
        let tabName = e.target.outerText
        if(tabName == "Airlines"){
            this.getAllAirlines()
        } else {
            let payload = {
                "emailid":this.state.token.email,
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            };
            fetch('http://localhost:8080/getAllBookings', requestOptions).then(response => response.json())
                .then(json => {
                    this.setState({
                        tableData: json
                    });
                    this.setState({
                        overlay: ""
                    });
                });
        }
       
       
        
       
    }
    getAllAirlines = (e) => {
        this.setState({
            overlay: "overlay"
        });
        let payload = {
            "emailid":this.state.token.email,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch('http://localhost:8080/getAllAirlines', requestOptions).then(response => response.json())
            .then(json => {
                this.setState({
                    airlinesData: json
                });
                this.setState({
                    overlay: ""
                });
            });
       
    }
    
    render (){
        return (
            <div className="container-fluid profile-tabs">
                <div style={{ display: 'block'}}>
          <Tabs defaultActiveKey="profile" value={this.state.checked}  onClick={(e)=>this.getAllBookings(e)}>
          <Tab eventKey="profile" title="Profile">
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
                                <i className="glyphicon glyphicon-gift"></i>Admin</p>
                                <div className="btn-group">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            </Tab>
            <Tab eventKey="Bookings" title="Bookings" >
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
                                    <td> <button type="button" className="btn btn-danger btn-block" onClick={e=>this.cancelTicket(e,item.bookingId)}>Cancel</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            </Tab>
            <Tab eventKey="third" title="Airlines" >
            <div className="container p-0">
            <table className={this.state.overlay+" table table-bordered bg-white"}>
                    <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Plane Type</th>
                        <th>Plane Number</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Total Seats</th>
                        <th>Available Seats</th>
                        <th>Price per Seat</th>
                        <th>Date</th>
                        <th>Distance</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.airlinesData.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.CompanyName}</td>
                                    <td>{item.planeType}</td>
                                    <td>{item.planeNumber}</td>
                                    <td>{item.startCity}</td>
                                    <td>{item.destination}</td>
                                    <td>{item.totalSeats}</td>
                                    <td>{item.availableSeats}</td>
                                    <td>{item.pricePerSeat}</td>
                                    <td>{item.date}</td>
                                    <td>{item.milescovered} miles</td>
                                    <td><i className="glyphicon glyphicon-pencil"></i><i className="glyphicon glyphicon-remove color-red"></i></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
            </div>
            </Tab>
            <Tab eventKey="addNewFlight" title="Add New Flight" >
            Add New Tab
            </Tab>
            
          </Tabs>
        
        </div>
            </div>
        )
    }
}
    

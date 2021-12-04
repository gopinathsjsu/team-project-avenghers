import React from 'react'
import './admin.css'
import jwt_decode from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default class Account extends React.Component  {
    state = {
        showModal:false,
        editAirlines:false,
        token: "",
        newPricePerSeat:"",
        responseAddAirlines:"",
        newTravelDate:"",
        loaderClass:"paym",
        formData:"",
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
        fetch('http://54.159.225.120:8080/markTripAsCompleted', requestOptions).then(response => response.json())
            .then(json => {
                this.getAllBookings(e)
        });
    }
    getAllBookings = (e) => {
        e.preventDefault();
        this.setState({
            overlay: "overlay",
            tableData: []
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
            fetch('http://54.159.225.120:8080/getAllBookings', requestOptions).then(response => response.json())
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
                this.setState({
                    editAirlines: false
                });
        });
       
    }
    updateAirlines= (item,e)=>{
        let payload = {};
        this.setState({
            overlay: "overlay"
        });
        payload ={"flightNumber":item.planeNumber,"updateValues":
            {
                "pricePerSeat":this.state.newPricePerSeat,
                "date":this.state.newTravelDate,
            }
        }
        console.log(payload)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch('http://localhost:8080/updateAirlines', requestOptions).then(response => response.json())
            .then(json => {
               this.getAllAirlines("event")
        });
    }
    setNewPrice = (event)=>{
        let { value, min, max } = event.target;
        this.setState({ newPricePerSeat:value });
    }
    setNewDate = (event)=>{
        let { value, min, max } = event.target;
        this.setState({ newTravelDate:value });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            responseAddAirlines: "Submitting.. Please wait",
            overlay: "overlay"
        });
        const { issuer } = this.state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});
        formData.milescovered = parseInt(formData.milescovered)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        fetch('http://localhost:8080/addNewAirlines', requestOptions).then(response => response.json())
            .then(data => {
                if(data.insertedId){
                    this.setState({
                        responseAddAirlines: "Succefully Added flight ",
                        overlay: ""
                    });
                } else {
                    this.setState({
                        responseAddAirlines: "Error Occured",
                        overlay: ""
                    });
                }
            });
        this.form.reset();
    };
    submitNewAirlines =e =>{
       
    }
    render (){
        const { name, number, expiry, cvc, focused, issuer, formData, token } = this.state;
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
                        <th>Status</th>
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
                                    <td>{item.Tripstatus}</td>
                                    <td>{item.Tripstatus =="Pending" || item.Tripstatus =="pending"  ? <button type="button" className="btn btn-success btn-block" 
                                    onClick={e=>this.completeTrip(e,item)}>Complete</button>:<span>Completed</span>}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            </Tab>
            <Tab eventKey="third" title="Airlines" >
            
        <button type="button" className="btn btn-primary btn-sm editBtn" onClick={e=>this.setState({ editAirlines: true })}>Edit</button>
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
                        {this.state.editAirlines ?<th>Action</th>:null}
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
                                    {this.state.editAirlines ? <td className="w-100p"><input defaultValue={item.pricePerSeat} onChange={e=>this.setNewPrice(e)} className="m-0 w-100p"></input></td>:<td>{item.pricePerSeat}</td>}
                                    {this.state.editAirlines ? <td className="w-100p"><input defaultValue={item.date}  onChange={e=>this.setNewDate(e)} className="m-0 w-100p"></input></td>:<td>{item.date}</td>}
                                    <td>{item.milescovered} miles</td>
                                    {this.state.editAirlines ?<td><i title="Click to update" onClick={e=>this.updateAirlines(item,e)} className="glyphicon glyphicon-ok color-green c-p"></i></td>:null}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
            </div>
            </Tab>
            <Tab eventKey="addNewFlight" title="Add New Flight" >
            <div className="row container">

                        <h4 className="t-center">{this.state.responseAddAirlines}</h4>
                    <div key="Payment" className="col-md-7 col-md-offset-2 innerbgAdmin">
                        <div className={this.state.overlay}>
                           
                            <form className="row m-0" ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                                
                                <div className="form-group col-md-12">
                                    <input
                                        type="text"
                                        name="CompanyName"
                                        className="form-control"
                                        placeholder="Company Name"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
    
                                <div className="form-group col-md-4">
                                    <input
                                        placeholder="Plane Type"
                                        type="text"
                                        name="planeType"

                                        className="form-control"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <input
                                        placeholder="Plane Number"
                                        type="text"
                                        name="planeNumber"

                                        className="form-control"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <input
                                        placeholder="From"
                                        type="text"
                                        name="startCity"

                                        className="form-control"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <input
                                        placeholder="To"
                                        type="text"
                                        name="destination"

                                        className="form-control"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <input
                                        type="number"
                                        name="totalSeats"
                                        className="form-control"
                                        placeholder="Total Seats"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <input
                                        type="number"
                                        name="availableSeats"
                                        className="form-control"
                                        placeholder="Available Seats"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <input
                                        type="number"
                                        name="pricePerSeat"
                                        className="form-control"
                                        placeholder="Price Per Seat"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <input
                                        type="text"
                                        name="date"
                                        className="form-control"
                                        placeholder="Date  (MM/DD/YYYY)"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <input
                                        type="number"
                                        name="milescovered"
                                        className="form-control"
                                        placeholder="Distance"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                
                                <div className="form-group col-md-12">
                                    <button onClick={e => this.submitNewAirlines(e)} className="btn btn-success">Add New Flight</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
            </Tab>
            
          </Tabs>
        
        </div>
            </div>
        )
    }
}
    

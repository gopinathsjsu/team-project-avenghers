import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from './components/Homepage/Homepage'
import SeatSelection from './components/SeatSelection/SeatSelection'
import ViewReservation from './components/ChangeReservations/ViewReservationsAdmin'

import Account from './components/Account/account'
import Login from './components/Login/login'
import Register from './components/Register/register'
<<<<<<< HEAD
import MyBookings from './components/ChangeReservations/MyBookings'
import CancelPage from './components/ChangeReservations/CancelPage'
=======
import RouteSelection from './components/RouteSelection/RouteSelection'
import PaymentTab from './components/PaymentTab/PaymentTab'

>>>>>>> 0a3acf7730ca285acaf4fee9f3474b6e71e8f7ce

import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={props => <Homepage {...props} />} />
          <Route path="/login" render={props => <Login {...props} />} />
          <Route path="/register" render={props => <Register {...props} />} />
          <Route path="/routes" exact render={props => <RouteSelection {...props} />} />
          <Route path="/Seat" exact render={props => <SeatSelection {...props} />} />
          <Route path="/ViewReservation" exact render={props => <ViewReservation {...props} />} />
          <Route path="/account" exact render={props => <Account {...props} />} />
<<<<<<< HEAD
          <Route path="/MyBookings" exact render={props => <MyBookings {...props} />} />
          <Route path="/CancelPage" exact render={props => <CancelPage {...props} />} />
=======
          <Route path="/PaymentTab" exact render={props => <PaymentTab {...props} />} />
     
>>>>>>> 0a3acf7730ca285acaf4fee9f3474b6e71e8f7ce
        </Switch>
      </Router>
    </div>

  );
}

export default App;

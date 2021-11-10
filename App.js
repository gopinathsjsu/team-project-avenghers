
// import RouteSelection from './components/RouteSelection/RouteSelection'
// import LogOrsign from './components/Login-Signup/LogOrsign'
// import Signup from './components/Login-Signup/Signup'
// import Profile from './components/Profile/Profile'
// import TicketPage from './components/TicketPage/TicketPage'

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from './components/Homepage/Homepage'
import SeatSelection from './components/SeatSelection/SeatSelection';


import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={props => <Homepage {...props} />} />
          <Route path="/" exact render={props => <Homepage {...props} />} />
          <Route path="/seat" render={props => <SeatSelection {...props} />} />    
        </Switch>
      </Router>
    </div>

  );
}

export default App;
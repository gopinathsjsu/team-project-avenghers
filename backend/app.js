const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const express = require('express');

//const mongoose = require('mongoose');
const seed = require("./seed");
const bookTickets = require("./routes/bookTickets")
const completeTrip = require("./routes/completeTrip")
const getUserTrip = require("./routes/getUserTrips")
const cancelTicket = require("./routes/cancelTicket")
const getAllBookings = require("./routes/getAllBookings")
const updateAirlines = require("./routes/updateAirlines")
const addNewAirlines = require("./routes/addNewAirlines")
const app = express();

const mongoose = require('mongoose');


const mongoo = require('./config/keys');

//establish mongoose connection
mongoose.connect(mongoo.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => console.log('dbError', error));
db.once('open', async () => {
    console.log('DBConnection Established')
    await seed();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(passport.initialize());

require('./auth/auth');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', loginRouter);
app.use('/register', registerRouter);

const routeRouter = require('./routes/routeSelection');
app.use('/booking', routeRouter);


const seatRouter = require('./routes/seatSelection');
app.use('/seat', seatRouter)

app.post('/bookTicket', function (req, res) {
    let payload = req.body
    let response = bookTickets.booktickets("bookTicket", payload);
    response.then((a, b) => {
        res.send(JSON.stringify(a))
    })
 })
 app.post('/markTripAsCompleted', function (req, res) {
    let payload = req.body
    let response = completeTrip.markTripAsCompleted("completeTrip",payload);
    response.then((a,b)=>{
        res.send(JSON.stringify(a))
    })
})
app.post('/getUserTrips', function (req, res) {
    let payload = req.body
    let response = getUserTrip.getUserTrips("getUserTrips",payload);
    response.then((a,b)=>{
        res.send(JSON.stringify(a))
    })
})
app.post('/cancelTicket', function (req, res) {
    let payload = req.body
    let response = cancelTicket.cancelTicket("cancelTicket",payload);
    response.then((a,b)=>{
        res.send(JSON.stringify(a))
    })
})
app.post('/getAllBookings', function (req, res) {
    let payload = req.body
    let response = getAllBookings.getAllBookings("getAllBookings",payload);
    response.then((a,b)=>{
        res.send(JSON.stringify(a))
    })
})
app.post('/getAllAirlines', function (req, res) {
    let payload = req.body
    let response = getAllBookings.getAllBookings("getAllAirlines",payload);
    response.then((a,b)=>{
        res.send(JSON.stringify(a))
    })
})
app.post('/updateAirlines', function (req, res) {
    let payload = req.body
    let response = updateAirlines.updateAirlines("updateAirlines",payload);
    response.then((a,b)=>{
        res.send(JSON.stringify(a))
    })
})
app.post('/addNewAirlines', function (req, res) {
    let payload = req.body;
    let response = addNewAirlines.addNewAirlines("addNewAirlines", payload);
    response.then((a, b) => {
        res.send(JSON.stringify(a))
    })
 })
module.exports = app;
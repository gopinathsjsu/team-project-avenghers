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

const app = express();

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

const bookTickets = require("./routes/bookTickets");
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
module.exports = app;
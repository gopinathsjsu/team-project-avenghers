const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

const express = require('express');
const mongoose = require('mongoose');
const seed = require("./seed");
const bookTickets = require("./routes/bookTickets")

const app = express();

//DB Config
const DB_URL = require('./config/keys').MongoURI;

//------------------Connect To MongoDB---------------------------
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("Connected to MongoDB");
    await seed();
}).catch(err => {
    throw err
});
//---------------------------------------------

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

 app.post('/bookTicket', function (req, res) {
    let payload = req.body
    let response = bookTickets.booktickets("bookTicket",payload);
    response.then((a,b)=>{
        res.send(JSON.stringify(a))
    })
    

 })
module.exports = app;
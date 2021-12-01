var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')


var app = express();

const bookingRoute = require('./routes/routeSelection')

var registerRouter = require('./routes/register');
//DB Config
const DB_URL = require('./config/keys').MongoURI;

//connect to mongo
//---------------------------------------------
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(err => {
        throw err
    })
//---------------------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/booking', bookingRoute);
app.use('/register', registerRouter);  // To register page 

module.exports = app;
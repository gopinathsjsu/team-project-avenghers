const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
var mongoose = require('mongoose');

<<<<<<< HEAD
const ViewBookingsRoutes = require("./routes/ViewBookings");
var app = express();
=======
const express = require('express');
const mongoose = require('mongoose');
const seed = require("./seed");

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
>>>>>>> 0a3acf7730ca285acaf4fee9f3474b6e71e8f7ce

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD
app.use(cors())
//DB Config
const DB_URL = require('./config/keys').MongoURI;
=======
app.use(cors());

const registerRouter = require('./routes/register');
app.use('/register', registerRouter);
>>>>>>> 0a3acf7730ca285acaf4fee9f3474b6e71e8f7ce

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
app.use("/ViewBookings", ViewBookingsRoutes);
module.exports = app;
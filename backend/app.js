const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

module.exports = app;
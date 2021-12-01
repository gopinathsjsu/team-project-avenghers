var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
//const airPlaneRouter = require('./routes/routeSelection');
const mongoose = require('mongoose');
const mongoo = require('./config/keys');
console.log('mongooo', mongoo)

//establish mongoose connection
mongoose.connect(mongoo.MongoURI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', () => console.log('dbError', error));
db.once('open', () => console.log('connection established'));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

const seatRouter = require('./routes/seatSelection');
 app.use('/seat', seatRouter)

module.exports = app;
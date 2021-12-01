const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect')

function booktickets(params,payload) {
     return db.main(params,payload);
    
}
module.exports = { booktickets }
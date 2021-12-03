const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect')

function cancelTicket(params,payload) {
     return db.main(params,payload);
    
}
module.exports = { cancelTicket }
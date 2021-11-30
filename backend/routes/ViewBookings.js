var mongoose = require('mongoose');
var express = require('express');
const bodyParser = require('body-parser')
let bookings = require('../models/Bookings');
const router = require('express').Router()

router.use(express.json())

router.route('/').get((req, res) => {
  
      // Company.aggregate({companyId})
      bookings.find()
      
        .then((result) => {
          console.log(result)
          return res.status(200).json(result)
        })
        
    
  })

module.exports = router;

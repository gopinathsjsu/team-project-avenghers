const moment = require('moment');
const express = require('express');
const router = express.Router();

const Airline = require('../models/Airline');

router.post('/', async (req, res) => {

    try {
        const flights = await Airline.find({ 'startCity': req.body.startCity, 'destination': req.body.destination, date: moment(req.body.date, "YYYY-MM-DD").format("MM/DD/YYYY") });
        res.json({ status: true, flights });
    } catch (e) {
        res.json({ status: false, message: "error while searching" })
    }
})

router.post('/', (req, res) => {

    Airline.findOne({ _id: req.body.bId }, (err, Airline) => {
        if (err) {
            res.json({ status: false, message: "error while searching with ID" })
        }
        else {
            res.json({ Airline })
        }
    })
})
















module.exports = router;

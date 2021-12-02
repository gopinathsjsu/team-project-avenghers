const express = require('express');
const router = express.Router();
const Airplane = require('../models/Airplanes');

router.post('/', async (req, res) => {

    try {
        const flights = await Airplane.find({ 'startCity': req.body.startCity, 'destination': req.body.destination });
        res.json({ status: true, flights });
    } catch (e) {
        res.json({ status: false, message: "error while searching" })
    }
})

router.post('/', (req, res) => {

    Airplane.findOne({ _id: req.body.bId }, (err, Airplane) => {
        if (err) {
            res.json({ status: false, message: "error while searching with ID" })
        }
        else
            res.json({ Airplane })
    })
})
















module.exports = router;

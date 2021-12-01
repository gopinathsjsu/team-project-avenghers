var express = require('express');
var router = express.Router();
var SeatSelection = require('../models/SeatSelection');



router.post('/',async (req, res) => {
    console.log('req', req);
    const name = req.body.name || '';
    const gender = req.body.gender || '';
    const seatNumber = req.body.seatNumber || '';
    const price = req.body.price ||0;

    const seat = new SeatSelection({
         name,
     gender,
     seatNumber,
    additionalPrice: price,

    })

    try {
        const newSeat = await seat.save();
        res.status(201).json({newSeat});
    } catch(err) {
        res.status(400).json({message: err.message})
    }
    res.json({status: 'ok', message: 'received'})

   // bus.find({ 'startCity': req.body.startCity, 'destination': req.body.destination }).exec((err, bus) => {
     //   if (err) {
     //       res.json({ status: false, message: "error while searching" })
    //    }
    //    else res.json({ bus })
   // })
})



// router.post('/', (req, res) => {
//     let newBus = new bus(req.body)
//     newBus.save((err, bus) => {
//         if (err) console.log(err)
//         else res.status(201).json(bus)
//     })
// })
















module.exports = router;

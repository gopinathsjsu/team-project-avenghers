const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SeatSelectionSchema = new Schema({
    name: {
        type: String
    },
    gender: {
        type: String
    },
    seatNumber: {
        type: String
    },
    additionalPrice: {
        type: String
    },
}, {collection: "SeatSelection"})

const Seats = mongoose.model('SeatSelection', SeatSelectionSchema);

module.exports = Seats;
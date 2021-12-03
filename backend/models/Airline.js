const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AirlineSchema = new Schema({
    CompanyName: {
        type: String
    },
    planeType: {
        type: String
    },
    planeNumber: {
        type: String
    },
    startCity: {
        type: String
    },
    destination: {
        type: String
    },
    totalSeats: {
        type: String
    },
    availableSeats: {
        type: String
    },
    pricePerSeat: {
        type: String
    },
    date: {
        type: String
    },
    milescovered: {
        type: Number
    }
}, { collection: "Airlines" })

const Airline = mongoose.model('Airline', AirlineSchema)

module.exports = Airline;
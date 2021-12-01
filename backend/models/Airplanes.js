const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AirplaneSchema = new Schema({
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
    }
}, {collection: "Airplanes"})

const bus = mongoose.model('Airplane', AirplaneSchema)

module.exports = Airplane;
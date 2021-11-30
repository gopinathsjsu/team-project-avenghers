const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({

    Name: {
        type: String,
        required: true
    },

    Email: {

        type: String,
        required: true
    }


})

const bookings = mongoose.model('bookings', BookingSchema)

module.exports = bookings;
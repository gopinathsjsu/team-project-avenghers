const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    mileage: {
        type: Number,
        required: true,
        default: 0
    },
    role: {
        type: Number,
        required: true,
        default: 0 // (Considering admin Role as 1, user Role as 0)
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;
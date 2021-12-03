const express = require('express');
const bcrypt = require('bcrypt');
const moment = require('moment');
const bodyParser = require('body-parser')

const User = require('../models/User')

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Register Here")
});

router.post('/', bodyParser.json(), async (req, res) => {

    try {
        const isExist = await User.findOne({ email: req.body.email, role: 0 });
        if (isExist) throw new Error("Email already exist!");

        //Hash Password 
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        let user = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            mobile: req.body.mobile,
            gender: req.body.gender,
            dob: moment(req.body.dob, "YYYY-MM-DD").format('YYYY-MM-DD')
        }
        let newUser = new User(user)
        await newUser.save();

        res.json({ status: true });
    } catch (e) {
        res.json({ status: false, error: e.message });
    }
});

module.exports = router;

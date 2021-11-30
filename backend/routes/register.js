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

    const isExist = await User.findOne({ email: req.body.email, role: 0 });
    if (isExist) {
        res.status(500).json({ error: "Email already exist!" });
        return;
    }
    try {

        //Hash Password 
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        let user = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            mobile: req.body.mobile,
            gender: req.body.gender,
            dob: moment(req.body.dob).format('YYYY-MM-DD')
        }
        let newUser = new User(user)
        await newUser.save();
        res.status(201).json({ result: newUser });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;

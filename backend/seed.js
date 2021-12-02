const User = require('./models/User')
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = async () => {
    await createDefaultAdminIfNotExist();
}

async function createDefaultAdminIfNotExist() {
    const admin = await User.findOne({email: "admin@team.com", role: 1});
    if(admin) return;
    const hashPassword = await bcrypt.hash("admin@54321", 10);
    let user = {
        name: "Default Admin",
        email: "admin@team.com",
        password: hashPassword,
        mobile: "0",
        gender: "N/A",
        dob: moment("1970-01-01").format('YYYY-MM-DD'),
        role: 1
    }
    let newUser = new User(user)
    await newUser.save();
    console.log("Default Admin with Email `admin@team.com` Created")
}
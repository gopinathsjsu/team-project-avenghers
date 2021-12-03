const User = require('./models/User');
const Airline = require('./models/Airline');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = async () => {
    await createDefaultAdminIfNotExist();
    await loadMockAirlines();
}

async function createDefaultAdminIfNotExist() {
    const admin = await User.findOne({ email: "admin@team.com", role: 1 });
    if (admin) return;
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

async function loadMockAirlines() {
    try {
        const airlineExist = await Airline.findOne();
        if (airlineExist) return;

        const routes = require('./routes.json');
        const airlines = routes.map(route => {
            const {
                CompanyName,
                planeType,
                planeNumber,
                startCity,
                destination,
                totalSeats,
                availableSeats,
                pricePerSeat,
                date
            } = route;
            return {
                CompanyName,
                planeType,
                planeNumber,
                startCity,
                destination,
                totalSeats,
                availableSeats,
                pricePerSeat,
                date,
                milescovered: getRandomInteger(300, 1000)
            }
        })
        await Airline.create(airlines);
    } catch (e) {
        console.log(e)
    }
}

function getRandomInteger(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}
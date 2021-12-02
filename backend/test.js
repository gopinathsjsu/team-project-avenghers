const routes = require('./routes.json');
const cities = [...routes.map(r => r.startCity), ...routes.map(r => r.destination)];
console.log(cities);
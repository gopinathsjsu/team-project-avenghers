const {MongoClient} = require('mongodb');

let retVal= [];
async function main(params,payload) {
    const uri = require('./keys').MongoURI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        if(params == "bookTicket"){
            retVal = await bookTickets(client,payload)
        } else if(params == "completeTrip"){
            retVal = await markTripAsCompleted(client,payload)
        }else if(params == "getUserTrips"){
            retVal = await getUserTrips(client,payload)
        }else if(params == "cancelTicket"){
            retVal = await cancelTicket(client,payload)
        }else if(params == "getAllBookings"){
            retVal = await getAllBookings(client,payload)
        }
        else if(params == "getAllAirlines"){
            retVal = await getAllAirlines(client,payload)
        }
         //await listDatabases(client);
         return retVal
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
        
    }
   
}
//main().catch(console.error);
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
async function bookTickets(client,payload){
    const result = await client.db("Cmpe202").collection("booktravel").insertOne(payload)
    
    return result
};
async function markTripAsCompleted(client,payload){
    const userCursor =  client.db("Cmpe202").collection("users").find({email:payload.email});
    let users = await userCursor.toArray();
    let existingMileage = users[0].mileage
    let newMileage = existingMileage + payload.newMileage -payload.usedMileage;
    let retArray = [];
    const result = await client.db("Cmpe202").collection("users").updateOne({email:payload.email},{$set:{mileage:newMileage}})
    const ret = await client.db("Cmpe202").collection("booktravel").updateOne({bookingId: payload.bookingId}, {$set:{Tripstatus:payload.status}})
    retArray= [{"usersTable":result},{booktravel:ret}]
    return retArray;
};
async function getUserTrips(client,payload){
   
    const cursor =  client.db("Cmpe202").collection("booktravel").find(payload)
  const result = await cursor.toArray();
    return result;
};
async function cancelTicket(client,payload){
    const result = await client.db("Cmpe202").collection("booktravel").updateOne(
        {bookingId:payload.bookingId},{$set:{Tripstatus:"cancelled"}})
    return result;
};
async function getAllBookings(client,payload){
    
    const cursor =  client.db("Cmpe202").collection("booktravel").find()
  const result = await cursor.toArray();
    return result;
};
async function getAllAirlines(client,payload){
    
    const cursor =  client.db("Cmpe202").collection("Airlines").find()
  const result = await cursor.toArray();
    return result;
};

module.exports = { main }


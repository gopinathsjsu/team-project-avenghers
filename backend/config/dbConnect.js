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
    let newMileage = payload.existingMileage + payload.newMileage -payload.usedMileage;
    let retArray = [];
    const result = await client.db("Cmpe202").collection("users").updateOne(
        {email:"kk@123"},{$set:{mileage:newMileage}})
    const ret = await client.db("Cmpe202").collection("booktravel").updateOne(
            {bookingId: payload.bookingId}, {$set:{Tripstatus:payload.status}})
    retArray= [{"usersTable":result},{booktravel:ret}]
    return retArray;
};



module.exports = { main }


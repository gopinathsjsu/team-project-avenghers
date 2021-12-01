const {MongoClient} = require('mongodb');
const { booktickets } = require('../routes/bookTickets');
let retVal= [];
async function main(params,payload) {
    const uri = require('./keys').MongoURI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        if(params == "bookTicket"){
            retVal = await bookTickets(client,payload)
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
    //const result = await client.db("Cmpe202").collection("booktravel").findOne({ firstname: "Kesiya" });
    console.log(payload)
    const result = await client.db("Cmpe202").collection("booktravel").insertOne(payload)
    
    return result
};
module.exports = { main }


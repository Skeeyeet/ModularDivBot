const {MongoClient} = require('mongodb');
const mongouri = "mongodb+srv://Joshua:Jesse1926@discord.9zjtl.mongodb.net/test";


module.exports = async function MongoDbOpenClient(message) {
    return new Promise(async function (resolve, reject) {
        const client = new MongoClient(mongouri);
    try{
        await client.connect();
        resolve(client);
    } catch(e){
        message.channel.send("Some kind of error with mongodb i guess "+e);
        reject('error');
    } 
    })
}
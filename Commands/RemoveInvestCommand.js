const opendb = require('../Functions/MongoDbOpenClient');
const fetch = require('node-fetch');
const sendmessage = require('../Functions/SendUserPrivateMessage');
require("dotenv").config();


module.exports = async function RemoveInvestCommand(message,args) {

    const client = await opendb(message);
    var name = await client.db("Discord").collection("InvestmentStates").findOne({ User: message.author.id });
    var update = { "$unset": {} };
    update["Notified." + args[0]];
    await client.db("Discord").collection("InvestmentStates").updateOne({User:message.author.id},{ $pull: { "Notified":null} });
    client.close();
}
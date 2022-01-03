const opendb = require('../Functions/MongoDbOpenClient');
const fetch = require('node-fetch');
const sendmessage = require('../Functions/SendUserPrivateMessage');
require("dotenv").config();


module.exports = async function RemoveInvestCommand(message,args) {


    const client = await opendb(message);
    var name = await client.db("Discord").collection("InvestmentStates").findOne({ User: message.author.id });

    sendmessage(message,"Removing entry if it exists, this may take a second",name.User)

    var notifiednull = { "$unset": {} };
    notifiednull["$unset"]["Notified." + args[0]] = null

    var pricenull = { "$unset": {} };
    pricenull["$unset"]["Price." + args[0]] = null

    var currencynull = { "$unset": {} };
    currencynull["$unset"]["CurrencyName." + args[0]] = null


    try{
    await client.db("Discord").collection("InvestmentStates").updateOne({User:message.author.id},notifiednull);
    await client.db("Discord").collection("InvestmentStates").updateOne({User:message.author.id},{ $pull: { "Notified":null} });

    await client.db("Discord").collection("InvestmentStates").updateOne({User:message.author.id},pricenull);
    await client.db("Discord").collection("InvestmentStates").updateOne({User:message.author.id},{ $pull: { "Price":null} });

    await client.db("Discord").collection("InvestmentStates").updateOne({User:message.author.id},currencynull);
    await client.db("Discord").collection("InvestmentStates").updateOne({User:message.author.id},{ $pull: { "CurrencyName":null} });

     sendmessage(message,"It's been removed probably",name.User)
    }
    catch(err){
        sendmessage(message,"Some kind of error here it is"+err,name.User)
    }
    
    client.close();
}
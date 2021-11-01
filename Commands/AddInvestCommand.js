
const MongoDbOpenClient = require('../Functions/MongoDbOpenClient')
const sendmessage = require('../Functions/SendUserPrivateMessage');
const fetch = require('node-fetch');
require('dotenv').config();


module.exports = async function AddInvest(message, args) {
    message.channel.send("working");
    const client = await MongoDbOpenClient(message);
    var valid = true;
    const result = await client.db("Discord").collection("InvestmentStates").findOne({ User: message.author.id });
    var id = await client.db("Discord").collection("InvestmentStates").count();

    try
    {
        await fetch("https://api.nomics.com/v1/currencies/ticker?key="+process.env.NOMICSKEY+"=" + args[0].toUpperCase() + "&interval=1d,30d&convert=AUD&per-page=100&page=1")
        .then(res => res.json())
        .then((json) => {
            if (json.length == 0) {
                valid = false;
                sendmessage(message, "Invalid coin name", message.author.id);
            }
        })
    }
    catch{
        valid = false;
        message.channel.send("something went wrong with fetch function in add invest");
    }
    if (args[1] == null) {
        sendmessage(message, "Please included the price you brought at spaced after the coin name", message.author.id);
        valid = false;
    }

    if (valid == true) {
        if (result == null) {
            await client.db("Discord").collection("InvestmentStates").insertOne({ id: id, User: message.author.id, CurrencyName: [args[0].toUpperCase()], Price: [parseFloat(args[1])], Notified: [0] });
            sendmessage(message, "Your new to the database you have been added", message.author.id);
        }
        else {
            await client.db("Discord").collection("InvestmentStates").updateOne({ User: message.author.id }, { $push: { CurrencyName: args[0].toUpperCase(), Price: parseFloat(args[1]), Notified: 0 } })
            sendmessage(message, "I've added it to the database", message.author.id);
        }
    }



    await client.close();

}


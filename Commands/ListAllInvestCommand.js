const MongoDbOpenClient = require('../Functions/MongoDbOpenClient')
const sendmessage = require('../Functions/SendUserPrivateMessage');
const fetch = require('node-fetch');
require("dotenv").config();

module.exports = async function ListAllInvestCommand(message, args) {
    message.channel.send("working");
    const client = await MongoDbOpenClient(message);
    const result = await client.db("Discord").collection("InvestmentStates").findOne({ User: message.author.id });
    var loops = result.CurrencyName.length;
    var finalstring = "";
    var currentstring = "";
    for (i = 0; i < loops; i++) {
        currentstring = "";
        try{await fetch("https://api.nomics.com/v1/currencies/ticker?key="+process.env.NOMICSKEY+"=" + result.CurrencyName[i] + "&interval=1d,30d&convert=AUD&per-page=100&page=1")
            .then(res => res.json())
            .then((json) => {
                currentprice = json[0].price;
            })
        }
        catch{
            message.channel.send("something went wrong inside of the listallinvestfunction");
        }
        var calculatedprice = currentprice - result.Price[i];
        calculatedprice = calculatedprice / result.Price[i] * 100;
        calculatedprice = Math.round(calculatedprice);
        currentstring = i+": " + result.CurrencyName[i]+" calculated percentage " + calculatedprice + "%" + "\n";
        finalstring= finalstring.concat(currentstring);
    }
    await sendmessage(message,finalstring,message.author.id);

}
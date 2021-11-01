const MongoDbOpenClient = require('../Functions/MongoDbOpenClient')
const sendmessage = require('../Functions/SendUserPrivateMessage');
const fetch = require('node-fetch');

module.exports = async function ListAllInvestCommand(message, args) {
    const client = await MongoDbOpenClient(message);
    const result = await client.db("Discord").collection("InvestmentStates").findOne({ User: message.author.id });
    var loops = result.CurrencyName.length;
    var finalstring = "";
    var currentstring = "";
    for (i = 0; i < loops; i++) {
        currentstring = "";
        await fetch("https://api.nomics.com/v1/currencies/ticker?key=ae6b3678033c54ecec3b3dbed41bfbf97c46abaf&ids=" + result.CurrencyName[i] + "&interval=1d,30d&convert=AUD&per-page=100&page=1")
            .then(res => res.json())
            .then((json) => {
                currentprice = json[0].price;
            })
        var calculatedprice = currentprice - result.Price[i];
        calculatedprice = calculatedprice / result.Price[i] * 100;
        calculatedprice = Math.round(calculatedprice);
        currentstring = i+": " + result.CurrencyName[i]+" calculated percentage " + calculatedprice + "%" + "\n";
        finalstring= finalstring.concat(currentstring);
    }
    await sendmessage(message,finalstring,message.author.id);

}
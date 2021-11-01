const opendb = require('./MongoDbOpenClient');
var timerset = false;
const fetch = require('node-fetch');
const sendmessage = require('./SendUserPrivateMessage');

module.exports = async function CheckInvestments(message) {
    
    interval = setInterval(async function () {
        if (timerset == false) {
            timerset = true;
            const client = await opendb(message);
            var loops = await client.db("Discord").collection("InvestmentStates").count();
            
            for (i = 0; i < loops; i++) {
                var name = await client.db("Discord").collection("InvestmentStates").findOne({ id: i });
                var loops2 = name.CurrencyName.length;
                var currentprice;
                for (j = 0; j < loops2; j++) {
    
                    console.log(name.CurrencyName[j]);
                    await fetch("https://api.nomics.com/v1/currencies/ticker?key=ae6b3678033c54ecec3b3dbed41bfbf97c46abaf&ids=" + name.CurrencyName[j] + "&interval=1d,30d&convert=AUD&per-page=100&page=1")
                        .then(res => res.json())
                        .then((json) => {
                            currentprice = json[0].price;
                        })
    
                    var calculatedprice = currentprice - name.Price[j];
                    calculatedprice = calculatedprice / name.Price[j] * 100;
                    calculatedprice = Math.round(calculatedprice);
    
                    if (calculatedprice >= name.Notified[j] + 10 && calculatedprice > 0) {
                        console.log("You are up by " + calculatedprice + "% on " + name.CurrencyName[j]);
                        var update = { "$set": {} };
                        update["$set"]["Notified." + j] = calculatedprice+10;
                       await client.db("Discord").collection("InvestmentStates").updateOne({ id:i }, update);
                       await sendmessage(message,'Your investment ' + name.CurrencyName[j] + ' is up by ' + calculatedprice + "%",name.User);
                    }
    
                    else if (calculatedprice <= name.Notified[j] - 10){
                        var update = { "$set": {} };
                        update["$set"]["Notified." + j] = calculatedprice-10;
                       await client.db("Discord").collection("InvestmentStates").updateOne({ id:i }, update);
                    }
                    
                }
            }
    
            timerset = true;
            client.close();
    
        }
    }, 3600000);
}

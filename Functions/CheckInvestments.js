const opendb = require('./MongoDbOpenClient');
const fetch = require('node-fetch');
const sendmessage = require('./SendUserPrivateMessage');
require("dotenv").config();
module.exports = async function CheckInvestments(message) {

    interval = setInterval(async function () {

        console.log("running");
        const client = await opendb(message);
        var loops = await client.db("Discord").collection("InvestmentStates").count();
        //Loops for how many entries are in the database
        for (i = 0; i < loops; i++) {

            var name = await client.db("Discord").collection("InvestmentStates").findOne({ id: i });
            var loops2 = name.CurrencyName.length;
            var currentprice;

            //Loops for all currencies in the users data
            for (j = 0; j < loops2; j++) {
                var skip = false;
                console.log(name.CurrencyName[j]);
                //Call to nomics
                    try {
                        await fetch("https://api.nomics.com/v1/currencies/ticker?key=" + process.env.NOMICSKEY + "=" + name.CurrencyName[j] + "&interval=1d,30d&convert=AUD&per-page=100&page=1")
                            .then(res => res.json())
                            .then((json) => {
                                currentprice = json[0].price;
                            })
                    }
                    catch {
                        //sendmessage(message, "Might be some kind of error with " + name.CurrencyName[j], "254917339810627584");
                        skip = true;
                    } 
                
                //Math for working out percentage increase
                var calculatedprice = currentprice - name.Price[j];
                calculatedprice = calculatedprice / name.Price[j] * 100;
                calculatedprice = Math.round(calculatedprice);

                //If price is up by 10%
                if (calculatedprice >= name.Notified[j] + 10 && calculatedprice > 0 && skip == false) {
                    console.log("You are up by " + calculatedprice + "% on " + name.CurrencyName[j]);
                    var update = { "$set": {} };
                    update["$set"]["Notified." + j] = calculatedprice + 10;
                    try {
                        await client.db("Discord").collection("InvestmentStates").updateOne({ id: i }, update);

                    }
                    catch {
                        //sendmessage(message, "error occured at update positive", "254917339810627584");

                    }
                    sendmessage(message, 'Your investment ' + name.CurrencyName[j] + ' is up by ' + calculatedprice + "%", name.User);
                }


                //Pirce is down by 10%
                else if (calculatedprice <= name.Notified[j] - 10 && skip == false) {
                    var update = { "$set": {} };
                    update["$set"]["Notified." + j] = calculatedprice - 5;
                    try {
                        await client.db("Discord").collection("InvestmentStates").updateOne({ id: i }, update);

                    }
                    catch {
                        //sendmessage(message, "error occured at update negative", "254917339810627584");

                    }

                }

            }
        }
        client.close();
    }, 3600000);

}
// 3600000




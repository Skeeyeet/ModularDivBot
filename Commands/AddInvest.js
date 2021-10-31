const fetch = require('node-fetch');
var testvariables = ['helo'];
module.exports = async function AddInvest(message,args) {
    /*var currencytype = message[0].toUpperCase();
    var price = message[1];
    var url = "https://api.nomics.com/v1/currencies/ticker?key=ae6b3678033c54ecec3b3dbed41bfbf97c46abaf&ids="+currencytype+"&interval=1d,30d&convert=AUD&per-page=100&page=1";

    await fetch(url)
    .then (res => res.json())
    .then((json) =>{
        console.log(json);
 })*/

 testvariables.push(args[0]);
 for(i=0;testvariables.length>i;i++){
     message.channel.send(testvariables[i]);
 }
}
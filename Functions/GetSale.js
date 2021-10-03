const fetch = require('node-fetch');
const url = "https://store.steampowered.com/api/appdetails?appids=435150&cc=au&filters=price_overview";

module.exports = async function GetSale() {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then(res => res.json())
            .then((json) => {
                console.log(json);
                var myJSON = JSON.stringify(json);
                console.log(myJSON);
                var n = myJSON.includes('"discount_percent":0');
                console.log(n);
                if (n === true) {
                    sale = false;
                    extrastring = 'not on sale';
                    resolve(extrastring)
                }
                else {
                    sale = true;
                    extrastring = 'on sale';
                    resolve(extrastring)
                }
            })
    })
}
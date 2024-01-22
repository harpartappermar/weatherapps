//https://www.weatherapi.com/my/ 
// 4938553da2f4436bb0c82322232512
// https://www.weatherapi.com/api-explorer.aspx

const request = require("request")

const forecast = (address, callback) => {

    const url = "http://api.weatherapi.com/v1/current.json?key=4938553da2f4436bb0c82322232512&q=" + address + "&aqi=no";


    request(url, function(error, response, body) {
        if (error) {
            const data = JSON.parse(body)
            callback(data, [])


        } else if (response && response.statusCode != "200") {
            const data = JSON.parse(body)
            console.log(data)
            callback(data, [])

        } else {
            const data = JSON.parse(body)
            callback("", data)


        }
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.

    });


}


module.exports = forecast
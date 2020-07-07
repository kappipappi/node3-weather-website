const request = require("request")

const geocode = (address, callback)=>{
    const url =  "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2stbWluaW5nIiwiYSI6ImNrYmoyZWlkMTBqc2Myd215cnVveXJvOGMifQ.DVw0worR2kL61Q_WwQiRFA&limit=1"

    request({url, json: true}, (error, response)=>{
        if (error){
            callback("Unable to connect to geoservice", undefined)
        }else if (response.body.message === "Not Found"){
            callback("No address in url", undefined)
        }else if(response.body.features.length == false){
            callback("Unable to find geoservice location", undefined);
        }else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode 
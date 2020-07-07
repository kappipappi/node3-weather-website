const request = require("request")

const forecast = (longitude, latitude, callback)=>{
    const weatherurl = "http://api.weatherstack.com/current?access_key=5ae97fbee5f885ea1a2ff347bfa4a710&query=" + latitude + "," + longitude;

    request({url: weatherurl, json: true}, (error, {body})=>{//shorthand property for response
        if(error){
            callback("Unable to connect to weather service", undefined)
        }else if(body.error){
            callback("Unable to find weatherservice location", undefined)    
        }else{
            callback(undefined,
                "The weather is " + body.current.weather_descriptions[0] + " . The temperature is " + body.current.temperature + " and it fells like " + body.current.feelslike
            )
        }
    })
}

module.exports = forecast 
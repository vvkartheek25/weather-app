const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=140ec861c6c32a624470d8445f96a045&query='+latitude+','+longitude+'&units=f'

    request({url,json: true},(error,{body})=>{
        if(error){
            callback('unable to connect to Weather service',undefined)
        }else if(body.error){
            callback('Unable to find location. Try Again', undefined)
        }else{
            callback(undefined,'It is currently '+body.current.temperature +' deg outside. Wind speed is '+body.current.wind_speed+' km/h.')
        }
    })
}

module.exports = forecast

const request = require('request')

const geocode = (address,callback)=>{
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2FydGhlZWsyNSIsImEiOiJjazlxbXgyMzMwanVjM2dydHYxY3gxNmYwIn0.fUy7CsINcmXf7yP76jzg6w'
    request({url: url2,json: true},(error,{body})=>{
        if(error){
            callback('unable to connect to location service',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location. Try Again', undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
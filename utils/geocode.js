const {mapboxApi} = require('../credential.js')
const request = require('request')

function geoCode(address,callback){
    const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxApi}`
    request({url:mapUrl , json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather services')
            //console.log('Unable to connect to weather services');
        }
        else if(response.body.features.length == 0){
            callback('Loaction not Found')
            console.log('Loaction not Found');
        }
        else{
            const data = response.body
            const lat  = data.features[0].center[1]
            const long = data.features[0].center[0]
            callback('',{long:long,lat:lat}) 
        }
       
    })
}
module.exports = geoCode;
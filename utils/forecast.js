const {weatherApi,mapboxApi} = require('../credential')
const request = require('request')

function getForecast(long,lat,callback){
    const url = `http://api.weatherstack.com/current?access_key=${weatherApi}&query=${lat},${long}`
    request({url:url , json:true},(error,response)=>{
        //connection failed
        if(error){
            callback("Unable to Connect to Weather Service")
        }
        else if(response.body.error){
            callback('Location entered is invalid')      
        }
        else{
            const data =  `Current temperature at ${response.body.location.name} is ${response.body.current.temperature}`
            callback('',{location:response.body.location,current:response.body.current})
        }
       
    })
    
}
module.exports = getForecast

console.log('Client side javascript file is loaded!')
const form  = document.querySelector('form')
const search  = document.querySelector('input')




form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const weather_data = getWeatherData(search.value)
    
})

function updateWeather({tempreature="",location="",forecast="",image=""}){
    const img = document.getElementById('image').src = image;
    document.getElementById('tempreature').innerText = tempreature
    document.getElementById('location').innerText = location
    document.getElementById('forecast').innerText = forecast
}
function updateState(messege){
    updateWeather({})
    document.getElementById("state").innerText = messege
}

function getWeatherData(address){
    updateState("Loading...")
    fetch(`/weather?address=${address}`).then((res)=>{
        res.json().then(({data,error})=>{
            if(error){
                updateState("Unable to find weather data for entered location")
            }
            else{
                updateState("")
                updateWeather({
                    tempreature:data.current.temperature,
                    location:`${data.location.name}, ${data.location.region}, ${data.location.country} `,
                    forecast:data.current.weather_descriptions,
                    image:data.current.weather_icons[0]
                });
            }
            
        })
    }).catch((error)=>{
        
    })
}


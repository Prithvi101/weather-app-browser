const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../utils/geocode.js')
const getForecast = require('../utils/forecast.js')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prithvi Thakkar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Prithvi Thakkar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Prithvi Thakkar'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            "error":"Address Must Be Provided"
        })
    }
    console.log("fetching data")
    geoCode(req.query.address,(error,{long,lat}={})=>{ 

        if(error)return res.send({error:error});


       // console.log(`longitude =${typeof long} latitude = ${lat}`)

        getForecast(long,lat,(error,data)=>{

            //console.log("data->"+data)

            if(!error){
                res.send({
                    data:data
                })
            }else{
                res.send({
                    error:error
                })
            }
        })
    })
   
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prithvi Thakkar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3005, () => {
    console.log('Server is up on port 3000.')
})

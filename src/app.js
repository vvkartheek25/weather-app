const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000


const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Kartheek'

    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Kartheek'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        text:'welcome to help page',
        name: 'Kartheek'

    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Provide a Location to search'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Provide a Search Term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        errorMsg: '404 HELP Page does not exist',
        name: 'Kartheek'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        errorMsg: '404 Page does not exist',
        name: 'Kartheek'

    })
})


app.listen(port,()=>{
    console.log('Server has started on port '+ port);    
})

const path = require('path');

// geocode and forcast calling from another file
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const hbs = require('hbs');
const express = require('express');

const app = express(); // app.com

//define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// set up static directory to serve
app.use(express.static(publicDirectory))

// set up handlebar engine and view location 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Madusanka Nipunajith'
    });  
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Madusanka Nipunajith'
    })
})
app.get('/help', (req, res)=>{
    res.render('help',{
        title : 'Help',
        name : 'Madusanka Nipunajith'
    })
})
app.get('/help/*', (req, res)=>{
    res.render('notfound',{
        title : '404',
        msg : 'Help article is not found !',
        name : 'Madusanka Nipunajith'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Address is not found'
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude, location})=>{

        if(error){
            return console.log('Error '+ error);
        }
        
        //console.log('Latitude : '+ data.latitude + ' Longitude : '+ data.longtitude);
    
        forecast(latitude, longtitude, (error, forecastData)=>{
            if(error){
                return console.log('Error '+error);
            }
            
            console.log('Location: '+location);
            console.log('Data Temp: ' + forecastData.temp+ ' Pressure: '+ forecastData.press+ ' Humidity: '+ forecastData.humidity);
            console.log('Description: '+forecastData.desc);

            res.send({
                forecast: forecastData.desc,
                location: location,
                temp: forecastData.temp,
                pressure: forecastData.press,
                humidity: forecastData.humidity
                })

        })
    })

    
})

app.get('*', (req, res)=>{
    res.render('notfound',{
        title: '404',
        msg: 'Page not found !',
        name: 'Madusanka Nipunajith'
    })
})



app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})
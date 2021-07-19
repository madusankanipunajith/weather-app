const request = require('request');

const forecast =(lat, long, callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=f2b1ce606a8e78f40d8e2adf788683bc';
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect...', undefined)
        }else if(response.body.message){
            callback('Unable to find the location', undefined)
        }else{
            callback(undefined, {
                temp : response.body.main.temp,
                press : response.body.main.pressure,
                humidity : response.body.main.humidity,
                desc : response.body.weather[0].description
            })
        }
    })
}

module.exports = forecast;


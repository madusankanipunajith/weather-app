const request = require('request')

const geocode =(address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoibWFkdXNhbmthMTIzIiwiYSI6ImNrcjk4cWo3ZDJsdzMzMHRjZzJmaHY4MHQifQ.iKZQCZfc2YAXMPxZt1QF-Q&limit=1';
    request({url, json: true}, (error, {body})=>{ // object descrtucturing....
        if(error){
            callback('', undefined)
        }else if(body.message){
            callback('', undefined)
        }else{
            callback(undefined, {
                latitude : body.features[0].center[0],
                longtitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;
require('dotenv').config()
const express = require('express')
const path = require('path')

const port = 3500;
const app = express()

app.use(express.static('./public'))

app.get('/results', (req, res) =>{
    let number = req.query.number;
    let street = req.query.street;
    let type = req.query.type;
    let city = req.query.city;
    let state = req.query.state;
    fetch( 'https://maps.googleapis.com/maps/api/geocode/json?address=+' + number + '+' + 'street' + '+' + type + ',+' + city + ',+' + state + '&key=' + process.env.GEO_API_KEY ) 
        .then(res => {
            return res.json(); // treat fetch response as a .json format and return to next promise
        }).then( data => {
            //res.json('front');
            //res.json(data.results[0].geometry.location.lat + "," + data.results[0].geometry.location.lng + '/');
            res.json(data);
        }).catch(error => console.log(error)); 
});

app.listen(port, () => { 
    console.log(`Now listening in localhost index.js`); 
});


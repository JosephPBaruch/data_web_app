require('dotenv').config()
const express = require('express')
const path = require('path')

const port = 3500;
const app = express()

app.use(express.static('./public'))

app.get('/', (req, res) =>{
    fetch( 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=' + '') 
                    .then(res => {
                        return res.json(); // treat fetch response as a .json format and return to next promise
                    }).then( data => {
                        // return latitude and longitude
                        //console.log(data);
                        res.json(data);
                        //return data.results[0].geometry.location.lat + "," + data.results[0].geometry.location.lng + '/';
                    }).catch(error => console.log(error)); 
});

app.listen(port, () => { 
    console.log(`Now listening in localhost`); 
});


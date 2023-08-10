/* Joseph Baruch */

require('dotenv').config() // aids use of .env file 
const express = require('express') // include express module
const path = require('path') // include path module 
const app = express() // create express application inside 'app'

// result function definitions
var API_Func = require('./Libraries/fetch_function.js'); 

const port = process.env.PORT || 3000;

// setup static and middleware
app.use(express.static('./public')) // set path to 'public' folder

// send index.html to express app
app.get('/', (req, res) =>{
    res.sendFile('app.html', {root: __dirname }); 
}); 

// create resource page for web app
app.get('/resources', (req, res) =>{
    res.sendFile('app_resources.html', {root: __dirname }); 
});

// create display page for returned weather values
app.get('/display', (req, res) =>{
    res.sendFile('display.html', {root: __dirname }); 
});

app.get('/results', (req, res) =>{

    main(); // fetch data from external API's

    // main(): using the users entered address, fetch coordinates then weather data
    async function main(){

        let coordinates = await API_Func.latLong(req, process.env.GEO_API_KEY); // Input: address -> Output: coordinates

        let token = await API_Func.renewToken(process.env.METEO_USER, process.env.METEO_PASS); // meteomatics token fetch 

        let dateTime = await API_Func.date( coordinates.lat, coordinates.lng, process.env.GEO_API_KEY); // current time
        
        let URL = await API_Func.makeURL(dateTime, coordinates, token); // create full URL for meteomatics Fetch API
       
        let value = await API_Func.weatherObj(URL); // fetch weather data

        res.json(value); // result of fetch API call is 'value' in json

    }
});

// if endpoint not met (404 error), send message
app.all('*', (req, res) => { 
    res.status(404).send('resource note found')
})

// server now listening for attempts from a client to connect at port
app.listen(port, () => { 
    console.log(`Frontend: Now listening`); 
});
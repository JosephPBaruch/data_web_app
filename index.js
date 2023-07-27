/* Joseph Baruch */

// access and display environment variables until correctly used in code 
require('dotenv').config(); // include dotenv module for environment variables
    //console.log(process.env.METEO_USER);
    //console.log(process.env.METEO_PASS);
    //console.log(process.env.GEO_API_KEY);

const express = require('express') // include express module
const path = require('path') // include path module 
const app = express() // create express application inside 'app'

const port = 3000;

// setup static and middleware
app.use(express.static('./public')) // set path to public folder

// send index.html to express app
app.get('/', (req, res) =>{
    res.sendFile('index.html', {root: __dirname }); 
});

// if endpoint not met (404 error), send message
app.all('*', (req, res) => { 
    res.status(404).send('resource note found')
})

// server now listening for attempts from a client to connect at port
app.listen(port, () => { 
    console.log(`Now listening in localhost`); 
});
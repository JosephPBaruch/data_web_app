/* Joseph Baruch */

require('dotenv').config()
const express = require('express') // include express module
const path = require('path') // include path module 
const app = express() // create express application inside 'app'

const port = 3000;

// setup static and middleware
app.use(express.static('./public')) // set path to public folder

// send index.html to express app
app.get('/', (req, res) =>{
    res.sendFile('app.html', {root: __dirname }); 
});

app.get('/results', (req, res) =>{
    fetch('http://localhost:3500/results?number=' + req.query.number + '&street=' + req.query.street + '&type=' + req.query.type + '&city=' + req.query.city + '&state=' + req.query.state ) // 'http://localhost:3000/results?number=14126&street=Rainy&type=Place&city=Boise&state=ID' ) 
         .then(res => {
             return res.json(); // treat fetch response as a .json format and return to next promise
         }).then( data => {
             res.json(data); //console.log(data);
         }).catch(error => console.log(error)); 
 });

// if endpoint not met (404 error), send message
app.all('*', (req, res) => { 
    res.status(404).send('resource note found')
})

// server now listening for attempts from a client to connect at port
app.listen(port, () => { 
    console.log(`Frontend: Now listening`); 
});
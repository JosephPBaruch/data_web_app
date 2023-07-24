/* Joseph Baruch */

require('dotenv').config();
console.log(process.env.METEO_USER);
console.log(process.env.METEO_PASS);
console.log(process.env.GEO_API_KEY);

const express = require('express') // include express module
const path = require('path')
const app = express() // create express application inside 'app'

const port = 3000;

// setup static and middleware
app.use(express.static('./public'))

app.get('/', (req, res) =>{
    res.sendFile('index.html', {root: __dirname }); // send index.html to express app
});

app.all('*', (req, res) => {
    res.status(404).send('resource note found')
})

app.listen(port, () => { // server now listening for attempts from a client to connect at port
    console.log(`Now listening on port ${port}`); 
});
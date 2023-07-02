/* Joseph Baruch 
   TODO: 
     - Comment every line and figure out what everything says. 
 */

const express = require('express'); // include express module

const app = express(); // create express application inside 'app'

const port = 3000; 

app.get('/', (req, res) =>{
    res.sendFile('index.html', {root: __dirname }); // send index.html to express app
});

app.listen(port, () => { // server now listening for attempts from a client to connect at port
    console.log(`Now listening on port ${port}`); 
});
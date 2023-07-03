/* Joseph Baruch 
   TODO: 
        - 
 */

const port = 3002; 

const express = require('express'); // include express module
const path = require('path');

const app = express(); // c
// setup static and middleware
//app.use(express.static('./public'))

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'index.html')) 
});

app.all('*', (req, res) => {
    res.status(404).send('resource not found')
})

app.listen(port, () => { // server now listening for attempts from a client to connect at port
    console.log(`Now listening on port ${port}`); 
});
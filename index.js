/* Joseph Baruch 
    TODO: 
        - API
            - Contact page
            - Other
         - Understand middleware
         - understand all code
 */

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
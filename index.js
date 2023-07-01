/* Joseph Baruch 
   TODO: 
     - Comment every line and figure out what everything says. 
 */

const express = require('express');

const app = express();

//const fetchData = require('/Users/joseph.baruch/Desktop/Git/data_web_app/fetch.js');
//console.log(fetchData);

app.use(express.static(__dirname+'/public')); // learn what this is ... what is express.static

const port = 3000;

app.get('/', (req, res) =>{
    res.sendFile('index.html', {root: __dirname });
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});
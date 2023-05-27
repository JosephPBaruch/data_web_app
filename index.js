const express = require('express');

const app = express();

app.use(express.static(__dirname+'/public'));

const port = 3003;

app.get('/', (req, res) =>{
    res.sendFile('index.html', {root: __dirname });
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});
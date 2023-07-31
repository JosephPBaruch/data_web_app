const express = require('express')
const path = require('path')

const port = 3700;
const app = express()

app.use(express.static('./public'))

app.get('/', (req, res) =>{
    let number = '14126';
    let street = 'Rainy';
    let type = 'Way';
    let city = 'Boise';
    let state = 'ID';
    async function doit(){
        let data = await fetch( 'http://localhost:3500/results?number=' + number + '&street=' + street + '&type=' + type + '&city='+ city + '&state=' + state ) 
        .then(res => {
            return res.json(); // treat fetch response as a .json format and return to next promise
        }).then( data => {
            res.json(data);
            //return data; 
        }).catch(error => console.log(error)); 
        res.json(data);

    }
    doit();

});

app.listen(port, () => { 
    console.log(`Now listening in localhost mockfront`); 
});


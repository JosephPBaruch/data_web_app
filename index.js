/* Joseph Baruch */
require('dotenv').config()
const express = require('express')
const path = require('path')

const port = 3500;
const app = express()

app.use(express.static('./public'))

app.get('/results', (req, res) =>{

    let number = req.query.number;
    let street = req.query.street;
    let type = req.query.type;
    let city = req.query.city;
    let state = req.query.state;

    // variables for renew (getting a new token after the previous expired)
    let oldToken;
    let oldHour = 0;
    let oldMin = 0;

    // header to be used in meteomatics token fetch  
    let headers = new Headers(); //
    headers.set('Authorization', 'Basic ' + btoa(process.env.METEO_USER + ":" + process.env.METEO_PASS)); 

    // static fetchData URL breakdown 
    let header = 'https://api.meteomatics.com/';
    let statType = 't_2m:F,uv:idx,wind_speed_10m:ms,wind_dir_10m:d,t_max_2m_24h:F,precip_24h:mm,t_min_2m_24h:F' + '/'; // temperature 2 meters above ground in F
    let dataType = 'json?'; // data type in .json form
    let access = 'access_token=';
     
    // main(): using the users inputted address, fetch coordinates then weather data

    async function main(){
        let coordinates = await latLong(number, street, type, city, state); // address to coordinates

        let token = await renewToken(); // meteomatics fetch token

        let dateTime = await date(); // current time
            
        let URL = await makeURL(dateTime, coordinates, token); // uses previous values to create URL

        let value = await weatherObj(URL); // fetch weather data
        
        res.json(value);

    }

    main();

      // return latitude and longitude in correct format for meteomatics api fetch
      async function latLong(number, street, type, city, state){
        let coordinates = await fetch( 'https://maps.googleapis.com/maps/api/geocode/json?address=+' + number + '+' + street + '+' + type + ',+' + city + ',+' + state + '&key=' + process.env.GEO_API_KEY) 
            .then(res => {
                return res.json(); // treat fetch response as a .json format and return to next promise
            }).then( data => {
                // return latitude and longitude
                //res.json
                //console.log(data);
                return data.results[0].geometry.location.lat + "," + data.results[0].geometry.location.lng + '/';
            }).catch(error => console.log(error)); 
        return coordinates;
    }

    // renewToken() renew's the meteomatics api token after expiration (every two hours)
    async function renewToken(){ // async because of await fetch

        var todayNow = new Date();  // new instance of date()

        if(oldHour == 0  || ((todayNow.getHours() - oldHour) >= 2) && // if first time or
            ((todayNow.getMinutes() - oldMin) >= 0 ) ){  // the difference of time is over 2 hourrs

            let newToken = await fetch('https://login.meteomatics.com/api/v1/token', { // fetch meteomatics api token
            method: 'GET', headers: headers // use credentials within header declared at the top of fetch.js
                }).then(res => { 
                    return res.json(); // return resulted promise as .json
                }).then(data => {
                    //console.log(data.access_token);
                    return data.access_token; // return token value
                }).catch(function (err) {
                    console.log('something went wrong', err);
            }); 

            // set the hours and minutes of last token
            oldHour = todayNow.getHours();
            oldMinute = todayNow.getMinutes();

            // set oldToken as current token (newToken)
            oldToken = newToken;

            return newToken;
        }else{ // if newToken is not needed...
            return oldToken; // return the previous token
        }
    }

    // return current date and time in the correct format for meteomatics fetch
    function date(){

        var today = new Date();  // new instance of date()

        if( (today.getMonth()+1) < 10 ){ // add '0' if current month < 10
            month = '0' + (today.getMonth()+1);
        }else{
            month = (today.getMonth()+1);
        }

        if( today.getMinutes() < 10 ){ // add '0' if current minute < 10
            minutes = '0' + today.getMinutes();
        }else{
            minutes = today.getMinutes();
        }

        // no need to modify hours because of military time  
        return today.getFullYear() + '-' + month + '-' + today.getDate() 
        + 'T' + today.getHours() + ':' + minutes + ':00.000-06:00/';
    }

    // creates correctly formatted URL for meteomatics api fetch
    function makeURL(dateTime, place, token){
        return header + dateTime + statType + place + dataType + access + token; 
    }

    // fetch and return meteomatics weather data in .json format
    async function weatherObj(URL){
        let obj = await fetch(URL) // fetch data using token fetched in renewToken()
            .then(res => {
                return res.json(); // treat fetch response as a .json format and return to next promise
            }).then( data => {
                return data;
        }).catch(error => console.log(error)); // logs error in console if caught 
        return obj;
    }
});

app.listen(port, () => { 
    console.log(`Backend: Now listening`); 
});

  
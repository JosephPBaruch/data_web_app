/* Joseph Baruch */

// variables for renew (getting a new token after the previous expired)
let oldToken;
let oldHour = 0;
let oldMin = 0;

// return latitude and longitude in correct format for meteomatics api fetch
exports.latLong = async function(req, key){
    // passed in parameters
    let number = req.query.number;
    let street = req.query.street;
    let type = req.query.type;
    let city = req.query.city;
    let state = req.query.state;
    
    let coordinates = await fetch( 'https://maps.googleapis.com/maps/api/geocode/json?address=+' + number + '+' + street + '+' + type + ',+' + city + ',+' + state + '&key=' + key) 
        .then(res => {
            return res.json(); // treat fetch response as a .json format and return to next promise
        }).then( data => {
            // return latitude and longitude
            return data.results[0].geometry.location;
        }).catch(error => console.log(error)); 
    return coordinates;
}

// renewToken() renew's the meteomatics api token after expiration (every two hours)
exports.renewToken = async function(user, pass){ // async because of await fetch
    // header to be used in meteomatics token fetch  
    let headers = new Headers(); //
    headers.set('Authorization', 'Basic ' + btoa( user + ":" + pass));

    var todayNow = new Date();  // new instance of date()

    if(oldHour == 0  || ((todayNow.getHours() - oldHour) >= 2) && // if first time or
        ((todayNow.getMinutes() - oldMin) >= 0 ) ){  // the difference of time is over 2 hourrs

        let newToken = await fetch('https://login.meteomatics.com/api/v1/token', { // fetch meteomatics api token
        method: 'GET', headers: headers // use credentials within header declared at the top of fetch.js
            }).then(res => { 
                return res.json(); // return resulted promise as .json
            }).then(data => {
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
exports.date = async function(lat, long, key){

    // find time offset from local (Docker container) time for user entered location
    let offset = await fetch('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + '%2C' + long + '&timestamp=1331161200&key=' + key ) 
        .then(res => {
            return res.json(); // treat fetch response as a .json format and return to next promise
        }).then( data => {
            return data.rawOffset / 60 / 60 ;
        }).catch(error => console.log(error)); 

    var today = new Date();  // new instance of date()

    let dateAdd = 0; // increase date if hour 'offset' value makes hour > 24 (hours)
    let monthChanger = 0; // increase month if date 'dateAdd' value makes date > 31 (days)

    // error handling if offset makes hour > 24
    if((today.getHours() + offset) > 24 ){
        hour = (today.getHours() + offset) - 24 ; 
        dateAdd++;
    }if((today.getHours() + offset) < 0){
        hour = (today.getHours() + offset) + 24 ; 
        dateAdd--;
    }else{
        hour = today.getHours() + offset;
    }

    // error handling if days > 31
    if(dateAdd != 0 ){
        date = today.getDate() + dateAdd;
        
        if(date > 31 ){
            monthChanger++;
            date = '0';
        }
        if(date <= 0 ){
            monthChanger--;
            date = '30';
        }
    }else{
        date = today.getDate();
    }

    // error handling if returned month is non double digit
    if( (today.getMonth()+1) < 10 ){ // add '0' if current month < 10
        month = '0' + (today.getMonth()+1);
    }else{
        month = (today.getMonth()+1);
    }

    // finish error handling if days > 31
    if(monthChanger != 0 ){
        month += monthChanger;
    }

    // error handling if returned minutes is non double digit
    if( today.getMinutes() < 10 ){ // add '0' if current minute < 10
        minutes = '0' + today.getMinutes();
    }else{
        minutes = today.getMinutes();
    }

    // no need to modify hours because of military time  
    return today.getFullYear() + '-' + month + '-' + date 
    + 'T' + hour + ':' + minutes + ':00.000-06:00/';
}

// creates correctly formatted URL for meteomatics api fetch
exports.makeURL = function(dateTime, place, token){
    // static fetchData URL breakdown 
    let header = 'https://api.meteomatics.com/';
    let statType = 't_2m:F,uv:idx,wind_speed_10m:ms,wind_dir_10m:d,t_max_2m_24h:F,precip_24h:mm,t_min_2m_24h:F' + '/'; // temperature 2 meters above ground in F
    let dataType = 'json?'; // data type in .json form
    let access = 'access_token=';
    return header + dateTime + statType + place.lat + "," +  place.lng  + '/' + dataType + access + token; 
}

// fetch and return meteomatics weather data in .json format
exports.weatherObj = async function(URL){
    let obj = await fetch(URL) // fetch data using token fetched in renewToken()
        .then(res => {
            return res.json(); // treat fetch response as a .json format and return to next promise
        }).then( data => {
            return data;
    }).catch(error => console.log(error)); // logs error in console if caught 
    return obj;
}
/* Joseph Baruch
   TODO:
    - Research asynchronous js so I can use the values in fetch. 
    - export to index.html
    - Properly display a value from fetch.js in index.html
    - Renew token every two hours
    - Multiple fetch statements 
    - hide credentials 
    - Eventually: Manipulate URL per users requests
   Note:
    - The issue I was having with declaring a variable for the returned fetch data was 
      because I was trying to print it out before it was generated.This was due to unfamiliarity 
      with asynchronous javaScript. 
 */

// header to be used in token fetch     
    // need to figure out how to hide this
    username = 'na_baruch' // why no variable declaration or semicolon
    password = 'K082ZKc6go' 

    let headers = new Headers(); //
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

// fetchData URL breakdown 
    let dateTime =  '2023-06-30T21:50:00.000-06:00' + '/'; // data and time
    let statType = 't_2m:F' + '/'; // temperature 2 meters above ground in F
    let place = '51.5073219,-0.1276474' + '/'; // long, lat
    let dataType = 'json?'; // data type in .json form
    // put everything together in the CORRECT ORDER
    let URL = 'https://api.meteomatics.com/' + dateTime + statType + place + dataType; 

// ------ fetch token ------------
    function getToken(){
        fetch('https://login.meteomatics.com/api/v1/token', {
            method: 'GET', headers: headers
            }).then(function (resp) {
                return resp.json();
            }).then(function (data) {
                var token = data.access_token;
                let accessAndToken = 'access_token=' + token;
                return fetchData(accessAndToken);
            }).catch(function (err) {
                console.log('something went wrong', err);
            });
    }
    
// ------ fetch weather data from the meteomatics API --------
    function fetchData(theToken){ // callback function to getToken()
        fetch(URL + theToken) // fetch data using token fetched in getToken()
            .then(res => {
                return res.json(); // treat fetch response as a .json format and return to next promis
            }).then( data => {
                displayData(data.data[0].coordinates[0].dates[0].value);
            }).catch(error => console.log(error)); // logs error in console if caught 
    }

// ------ display/return function ----------
    function displayData(theData){
        console.log(theData);
        // return theData; 
    }

// ----- run the code -----
    getToken();


    
/* Joseph Baruch 
    TODO:
        1. Hide user and password
        2. Fetch more data types
        3. Renewing token
        4. Updatable time
        5. Changable location
 */

// header to be used in token fetch     
    username = 'na_baruch' 
    password = 'K082ZKc6go' 

    let headers = new Headers(); //
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

// fetchData URL breakdown 
    let dateTime =  '2023-07-05T10:05:00.000-06:00' + '/'; // data and time
    let statType = 't_2m:F,sunrise:sql,uv:idx' + '/'; // temperature 2 meters above ground in F
    let place = '43.7324936,-116.283308' + '/'; // long, lat
    let dataType = 'json?'; // data type in .json form
    let access = 'access_token=';
    // put everything together in the CORRECT ORDER
    let URL = 'https://api.meteomatics.com/' + dateTime + statType + place + dataType + access; 

// ------ fetch token ------------
let data = fetch('https://login.meteomatics.com/api/v1/token', {
    method: 'GET', headers: headers
    }).then(res => {
        return res.json();
    }).then(data => {
        return fetch(URL + data.access_token) // fetch data using token fetched in getToken()
            .then(res => {
                return res.json(); // treat fetch response as a .json format and return to next promis
            }).then( data => {
                return data;
            }).catch(error => console.log(error)); // logs error in console if caught 
    }).catch(function (err) {
        console.log('something went wrong', err);
});


// https://api.meteomatics.com/2023-07-04T10:05:00.000-06:00/t_2m:F,sunrise:sql,uv:idx/43.7324936,-116.283308/json?model=mix
/* Joseph Baruch 
    TODO:
        1. Hide user and password
        3. Renewing token
        5. Changable location
        Google API Key: AIzaSyCUdVpwLf0e1MXJ9n7JxPC4xra_ewrOCoM
 */

    // = '43.7324936,-116.283308' + '/'; // long, lat
    
    if(coordinates){
        console.log(coordinates);
        let data = fetches(coordinates);
    }

function fetches(place){
    console.log(place);
    // header to be used in token fetch     
        username = 'na_baruch' 
        password = 'K082ZKc6go' 
        let hello;
        let headers = new Headers(); //
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

    // fetchData URL breakdown 
        var today = new Date(); 
        let dateTime = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() 
                    + 'T' + today.getHours() + ':' + today.getMinutes() + ':00.000-06:00/'; // data and time
                        
        let statType = 't_2m:F,sunrise:sql,uv:idx' + '/'; // temperature 2 meters above ground in F
        let dataType = 'json?'; // data type in .json form
        let access = 'access_token=';
        // put everything together in the CORRECT ORDER
        let URL = 'https://api.meteomatics.com/' + dateTime + statType + place + dataType + access; 
        console.log(URL);
    // ------ fetch token ------------
    let stuff = fetch('https://login.meteomatics.com/api/v1/token', {
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
    return stuff;
}
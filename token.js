/* Joseph Baruch
   TODO:
    - figure out callbacks so I can put 'token' inside an object to be used in my fetch weather data section. 
    - include this file in the html file so I don't need to put all the fetch calls in index.html
    - figure out how to renew my token when it expires (this will be a problem that I will solve later down the line)
    - Multiple fetch statements for the different types of data that I will display
    - need to figureout how to manipulate the URL so I can get differnet times, data types and locations.
        - this goes into the callbacks problem   

    https://api.meteomatics.com/2023-06-29T21:50:00.000-06:00/t_2m:F/51.5073219,-0.1276474/json?model=mix
 */

// header to be used in token fetch     
    username = 'na_baruch'
    password = 'K082ZKc6go'

    let dateTime =  '2023-06-29T21:50:00.000-06:00' + '/';
    let statType = 't_2m:F' + '/';
    let place = '51.5073219,-0.1276474' + '/';
    let dataType = 'json?'; //json?model=mix?   ...... json?
    let URL = 'https://api.meteomatics.com/' + dateTime + statType + place + dataType;
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

// ------ fetch token ------------
    function getToken(){
        fetch('https://login.meteomatics.com/api/v1/token', {
            method: 'GET', headers: headers
            }).then(function (resp) {
                return resp.json();
            }).then(function (data) {
                var token = data.access_token;
                console.log('token', token);
                let accessAndToken = 'access_token=' + token;
                fetchData(accessAndToken);
            }).catch(function (err) {
                console.log('something went wrong', err);
            });
    }
    
// ------ fetch weather data from the meteomatics API --------
    function fetchData(theToken){
        console.log(URL);
        fetch(URL + theToken)
            .then(res => {
                return res.json();
            }).then( data => {
                console.log(data.data[0].coordinates[0].dates[0].value); 
            }).catch(error => console.log(error));
    }
    
    getToken();
/* Joseph Baruch 
    Initial Coordinates: 43.7324936,-116.283308
    TODO:
        1. Hide user and password
        3. Renewing token
        
*/

    // header to be used in token fetch     
        username = 'na_baruch' 
        password = 'K082ZKc6go' 
        let headers = new Headers(); //
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

    // fetchData URL breakdown 
        
        let statType = 't_2m:F,sunrise:sql,uv:idx' + '/'; // temperature 2 meters above ground in F
        let dataType = 'json?'; // data type in .json form
        let access = 'access_token=';
        
    // ------ fetch token ------------

    let data = async function asyncAwait(coordinates){
        let token = await fetch('https://login.meteomatics.com/api/v1/token', {
            method: 'GET', headers: headers
            }).then(res => {
                return res.json();
            }).then(data => {
                return data;
               
            }).catch(function (err) {
                console.log('something went wrong', err);
        });

        let dateTime = await date();
            
        let URL = await makeURL(dateTime, coordinates);
          
        let value = await fetch(URL + token.access_token) // fetch data using token fetched in getToken()
            .then(res => {
                return res.json(); // treat fetch response as a .json format and return to next promis
            }).then( data => {
                return data;
            }).catch(error => console.log(error)); // logs error in console if caught 
       // console.log(value);
       return value;
    }
    
    function makeURL(dateTime, place){
        return 'https://api.meteomatics.com/' + dateTime + statType + place + '/' + dataType + access; 
    }

    function date(){
        var today = new Date();  
        if( (today.getMonth()+1) > 10 ){
            month = '0' + (today.getMonth()+1);
        }else{
            month = (today.getMonth()+1);
        }

        if( today.getMinutes() < 10 ){
            minutes = '0' + today.getMinutes();
        }else{
            minutes = today.getMinutes();
        }

        return today.getFullYear() + '-' + month + '-' + today.getDate() 
        + 'T' + today.getHours() + ':' + minutes + ':00.000-06:00/';
    }
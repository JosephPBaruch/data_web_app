/* Joseph Baruch */
    // Variables for reNew (getting a new token after the previous expired)
    let oldToken;
    let oldHour = 0;
    let oldMin = 0;

    // header to be used in token fetch  
        let headers = new Headers(); //
        headers.set('Authorization', 'Basic ' + btoa('na_baruch' + ":" + 'K082ZKc6go'));

    // fetchData URL breakdown 
        
        let statType = 't_2m:F,sunrise:sql,uv:idx' + '/'; // temperature 2 meters above ground in F
        let dataType = 'json?'; // data type in .json form
        let access = 'access_token=';
        
    // ------ fetch token ------------
     let data = async function asyncAwait(address){
       
        let coordinates = await fetch( address + 'AIzaSyCUdVpwLf0e1MXJ9n7JxPC4xra_ewrOCoM') 
            .then(res => {
                return res.json(); // treat fetch response as a .json format and return to next promis
            }).then( data => {
                return data.results[0].geometry.location.lat + "," + data.results[0].geometry.location.lng;
            }).catch(error => console.log(error)); 
        
        let token = await renew();

        let dateTime = await date();
            
        let URL = await makeURL(dateTime, coordinates, token);
     
        let value = await fetch(URL) // fetch data using token fetched in getToken()
            .then(res => {
                return res.json(); // treat fetch response as a .json format and return to next promis
            }).then( data => {
                return data;
            }).catch(error => console.log(error)); // logs error in console if caught 
        return value; // this I believe is running before everything else. How do we return something to data?

    }

    function makeURL(dateTime, place, token){
        console.log(token);
        return 'https://api.meteomatics.com/' + dateTime + statType + place + '/' + dataType + access + token; 
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

    async function renew(){
        var todayNow = new Date();  
        if(oldHour == 0  || ((todayNow.getHours() - oldHour) >= 2) && ((todayNow.getMinutes() - oldMin) >= 0 ) ){
            console.log(oldHour);
            let newToken = await fetch('https://login.meteomatics.com/api/v1/token', {
            method: 'GET', headers: headers
            }).then(res => {
                return res.json();
            }).then(data => {
                return data.access_token;
            }).catch(function (err) {
                console.log('something went wrong', err);
            }); 
            oldHour = todayNow.getHours();
            oldMinute = todayNow.getMinutes();
            oldToken = newToken;
            return newToken;
        }else{
            return oldToken;
        }
    }
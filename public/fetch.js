/* Joseph Baruch 
    TODO:
        1. Hide user and password
        3. Renewing token
        5. Changable location
        


    // header to be used in token fetch     
        username = 'na_baruch' 
        password = 'K082ZKc6go' 
        let headers = new Headers(); //
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

    // fetchData URL breakdown 
        var today = new Date(); 
        let dateTime = today.getFullYear() + '-' + '0' + (today.getMonth()+1) + '-' + today.getDate() 
                    + 'T' + today.getHours() + ':' + '0' + today.getMinutes() + ':00.000-06:00/'; // data and time
                    // if getMonths is less than 10 add '0' to the front
                    // if getMinutes is less than 10 add '0' to the front
        let place = '43.7324936,-116.283308' + '/';             
        let statType = 't_2m:F,sunrise:sql,uv:idx' + '/'; // temperature 2 meters above ground in F
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
*/

    async function letsGetData(place){
        try{
            let dateTime = await function date(){
                if( (today.getMonth()+1) > 10 ){
                    month = '0' + (today.getMonth()+1);
                }else{
                    month = (today.getMonth()+1);
                }

                if( today.getMinutes() > 10 ){
                    minutes = '0' + today.getMinutes();
                }else{
                    mintues = today.getMinutes();
                }

                return today.getFullYear() + '-' + month + '-' + today.getDate() 
                + 'T' + today.getHours() + ':' + minutes + ':00.000-06:00/';
                console.log('hi');
            }
            //console.log(dateTime);
            //let URL = await function theURL(dateTime){
            //    console.log('https://api.meteomatics.com/' + dateTime + statType + place + '/' + dataType + access ); 
            //}
            //await function display(URL){
            //    console.log(URL);
            //}
        }catch (error){
            console.log(error);
        }
    }


/* Joseph Baruch
   TODO:
    - figure out callbacks so I can put 'token' inside an object to be used in my fetch weather data section. 
    - include this file in the html file so I don't need to put all the fetch calls in index.html
    - figure out how to renew my token when it expires (this will be a problem that I will solve later down the line)
    - Multiple fetch statements for the different types of data that I will display
    - need to figureout how to manipulate the URL so I can get differnet times, data types and locations.
        - this goes into the callbacks problem   
 */

// header to be used in token fetch     
    username='na_baruch'
    password='K082ZKc6go'
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

// ------ fetch token ------------
    fetch('https://login.meteomatics.com/api/v1/token', {
        method: 'GET', headers: headers

        }).then(function (resp) {
            return resp.json();
        }).then(function (data) {
            var token = data.access_token;
            console.log('token', token);
        }).catch(function (err) {
            console.log('something went wrong', err);
        });

// ------ fetch weather data from the meteomatics API --------
    // this fetch statement will not be this long. 
    fetch("https://api.meteomatics.com/2023-06-28T12:05:00.000-06:00/t_2m:F/43.7327012,-116.2831349/json?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJ2IjoxLCJ1c2VyIjoibmFfYmFydWNoIiwiaXNzIjoibG9naW4ubWV0ZW9tYXRpY3MuY29tIiwiZXhwIjoxNjg3OTk2MTUzLCJzdWIiOiJhY2Nlc3MifQ.zd_hzowA87WWXu2ixGyBG3KDIubwNDoJEt4s5iiz9AJm92JOQTY2fdxA-3JYBklanqevxXis70-dCh05yK_DhA" )
        .then(res => {
            return res.json();
        }).then( data => {
            console.log(data.data[0].coordinates[0].dates[0].value); 
        }).catch(error => console.log(error));

username='na_baruch'
password='K082ZKc6go'
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
/*
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
*/

fetch("https://api.meteomatics.com/2023-06-28T12:05:00.000-06:00/t_2m:F/43.7327012,-116.2831349/json?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJ2IjoxLCJ1c2VyIjoibmFfYmFydWNoIiwiaXNzIjoibG9naW4ubWV0ZW9tYXRpY3MuY29tIiwiZXhwIjoxNjg3OTk2MTUzLCJzdWIiOiJhY2Nlc3MifQ.zd_hzowA87WWXu2ixGyBG3KDIubwNDoJEt4s5iiz9AJm92JOQTY2fdxA-3JYBklanqevxXis70-dCh05yK_DhA" )
              .then(res => {
                    return res.json();
                }).then( data => {
                  console.log(data.data[0].coordinates[0].dates[0].value); // .data[0].coordinates[0].dates[0].value\

                }).catch(error => console.log(error));



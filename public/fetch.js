/* Joseph Baruch */

// fetch to backend so I can do my fetch API calls and use my protected environment variables
let data = async function main( number, street, type, city, state){
    let data = await fetch('http://localhost:3000/results' + '?number=' + number + '&street=' + street + '&type=' + type + '&city='+ city + '&state=' + state ) 
        .then(res => {
            return res.json(); // treat fetch response as a .json format and return to next promise
        }).then( data => {
            return data;
        }).catch(error => console.log(error)); 
    return data;    
}
/* Joseph Baruch */

     let data = async function main( number, street, type, city, state){
            let data = await fetch( 'http://localhost:3500/results?number=' + number + '&street=' + street + '&type=' + type + '&city='+ city + '&state=' + state ) 
                .then(res => {
                    return res.json(); // treat fetch response as a .json format and return to next promise
                    //console.log(res);
                }).then( data => {
                    //res.json(data);
                    //return data; 
                    console.log(data);
                }).catch(error => console.log(error)); 
            return data;    
     }
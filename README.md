# Data

> A web application displaying data in mulitple forms. Web App Two. 

## Displayed information 

1. Will be displaying infomation form an example api at the beginning 
2. API: 
3. 
        <!-- .then(res => {
                return res.json();
            })
            .then(data => {
                data.for( user => {
                    const markup = `<li>${user.title}</li>`;
                    document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
                })
            })
            .catch(error => console.log(error));
        --> 

## TODO
1. Go through index.js and read documentation about function calls. 
2. Resolve port issue.
3. Create seperate js file for api functions. 
3. b: Research callbacks, promises, and await. 
4. Create function for retrieving token. 
5. Create function for retrieving weather using token as a passed argument or call function within retrieving weather function. 
6. Call function from html and figure out how to display it. 


* With functions make sure to implement callbacks as network responses take time to complete. 
* know what callbacks are


# Terminating a Local Host Server

- sudo lsof -i :<port number>
- kill -9 <PID>



            
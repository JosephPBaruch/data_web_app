# Weather Data

> A web application displaying weather data for a given ZIPCODE. Powered by Meteomatics. 

## Meteomatics Infomation and Documentation
1. MeteoMatics API Documentation 
- https://www.meteomatics.com/en/api/getting-started/
2. URL Creator
- https://meteomatics.com/url-creator/
3. Authentication/Token Documentation
- https://www.meteomatics.com/en/api/request/api-requests-oauth-authentification/
4. API Requests Documentation
- https://www.meteomatics.com/en/api/request/

## TODO
> Located within each documnet.

### Terminating a Local Host Server
- sudo lsof -i :<port number>
- kill -9 <PID>
- ? Is there a way to do this authomatically withing package.json?

### Spinning Up a Local Host Server 
- node index.js

## GitHub Cheat Sheet

1. Merge (local) from a branch to main.
- git merge main <branchName> 
2. Update local repository with GitHub.
- git pull origin main 
3. Clone GitHub repo to local computer.
- git clone <URL>
4. Push branch to make a pull request.
- git push origin <branchName>
5. Delete Repository
- git branch -D <branchName>
6. Make a commit with a comment.
- git commit -m "Comment"
7. Add (all) changes (files).
- git add .
8. Change to a different branch.
- git checkout <branchName>

## Coding Log

> Log Started 6/29/2023. Repository initialized 5/2023.

- 6/29/2023: Moved my fetch api calls into a functions so I could callback fetchData();.
- 6/30/2023: Tried to include fetch.js into index.html but there is an issue with the MIME type (?). I need to experiment with this more and figure out how to properly include the file.
- 7/1/2023: Having trouble exporting my fetch.js file in my index.html file. I am not sure what the issue is. Need to continue to research this to figure out the solution.
- 7/2/2023: Reasearched node.js, express.js and javascript to better understand what is going on behind the scenes. Added the path module to my index.js file and this fixed the problem with linking fetch.js file and index.html. Next, I need to figure out how to extract my data value from my .then() promise in fetch.js. 
- 7/3/2023: Was able to successfully display weather data fetched from the Meteomatics API to my localhost server on index.html. I did this through researching more on promises. Result isnt exactly what I want but it will do for now in building my website. Also, updated TODO for each file, updated README, and added styles.css.
- 7/4/2023: Meteomatics allows more parameters withing their URL for fetching data. This will make it very easy to use the same token for multiple data types. It will just take more code withing index.html. I need to see if I can return more than one object in a return statement. 
- 7/5/2023: Now that I can get information to index.html from meteomatics I need to be able to disply it properly. I am going to start to develope my page using html and css. I will explore the idea of learning react but we shall see. Today, all I did was mess around with adding some basic css and html. I added my styles.css file to my index.html file and it worked fine.
- 7/6/2023: Going to start implementing user input for a location that an API (google) then provides the coordinates. Researched a bit about the google geocoding api. Researched how to store html in js. Need to figure out how the order of execution for my api. 
- 7/7/2023: Didnt really have time to code today. Went on a backpacking trip. 
- 7/8/2023: On a backpacking trip. No coding.
- 7/9/2023: Updated coding log and TODO. 
- 7/10/2023: Setup lock that automatically changes time. User imput stored in 'obj'. Need to understand async js to update coordinates in fetch. 
- 7/11/2023: Removed GCP key. Fixed bugs with time in fetch. Researched async javascript. 
- 7/12/2023: Updated coding log, TODO, and worked more in fetch.js. 
            

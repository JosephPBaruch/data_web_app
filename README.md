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

## Nodes
* With functions make sure to implement callbacks as network responses take time to complete. 
* know what callbacks are.

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
- 7/2/2023: Reasearched node.js, express.js and javascript to better understand what is going on behind the scenes. 
- 7/3/2023: Was able to successfully display weather data fetched from the Meteomatics API to my localhost server on index.html. I did this through researching more on promises. Result isnt exactly what I want but it will do for now in building my website. Also, updated TODO for each file, updated README, and added styles.css.

            

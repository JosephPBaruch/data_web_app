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
1. ()Go through index.js and read documentation about function calls. 
2. (Complete)Resolve port issue.
3. ()Create seperate js file for api functions. 
3. ()b: Research callbacks, promises, and await. 
4. ()Create function for retrieving token. 
5. ()Create function for retrieving weather using token as a passed argument or call function within retrieving weather function. 
6. ()Call function from html and figure out how to display it. 
7. Paste all links to documentation 

## Nodes
* With functions make sure to implement callbacks as network responses take time to complete. 
* know what callbacks are.

### Terminating a Local Host Server
- sudo lsof -i :<port number>
- kill -9 <PID>

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
6. Make a commit with comment 
- git commit -m "Comment"
7. Add (all) changes (files).
- git add .
8. Change to a different branch.
- git checkout <branchName>





            
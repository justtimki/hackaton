Before starting you need install Node.js (v6.6.0) - https://nodejs.org/en/ 

Install K-app frontend:
```
cd {app_home}/frontend
install.bat
```

In installing process you have to enter your epam domain credentials (cuz we download uui-framework from epam git repo), 
after all finished site will be apper in your browser.

To run site use run.bat.

To have some tests data you should install json-server (it's while backend test data not ready):
```
npm install -g json-server
cd {app_home}/frontend
json-server --watch db.json -p 3004
```

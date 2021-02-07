# TechTypescriptExercise

## Config file
1. locate in ./src/configuration/config.json
2. include configuration of external service url, API key and so on
3. include server port, log configuration

## Dependancy installation
1. install nodejs 10.16.3
2. navigate into project root, key in `npm install`

## Npm Script [npm page](https://docs.npmjs.com/misc/scripts)
1. use `npm run clean` to clean dist folder
2. use `npm run lint` to check code format 
3. use `npm run build` build project
4. use `npm run test` start unit tests
5. use `npm run dev` start application in development mode
6. use `npm run start` start application in production mode
7. use `npm run test:watch` watch test in watching mode
8. use `npm run coverage` test analysis

##Authentication:
#### username: admin, password:admin
   format is based64 encoded > username:password and placed in header
   as Authorization: Basic YWRtaW46YWRtaW4=

## main endpoint - http://localhost:8080/
## endpoint /current/get
###### description: query status of weather and latest stripe status and time
###### parameters: -ip: string of ip format
                    if ip exist, query will based on ip as example: http://localhost:8080/current/get?ip=37.228.234.179
                    if ip not exist, query will based on client's ip: http://localhost:8080/current/get
                    
## EXAMPLES:
###### CURL > curl -i -H "Authorization: Basic YWRtaW46YWRtaW4=" http://localhost:8080/current/get?ip=37.228.234.179
###### CURL > curl -i -H "Authorization: Basic YWRtaW46YWRtaW4=" http://localhost:8080/current/get

// const express = require ('express');
// const routes = require('./route/EmployeeRoute'); // import the routes

// const app = express();

// app.use(express.json());

// app.use('/', routes); //to use the routes

// const listener = app.listen(process.env.PORT || 3000, () => {
//     console.log('Your app is listening on port ' + listener.address().port)
// })
// TODO: Organize Packages, Globals and Instantiations
// Packages : .env
require('dotenv').config();
// Packages : Paths
const path = require('path');

// Globals : Paths
global.appRoot = path.resolve(__dirname);
global.appRoute = path.resolve(__dirname + "/routes");
global.appController = path.resolve(__dirname + "/controller");
global.appHelper = path.resolve(__dirname + "/helper");
global.appMiddleware = path.resolve(__dirname + "/middleware/global");
global.appTest = path.resolve(__dirname + "/test");
global.appDb = path.resolve(__dirname + "/database");
const express = require ('express');
const routes = require('./routes/EmployeeRoute'); // import the routes

const app = express();

app.use(express.json());

app.use('/', routes); //to use the routes

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoute = require('./routes/employeeRoutes');
const skillRoute = require('./routes/skillRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', employeeRoute.routes, skillRoute.routes);





app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port )
});
const { json } = require('body-parser');
const Express = require('express');
const router = Express.Router();
// const EmployeeController = require('../controllers/EmployeeController');
const EmployeeController = require(`${global.appController}/EmployeeController`);
const Employee = new EmployeeController();


// const express = require('express'); //import express

// // 1.
// const router  = express.Router(); 
// // 2.
// const Controller = require('../controllers/EmployeeController'); 
// // 3.
// router.post('/EmployeeInsert', Controller.EmployeeController); 

router.post('/EmployeeInsert/', async (req, res) => {
	var response = await Employee.EmployeeInsert(req.body);
	global.RouteLogs(req.params);
	if (response.http_code) res.status(response.http_code);
	res.send(response);
});



// 4. 
module.exports = router; // export to use in server.js









// const Express = require('express');
// const router = Express.Router();
// const EmployeeController = require(`${global.appController}/EmployeeController`);
// const Employee = new EmployeeController();
// // const objname = "Employee";
// // const version = "v1";

// //insert
// router.post('/EmployeeInsert/', async (req, res) => {
// 	var response = await Employee.EmployeeInsert(req.body);
// 	global.RouteLogs(req.params);
// 	if (response.http_code) res.status(response.http_code);
// 	res.send(response);
// });



// module.exports = router;

const { json } = require('body-parser');
const Express = require('express');

const router = require("express").Router();

const EmployeeController = require(`${global.appController}/EmployeeController`);
const Employee = new EmployeeController();


router.post('/EmployeeInsert/', async (req, res) => {
	var response = await Employee.EmployeeInsert(req.body);
	global.RouteLogs(req.params);
	if (response.http_code) res.status(response.http_code);
	res.send(response);
});



// 4. 
module.exports = router; // export to use in server.js

'use strict';

const express = require('express');
const employeeControl = require('../controllers/employeeController');
const router = express.Router();

router.get('/getEmployees', employeeControl.getAllEmployee);
router.get('/getEmployeeByID/:id', employeeControl.getEmployeeById);
router.post('/addEmployee', employeeControl.addEmployee);
router.put('/updateEmployee/:id', employeeControl.updatEmployee);
router.delete('/deleteEmployee/:id', employeeControl.deleteEmployee);


module.exports = {
    routes: router
}
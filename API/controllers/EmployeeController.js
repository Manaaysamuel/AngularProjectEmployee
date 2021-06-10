'use strict';

// const employeeData = require('../data/employees');
const employeeData = require('../data/employees');

const getAllEmployee = async (req, res, next) => {
    try {

        const emplist = await employeeData.getEmployee();
        res.send(emplist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getEmployeeById = async (req, res, next) => {
    try {
        const EmployeeID = req.params.id;
        const employee = await employeeData.getEmployeeById(EmployeeID);
        res.send(employee);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addEmployee = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await employeeData.creatEmployee(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatEmployee = async (req, res, next) => {
    try {
        const employeeId =  req.params.id;
        const data = req.body;
        console.log(employeeId,data, 'DATA HEEERREE')
        const updated = await employeeData.updateEmployee(employeeId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEmployee = async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await employeeData.deleteEmployee(employeeId);
        res.send(deletedEmployee);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllEmployee,
    getEmployeeById,
    addEmployee,
    updatEmployee,
    deleteEmployee
}
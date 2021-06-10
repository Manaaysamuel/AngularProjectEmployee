'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getEmployee = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('employees');
        const getEmployee = await pool.request().query(sqlQueries.getEmployee);
        return getEmployee.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

//karon kalang
const getEmployeeById = async(EmployeeID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('employees');
        const event = await pool.request()
                            .input('EmployeeID', sql.Int, EmployeeID)
                            .query(sqlQueries.getEmployeeById);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const creatEmployee = async (empdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('employees');
        const insertEmployee = await pool.request()
                            .input('FirstName', sql.NVarChar(100), empdata.FirstName)
                            .input('LastName', sql.NVarChar(100), empdata.LastName)
                            .input('Birthdate', sql.Date, empdata.Birthdate)
                            .query(sqlQueries.createEmployee);                            
        return insertEmployee.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateEmployee = async (employeeId, empdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('employees');
        const update = await pool.request()
                        .input('EmployeeID', sql.Int, employeeId)
                        .input('FirstName', sql.NVarChar(100), empdata.FirstName)
                        .input('LastName', sql.NVarChar(100), empdata.LastName)
                        .input('Birthdate', sql.Date, empdata.Birthdate)
                        .query(sqlQueries.updateEmployee);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteEmployee = async (employeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('employees');
        const deleteEmployee = await pool.request()
                            .input('EmployeeID', sql.Int, employeeId)
                            .query(sqlQueries.deleteEmployee);
        return deleteEmployee.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getEmployee,
    getEmployeeById,
    creatEmployee,
    updateEmployee,
    deleteEmployee
}
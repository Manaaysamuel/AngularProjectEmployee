var config = require('./dbconfig');
const sql = require('mssql');


async function getEmployees() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from EmployeeInfo");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEmployee(EmployeeID) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, EmployeeID)
            .query("SELECT * from EmployeeInfo where Id = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function addEmployee(Employee) {

    try {
        let pool = await sql.connect(config);
        let insertEmployee = await pool.request()
            .input('FirstName', sql.NVarChar, Employee.FirstName)
            .input('LastName', sql.NVarChar, Employee.LastName)
            .input('Birthdate', sql.Date, Employee.Birthdate)
            .execute('InsertEmployee');
        return insertEmployee.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}






module.exports = {
    getEmployees: getEmployees,
    getEmployee : getEmployee,
    addEmployee : addEmployee
}
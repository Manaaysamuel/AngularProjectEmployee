const { connect } = require("../services/database");
const formatDate = require("../utils/dateparser");

function Employee(EmployeeInfo) {
  const { Name, 
          LastName, 
          Birthdate, 
          Skills } = EmployeeInfo;
  if (Name && 
      LastName && 
      Birthdate) {
    ndate = formatDate.getDateYMDFormat(Birthdate);
    return {
      Name: Name,
      LastName: LastName,
      Birthdate: Birthdate,
      Skills: Skills,
    };
  }
  return false;
}

const getAllEmployee = () =>
  new Promise(
    (resolve, reject
      ) => {
    connect
      .then(async (res) => {
        result = await res.model("Employee").findAll();
        data = result.map(
          (value) => {
          content = value.dataValues;
          return {
            EmpID: content.EmpID,
            Name: content.Name,
            LastName: content.LastName,
            Birthdate: content.Birthdate,
            Skills: content.Skills != null ? 
            content.Skills.split(",") : [],
          };
        });
        resolve(data);
      })
      .catch((err) => {
        console.error(err);
        reject("failed");
      });
  });

const getEmployee = (EmpID) =>
  new Promise((resolve, reject) => {
    connect
      .then(async (res) => {
        result = await res
          .model("Employee")
          .findAll(
        { where: { EmpID: EmpID } });
        data = result.map((val) => {
          content = val.dataValues;
          return {
            EmpID: content.EmpID,
            Name: content.Name,
            LastName: content.LastName,
            Birthdate: content.Birthdate,
            Skills: content.Skills != null ? 
            content.Skills.split(",") : [],
          };
        });
        resolve(data[0]);
      })
      .catch((err) => {
        console.error(err);
        reject("failed");
      });
  });

const addEmployee = (employee) =>
  new Promise((resolve, reject) => {
    connect
      .then(async (res) => {
        newEmployee = await 
        res.model("Employee").create(employee);
        resolve(newEmployee.Name);
      })
      .catch((err) => {
        console.error(err);
        reject("failed");
      });
  });

const updateEmployee = (EmpID, employee) =>
  new Promise((resolve, reject) => {
    connect
      .then(async (res) => {
        updatedEmployee = await 
        res.model("Employee").update(employee, {
          where: { EmpID: EmpID },
        });
        resolve(updatedEmployee.Name);
      })
      .catch((err) => {
        console.error(err);
        reject("failed");
      });
  });

const removeEmployee = (id) =>
  new Promise((resolve, reject) => {
    connect
      .then((res) => {
        res.model("Employee").destroy
        ({ where: { EmpID: id } });
        resolve("Employee has been successfully removed");
      })
      .catch((err) => {
        console.error(err);
        reject("failed");
      });
  });

module.exports = {
  Employee,
  getAllEmployee,
  getEmployee,
  addEmployee,
  updateEmployee,
  removeEmployee,
};

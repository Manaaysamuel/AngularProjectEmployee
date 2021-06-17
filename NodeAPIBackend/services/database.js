const { Sequelize, DataTypes } = require("sequelize");
const mysql = require("mysql2");

const database = "employeeinformation";

const connect = new Promise(
  (resolve, reject) => {
  try {
    conn = mysql.createConnection({ host: "localhost", port: 3306, user: "root", password: "sam72394",
    });
    conn.connect((err) => {
      if (err) {
        console.log("Cannot connect to Database, Please Check your connection ", err);
        reject(false);
      } else {
        conn.query(
          `CREATE DATABASE IF NOT EXISTS ${database}`,
          async (err, res) => {
            if (err) {
              console.log("Unable To Create Database: ", err);
              reject(false);
            } else {
              if (res.affectedRows){
              console.log("Connected");
              } 
              else {
                console.log("Database does already exists");
              } 
              conn.end();
              try {
                const sequelize = await new Sequelize(
                  database,
                  "root",
                  "sam72394",
                  { host: "localhost",port: 3306,dialect: "mysql", dialectModule: require("mysql2"), logging: false, }
                );
                createTableEmployee(sequelize);
                createTableSkill(sequelize);
                sequelize.sync();
                resolve(sequelize);
              } catch (err) {
                console.error(err);
                reject(false);
              }
            }
          }
        );
      }
    });
  } catch (err) {
    console.error(err);
  }
});

function createTableEmployee(sequelize) {
  sequelize.define(
    "Employee",
    {
      EmpID: {
        field: "EmpID",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        field: "Name",
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        field: "LastName",
        type: DataTypes.STRING,
        allowNull: false,
      },
      Birthdate: {
        field: "Birthdate",
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      Skills: {
        field: "Skills",
        type: DataTypes.STRING,
      },
    },
    { tableName: "employee" }
  );
}

function createTableSkill(sequelize) {
  sequelize.define(
    "Skill",
    {
      SkillID: {
        field: "SkillID",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      SkillName: {
        field: "SkillName",
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: "skill" }
  );
}

module.exports = {
  connect,
};

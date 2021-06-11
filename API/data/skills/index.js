"use strict";
const utils = require("../utils");
const config = require("../../config");
const sql = require("mssql");

const createSkill = async (skilldata) => {
  console.log(skilldata.SkillName, "Index");
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("skills");
    const insertSkill = await pool
      .request()
      .input("SkillName", sql.NVarChar(100), skilldata.SkillName)
      .query(sqlQueries.createSkill);
    return insertSkill.recordset;
  } catch (error) {
    return error.message;
  }
};

const getSkills = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("skills");
    const getSkills = await pool.request().query(sqlQueries.getSkills);
    return getSkills.recordset;
  } catch (error) {
    console.log(error.message);
  }
};
const getSkillById = async (SkillID) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("skills");
    const getskillById = await pool
      .request()
      .input("SkillID", sql.Int, SkillID)
      .query(sqlQueries.getSkillById);
    return getskillById.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateSkill = async (SkillID, skilldata) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("skills");
    const update = await pool
      .request()
      .input("SkillID", sql.Int, SkillID)
      .input("SkillName", sql.NVarChar(100), skilldata.SkillName)
      .query(sqlQueries.updateSkill);
    return update.recordset;
  } catch (error) {
    return error.message;
  }
};
const deleteSkill = async (SkillID) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("skills");
    const deleteEmployee = await pool
      .request()
      .input("SkillID", sql.Int, SkillID)
      .query(sqlQueries.deleteSkill);
    return deleteEmployee.recordset;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};

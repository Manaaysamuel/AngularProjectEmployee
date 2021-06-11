"use strict";

const express = require("express");
const skillControl = require("../controllers/skillController");
const router = express.Router();

router.post("/addSkill", skillControl.addSkill);
router.get("/getAllSkills", skillControl.getAllSkills);
router.get("/getSkillByID/:id", skillControl.getSkillById);
router.put("/updateEmployee/:id", skillControl.updateSkill);
router.delete("/deleteEmployee/:id", skillControl.deleteSkill);

module.exports = {
  routes: router,
};

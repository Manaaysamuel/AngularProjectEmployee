'use strict';

const express = require('express');
const skillControl = require('../controllers/skillController');
const router = express.Router();

router.post('/addSkill', skillControl.addSkill);
router.get('/getAllSkills',skillControl.getAllSkills);



module.exports = {
    routes: router
}
'use strict';


const skillData = require('../data/skills');

const addSkill = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data,'Skillcontroller')
        const insert = await skillData.createSkill(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllSkills = async (req, res, next) => {
    try {

        const skillList = await skillData.getSkills();
        res.send(skillList);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSkillById = async (req, res, next) => {
    try {
        const SkillID = req.params.id;
        const Skills = await skillData.getSkillById(SkillID);
        res.send(Skills);
    } catch (error) {
        res.status(400).send(error.message);
    }
}




module.exports = {
    addSkill,
    getAllSkills,
    getSkillById
}
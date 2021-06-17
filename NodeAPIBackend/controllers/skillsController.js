const { connect } = require("../services/database");
function Skill(skill) {
  const { SkillName } = skill;
  if (SkillName) {
    return { SkillName: SkillName };
  }
  return false;
}

const getAllSkill = () =>
  new Promise((resolve, reject) => {
    connect
      .then(async (res) => {
        result = await res.model("Skill").findAll();
        data = result.map((val) => {
          return {
            SkillID: val.dataValues.SkillID,
            SkillName: val.dataValues.SkillName,
          };
        });
        resolve(data);
      })
      .catch((err) => {
        console.error(err);
        reject("failed");
      });
  });

const getSkill = (id) =>
  new Promise((resolve, reject) => {
    connect
      .then(async (res) => {
        result = await res.model("Skill").
        findAll({ where: { SkillID: id } });
        data = result.map((val) => {
          return {
            SkillID: val.dataValues.SkillID,
            SkillName: val.dataValues.SkillName,
          };
        });
        resolve(data[0]);
      })
      .catch((err) => {
        console.error(err);
        reject("failed");
      });
  });


const addSkill = (skill) =>
  new Promise((resolve, reject) => {
    connect
      .then(async (res) => {
        newSkill = await res.
        model("Skill").create(skill);
        console.log(skill);
        resolve(newSkill.SkillName);
      })
      .catch((err) => {
        console.error(err);
        reject("failed");
      });
  });

const updateSkill = (id, skill) =>
  new Promise((resolve, reject) => {
    connect
      .then(async (res) => {
        updatedSkill = await res.
        model("Skill").update(skill, {
          where: { SkillID: id },
        });
        resolve(updatedSkill.SkillName);
      })
      .catch((err) => {
        console.error(err);
        reject("failed");
      });
  });

const removeSkill = (id) =>
  new Promise((resolve, reject) => {
    connect
      .then((res) => {
        res.model("Skill").
        destroy({ where: { SkillID: id } });
        resolve("Skill removed!");
      })
      .catch((err) => {
        console.error(err);
        reject("failed");
      });
  });

module.exports = {
  Skill,
  getAllSkill,
  getSkill,
  addSkill,
  updateSkill,
  removeSkill,
};

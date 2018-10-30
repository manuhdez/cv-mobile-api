const Schema  = require('mongoose').Schema;
const model = require('mongoose').model;

const SkillSchema = new Schema({
  name: {type: String, required: true},
  value: {type: String, required: true},
  label: {type: String, required: true}
});

const Skill = model('Skill', SkillSchema);

module.exports = Skill;
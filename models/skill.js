const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  name: {type: String, required: true},
  value: {type: String, required: true},
  label: {type: String, required: true}
});

const Skill = mongoose.model('Skill', SkillSchema);

module.exports = Skill;
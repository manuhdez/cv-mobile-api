const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  type: {type: String, required: true},
  label: {type: String, required: true}
});

const Skill = mongoose.model('Skill', SkillSchema);

module.exports = Skill;
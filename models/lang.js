const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  name: {type: String, required: true},
  label: {type: String, required: true},
  value: {type: String, required: true},
  default: {type: Number, required: true}
});

const Language = mongoose.model('Language', LanguageSchema);

module.exports = Language;
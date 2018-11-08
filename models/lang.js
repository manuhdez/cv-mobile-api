const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  label: {type: String, required: true, unique: true},
});

const Language = mongoose.model('Language', LanguageSchema);

module.exports = Language;

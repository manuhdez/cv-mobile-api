const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  gender: String,
  location: {type: Object},
  company: String,
  languages: Array,
  skills: Array,
  experience: String,
  birthDate: Date,
  website: {type: String, trim: true},
  profilePicture: {type: String, trim: true}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
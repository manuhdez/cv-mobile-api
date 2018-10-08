const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  location: {type: Object, required: true},
  phoneNumber: Number,
  website: {type: String, trim: true},
  languages: Array,
  skills: Array,
  gender: {type: String, required: true},
  profilePicture: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
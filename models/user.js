const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  location: {type: Array, required: true},
  phoneNumber: Number,
  website: {type: String, trim: true},
  languages: Array,
  skills: Array,
  profilePicture: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
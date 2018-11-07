const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  phoneNumber: {type: Number, unique: true},
  gender: String,
  address: {
    country: {type: String, required: true},
    city: {type: String},
    street: {type: String},
    zipcode: {type: Number},
  },
  company: String,
  jobTitle: String,
  languages: [
    {type: [Schema.Types.ObjectId], ref: 'Language'}
  ],
  skills: [
    {type: [Schema.Types.ObjectId], ref: 'Skill'}
  ],
  experience: String,
  birthDate: Date,
  website: {type: String, trim: true, unique: true},
  profilePicture: {type: String, trim: true},
  registeredDate: {type: Date, default:Date.now}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
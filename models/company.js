const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {type: String, required: true, unique: true},
  CIF: {type: Number, required: true, unique: true},
  email: {type: String, required: true, unique: true, trim: true},
  website: {type: String, trim: true},
  address: {
    country: {type: String, required: true},
    street: {type: String},
    city: {type: String},
    zipcode: {type: Number},
  },
  socialUrls: {type: Object},
  logoURL: {type: String, required: true, trim: true},
  bio: {type: String},
  employees: {type: Number},
  phone: {type: Number},
  registeredDate: {type: Number},
  // jobOffers: [{}]
})

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;

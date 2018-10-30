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
  registeredDate: {type: Number}
})

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;

/*
{
        "id": 1,
        "name": " Canarias Smart",
        "CIF": "J1535131E",
        "email": "Sincere@april.biz",
        "address": {
            "country": "Spain",
            "street": "Kulas Light",
            "city": "Lebsackbury",
            "zipcode": "92998-3874"
        },
        "socialnetworks": {
            "twitter": "https://www.google.com/",
            "linkedin": "https://www.google.com/",
            "youtube": "https://www.google.com/"
        },
        "logo": "/assets/images/kisspng-windows-7-windows-vista-logo-microsoft-windows-logos-5ab719c342adc2.6952612015219491232731.jpg",
        "descripcion": "Software development services with a high standard",
        "workersNumber": 10,
        "phone": "1-770-736-806442"
    },
    */
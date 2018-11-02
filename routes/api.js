const express = require('express');
const router = express.Router();
const multer = require('multer');

// Multer settings to store images into the database
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '_') + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: function (req, file, callback) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('Not a valid file format'), false);
    }
  }
});

// Import database models
const User = require('../models/user');
const Company = require('../models/company');
const Skill = require('../models/skill');
const Language = require('../models/lang');
const Survey = require('../models/survey');

router.get('/', (req, res, next) => {
  return res.json({
    message: 'This is the api endpoint'
  });
});

// Get all users
router.get('/users', (req, res, next) => {
  User.find().then( users => res.json(users));
});

// Get a page with 10 users
router.get('/users/pages/:pageId', (req, res, next) => {
  User.find()
  .skip((req.params.pageId - 1) * 10)
  .limit(10)
  .then( users => res.json(users));
});

// Add a new user to the database
router.post('/users', upload.single('profilePicture'), (req, res, next) => {

  if (req.body.name && req.body.email && req.body.username) {
    const newUser = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      gender: req.body.gender,
      location: {
        "city": req.body.city,
        "state": req.body.state,
        "country": req.body.country
      },
      company: req.body.company,
      jobTitle: req.body.jobTitle,
      website: req.body.website,
      birthDate: req.body.birthDate,
      experience: req.body.experience,
      languages: JSON.parse(req.body.languages),
      skills: JSON.parse(req.body.skills),
      registeredDate: Date.now(),
    }

    if (req.file && req.file !== undefined) {
      newUser.profilePicture = `${req.protocol}://${req.hostname}/${req.file.path}`;
    } else if (req.file === undefined) {
      newUser.profilePicture = `${req.protocol}://${req.hostname}/uploads/default_avatar.png`;
    }

    User.create(newUser, function (err, doc) {
      if (err) {
        return next(err);
      } else {
        return res.json(doc);
      }
    });
  } else {
    res.json({
      error: 'Not all required data was sent'
    });
  }
});

// Get a users info by id
router.get('/users/:id', (req, res, next) => {
  User.findById( req.params.id, function (err, doc) {
    if (err) return next(err);
    if (!doc) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
    res.json(doc);
  });
});

// Update a users info by its id
router.put('/users/:id', upload.single('profilePicture'), (req, res, next) => {

  const updatedUser = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
    location: {
      "city": req.body.city,
      "state": req.body.state,
      "country": req.body.country
    },
    company: req.body.company,
    jobTitle: req.body.jobTitle,
    website: req.body.website,
    birthDate: req.body.birthDate,
    experience: req.body.experience,
    languages: JSON.parse(req.body.languages),
    skills: JSON.parse(req.body.skills),
  }

  if (req.file) {
    updatedUser.profilePicture = `${req.protocol}://${req.hostname}/${req.file.path}`;
    // localhost development url
    // updatedUser.profilePicture = `${req.protocol}://${req.hostname}:${port}/${req.file.path}`;
  }

  User.findByIdAndUpdate( req.params.id, updatedUser, function (err, doc) {
    if (err) return next(err);
    res.json(updatedUser);
  });
});

// Delete a user by id
router.delete('/users/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.json({
      message: 'The user was successfully removed'
    })
  });
});

// COMPANY ROUTES
// Get all the companies from the database
router.get('/company', (req, res, next) => {
  Company.find().then( companies => res.json(companies));
});

// Get a company by its id
router.get('/company/:id', (req, res, next) => {
  Company.findById(req.params.id, function(error, doc) {
    if (error) return next(error);
    if (!doc) {
      const err = new Error('Company not found');
      err.status = 404;
      return next(err);
    }
    res.json(doc);
  })
})

// Add a new company to the database
router.post('/company', upload.single('logoURL'), (req, res, next) => {
  // Validate the required fields have been sent
  if (req.body.name && req.body.email && req.body.CIF && req.body.country) {

    let { name, CIF, email, website, country, street, city, zipcode, socialUrls, bio, employees, phone  } = req.body;
    const newCompany = {
      name,
      CIF,
      email,
      website,
      address: {
        country,
        street,
        city,
        zipcode,
      },
      socialUrls,
      bio,
      employees,
      phone,
      registeredDate: Date.now()
    }

    if (req.file) {
      let port = process.env.PORT || 3000
      newCompany.logoURL = `${req.protocol}://${req.hostname}/${req.file.path}`;
      // localhost development url
      // newCompany.logoURL = `${req.protocol}://${req.hostname}:${port}/${req.file.path}`;
    }

    Company.create( newCompany, (err, doc) => {
      if (err) return next(err);
      return res.json(doc);
    });

  } else {
    res.json({error: 'Not all required data was sent'});
  }

})

// Update a company info by its id
router.put('/company/:id', upload.single('logoURL'), (req, res, next) => {

  // Download original company info
  Company.findById(req.params.id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      const error = new Error('The user your trying to modify does not exist.');
      error.status = 404;
      return next(error);
    }

    let { country, city, street, zipcode, ...values } = req.body;

    let newAddress = {
      country: country !== undefined ? country : doc.address.country,
      city: city !== undefined ? city : doc.address.city,
      street: street !== undefined ? street : doc.address.street,
      zipcode: zipcode !== undefined ? zipcode : doc.address.zipcode,
    };

    let updatedCompany = {
      ...values,
      address: {...newAddress}
    }

    if (req.file) {
      let port = process.env.PORT || 3000
      updatedCompany.logoURL = `${req.protocol}://${req.hostname}/${req.file.path}`;
      // localhost development url
      // updatedCompany.logoURL = `${req.protocol}://${req.hostname}:${port}/${req.file.path}`;
    }

    Company.findByIdAndUpdate(req.params.id, updatedCompany, (err, doc) => {
      if (err) return next(err);
      return res.json({status: 'Success', fieldsUpdated: updatedCompany});
    })
  });
});

// Delete a company profile by its id
router.delete('/company/:id', (req, res, next) => {
  Company.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({message: 'Company profile succesfully deleted.'})
  });
});

// Languages CRUD
// Get all languages
router.get('/langs', (req, res, next) => {
  Language.find().then( langs => res.json(langs));
});

// Add a new language to the database
router.post('/langs', (req, res, next) => {
  let data = { ...req.body };
  if (data.name && data.label && data.value && typeof data.default === 'number') {
    let newLang = {
      name: data.name,
      label: data.label,
      value: data.value,
      default: data.default
    }
    Language.create(newLang, (err, doc) => {
      if (err) return next(err);
      return res.json(doc);
    });
  }
});

router.delete('/langs/:id', (req, res, next) => {
  Language.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.json({message: 'Language successfully deleted.'});
  });
});

// Skills CRUD
// Get all skills
router.get('/skills', (req, res, next) => {
  Skill.find().then( skills => res.json(skills));
});

// Add a new skill
router.post('/skills', (req, res, next) => {
  let { name, value, label } = req.body;

  if (name && value && label) {
    let newSkill = { name, value, label };

    Skill.create(newSkill, (err, doc) => {
      if (err) return next(err);
      return res.json(doc);
    });
  }
});

// Delete a skill from db
router.delete('/skills/:id', (req, res, next) => {
  Skill.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.json({message: 'The skill was removed successfully'});
  });
});

// SURVEYS routes
// Get all surveys
router.get('/surveys', (req, res, next) => {
  Survey.find({}, (err, doc) => {
    if (err) return next(err);
    return res.json(doc);
  });
});

// Add a new survey
router.post('/surveys', (req, res, next) => {
  let { header, elements } = req.body;

  let newSurvey = { header, elements };

  Survey.create(newSurvey, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      const error = new Error('Something failed while trying to create the new survey');
      error.status = 404;
      return next(error);
    }
    return res.json(doc);
  });
});


// Delete a survey
router.delete('/surveys/:id', (req, res, next) => {
  Survey.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.json({message: 'Survey entry successfully removed'});
  });
});

module.exports = router;

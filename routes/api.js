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
const Skill = require('../models/skill');
const Language = require('../models/lang');
const Company = require('../models/company');
import Offer from '../models/offer';
const Survey = require('../models/survey');

router.get('/', (req, res, next) => {
  return res.json({
    welcome: 'There is a list with useful links',
    links: {
      users: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/users`,
      skills: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/skills`,
      languages: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/langs`,
      companies: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/companies`,
      jobOffers: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/jobOffers`,
      surveys: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/surveys`,
    }
  });
});

// Get all users
router.get('/users', (req, res, next) => {
  User
    .find()
    .then( users => res.json(users));
});

// Get a page with 10 users
router.get('/users/pages/:pageId', (req, res, next) => {
  User
    .find()
    .skip((req.params.pageId - 1) * 10)
    .limit(10)
    .then( users => res.json(users));
});

// Add a new user to the database
router.post('/users', upload.single('profilePicture'), (req, res, next) => {
  let { name, username, email, phoneNumber, gender, address, company,
    jobTitle, website, birthDate, experience, languages, skills } = req.body;

  if (name && email && username) {
    const newUser = {
      name, username, email, phoneNumber, gender, address, company,
      jobTitle, website, birthDate, experience, languages, skills
    }

    if (req.file && req.file !== undefined) {
      newUser.profilePicture = `${req.protocol}://${req.hostname}/${req.file.path}`;
    } else if (req.file === undefined) {
      newUser.profilePicture = `${req.protocol}://${req.hostname}/uploads/default_avatar.png`;
    }

    User.create(newUser, function (err, user) {
      if (err) return next(err);
      return res.json(user);
    });

  } else {
    res.json({ error: 'Name, username and email properties are required.' });
  }
});

// Get a users info by id
router.get('/users/:id', (req, res, next) => {
  User
    .findById(req.params.id)
    .populate('skills')
    .populate('languages')
    .exec( (err, user) => {
      if (err) return next(err);
      res.json(user);
    });
});

// Update a users info by its id
router.put('/users/:id', upload.single('profilePicture'), (req, res, next) => {
  let updatedUser = { ...req.body };

  if (req.file && req.file !== undefined) {
    updatedUser.profilePicture = `${req.protocol}://${req.hostname}/${req.file.path}`;
  }

  User
    .findByIdAndUpdate(req.params.id, updatedUser)
    .exec( (err) => {
      if (err) return next(err);
      res.redirect(`/api/users/${req.params.id}`);
    });
});

// Delete a user by id
router.delete('/users/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.redirect(`/api/users/`);
  });
});

// COMPANY ROUTES
// Get all the companies from the database
router.get('/companies', (req, res, next) => {

  Company
    .find()
    .then( companies => res.json(companies));
});

// Get a company by its id
router.get('/companies/:id', (req, res, next) => {

  Company
    .findById(req.params.id)
    .populate('jobOffers')
    .exec( (error, company) => {
      if (error) return next(error);
      if (!company) {
        const err = new Error('Company not found');
        err.status = 404;
        return next(err);
      }
      res.json(company);
    })
})

// Add a new company to the database
router.post('/companies', upload.single('logoURL'), (req, res, next) => {

  let { name, docType, docNumber, email, website, address, socialUrls, bio, employees, phone, jobOffers } = req.body;

  if (name && email && docType && docNumber && address.country) {
    const newCompany = {
      name,
      docType,
      docNumber,
      email,
      website,
      address,
      socialUrls,
      bio,
      employees,
      phone,
      jobOffers
    }

    if (req.file && req.file !== undefined) {
      newCompany.logoURL = `${req.protocol}://${req.hostname}/${req.file.path}`;
    }

    Company
      .create(newCompany, (err, company) => {
        if (err) return next(err);
        return res.json(company);
      });

  } else {
    res.json({error: 'Not all required data was sent'});
  }

})

// Update a company info by its id
router.put('/companies/:id', upload.single('logoURL'), (req, res, next) => {
  let updateData = { ...req.body };

  if (req.file) {
    updateData.logoURL = `${req.protocol}://${req.hostname}/${req.file.path}`;
  }

  Company
    .findByIdAndUpdate(req.params.id, updateData)
    .exec((err) => {
      if (err) return next(err);
      return res.redirect(`/api/companies/${req.params.id}`);
    })

});

// Delete a company profile by its id
router.delete('/companies/:id', (req, res, next) => {
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
  let { label } = req.body
  if (label) {
    Language.create({label}, (err, doc) => {
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
  let { type, label } = req.body;

  if (type && label) {
    let newSkill = { type, label };

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

// JOB OFFER CRUD
// Get all offers
router.get('/offers', (req, res) => {
  Offer
    .find()
    .then( offers => res.json(offers));
});

router.get('/offers/:id', (req, res, next) => {
  Offer.findById(req.params.id, (err, offer) => {
    if (err) return next(err);
    res.json(offer);
  })
});

router.post('/offers', (req, res, next) => {
  let { title, position, vacancies, description, companyEmail } = req.body;

  const newOffer = {
    title,
    position,
    vacancies,
    description,
    companyEmail
  }

  Offer.create(newOffer, (err, offer) => {
    if (err) return next(err);
    // Push the offer into the correspondant company
    Company
      .findOneAndUpdate({email: companyEmail}, {$push: {jobOffers: offer._id}})
      .then( () => res.json(offer));
  });
});

router.delete('/offers/:id', (req, res, next) => {

  Offer.findByIdAndDelete(req.params.id, (err, offer) => {
    if (err) return next(err);
    Company
      .findOneAndUpdate({email: offer.companyEmail}, {$pull: {jobOffers: offer._id}})
      .then( (company) => res.redirect(`/api/companies/${company._id}`))
      .catch( err => next(err));
  });
});

module.exports = router;

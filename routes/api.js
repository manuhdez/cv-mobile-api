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
      profilePicture: req.file ? 'https://cv-mobile-api.herokuapp.com/' + req.file.path : 'https://cv-mobile-api.herokuapp.com/uploads/default_avatar.png'
    }

    // if (req.file) {
    //   newUser.profilePicture = 'https://cv-mobile-api.herokuapp.com/' + req.file.path
    // }

    User.create(newUser, function (err, doc) {
      if (err) {
        return next(err);
      } else {
        return res.json(doc);
      }
    });
  } else {
    res.json({
      error: 'All required data was not sent'
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
    languages: req.body.languages.slice().split(', '),
    skills: req.body.skills.slice().split(', '),
  }

  if (req.file) {
    updatedUser.profilePicture = 'https://cv-mobile-api.herokuapp.com/' + req.file.path
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

// Languages json
router.get('/langs', (req, res, next) => {
  res.json([
    {
      name: 'lang-es',
      label: 'Spanish',
      value: 'spanish',
      default: 0
    },
    {
      name: 'lang-en',
      label: 'English',
      value: 'english',
      default: 1
    },
    {
      name: 'lang-it',
      label: 'Italian',
      value: 'italian',
      default: 0
    },
    {
      name: 'lang-de',
      label: 'German',
      value: 'german',
      default: 0
    }
  ]);
});

router.get('/skills', (req, res, next) => {
  res.json([
    {
      name: 'html',
      value: 'html',
      label: 'HTML'
    },
    {
      name: 'css',
      value: 'css',
      label: 'CSS'
    },
    {
      name: 'sass-less',
      value: 'sass-less',
      label: 'SASS / LESS'
    },
    {
      name: 'javascript',
      value: 'javascript',
      label: 'Javascript'
    },
    {
      name: 'jquery',
      value: 'jquery',
      label: 'jQuery'
    },
    {
      name: 'nodejs',
      value: 'nodejs',
      label: 'Nodejs'
    },
    {
      name: 'expressjs',
      value: 'expressjs',
      label: 'Express'
    },
    {
      name: 'mongodb',
      value: 'mongodb',
      label: 'MongoDB'
    },
    {
      name: 'react',
      value: 'react',
      label: 'React js'
    },
    {
      name: 'angular',
      value: 'angular',
      label: 'Angular js'
    },
    {
      name: 'vuejs',
      value: 'vuejs',
      label: 'Vue js'
    },
    {
      name: 'php',
      value: 'php',
      label: 'PHP'
    }
  ]);
});

module.exports = router;
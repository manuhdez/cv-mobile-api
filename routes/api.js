const express = require('express');
const router = express.Router();
const multer = require('multer');

// Multer settings to store images into the database
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
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

router.get('/users', (req, res, next) => {
  User.find().then( users => res.json(users));
});

router.post('/users', upload.single('profilePicture'), (req, res, next) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    profilePicture: req.file.path,
    location: {...req.body.location},
    phoneNumber: req.body.phoneNumber,
    website: req.body.website,
    languages: [...req.body.languages],
    skills: [...req.body.skills]
  }

  User.create(newUser, function (err) => {
    if (err) {
      return next(err);
    } else {
      return next(err);
    }
  });

});

module.exports = router;
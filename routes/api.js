const express = require('express');
const router = express.Router();

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

router.post('/users', (req, res, next) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    location: {...req.body.location},
    phoneNumber: req.body.phoneNumber,
    website: req.body.website,
    languages: [...req.body.languages],
    skills: [...req.body.skills]
  }

  User.create(newUser, (err) => {
    if (err) return next(err);
  })
});

module.exports = router;
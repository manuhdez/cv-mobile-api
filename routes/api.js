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

module.exports = router;
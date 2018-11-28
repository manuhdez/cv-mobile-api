import jwt from 'jsonwebtoken';
import User from '../models/user';
import Company from '../models/company';

exports.login = (req, res, next) => {
  if (!req.body.type) return res.status(401).json({message: 'Authentication error'});

  if (req.body.type === 'user') {
    User
      .findOne({email: req.body.email, username: req.body.username})
      .then((response) => {
        jwt.sign({user: response._id}, 'secret_key', {expiresIn: '30m'}, (err, token) => {
          if (err) return next(err);

          res.status(200).json({
            message: `Welcome back, ${response.name}`,
            token,
            id: response._id,
            profile: 'user'
          });
        });
      })
      .catch(() => res.status(400).json({message: 'username or email not valid'}));
  } else if (req.body.type === 'company') {
    Company
      .findOne({email: req.body.email, docNumber: req.body.password})
      .then((response) => {
        jwt.sign({user: response._id}, 'secret_key', {expiresIn: '30m'}, (err, token) => {
          if (err) return next(err);

          res.status(200).json({
            message: `Welcome back ${response.name}`,
            token,
            id: response._id,
            profile: 'company'
          });
        });
      });
  }
}
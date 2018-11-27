import jwt from 'jsonwebtoken';
import User from '../models/user';

exports.login = (req, res, next) => {

  User
    .findOne({email: req.body.email, username: req.body.username})
    .then((response) => {
      jwt.sign({user: response._id}, 'secret_key', {expiresIn: '30m'}, (err, token) => {
        if (err) return next(err);

        res.status(200).json({
          message: `Welcome back, ${response.name}`,
          token
        });
      });
    })
    .catch(() => res.status(400).json({message: 'username or email not valid'}));
}
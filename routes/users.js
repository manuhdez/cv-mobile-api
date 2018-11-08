import User from '../models/user';


// Fetch all stored users
exports.getAll = (req, res, next) => {
  User.find()
  .then( users => res.json(users))
  .catch( err => next(err));
};

// Fetch a group with 10 users
exports.getPage = (req, res, next) => {
  User
    .find()
    .skip((req.params.pageId - 1) * 10)
    .limit(10)
    .then( users => res.json(users))
    .catch( err => next(err));
};

// Add a new user to the database
exports.addUser = (req, res, next) => {
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
};

// Fetch a user by its id
exports.getById = (req, res, next) => {
  User
    .findById(req.params.id)
    .populate('skills')
    .populate('languages')
    .exec( (err, user) => {
      if (err) return next(err);
      res.json(user);
    });
};

// Update a user by its id
exports.updateUser = (req, res, next) => {
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
};

// Delete a user by id
exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.redirect(`/api/users/`);
  });
};

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
exports.add = (req, res, next) => {
  let { name, username, email, phone, gender, address, company,
    jobTitle, website, birthDate, experience, languages, skills } = req.body;

  let defaultAvatar = `${req.protocol}://${req.hostname}/uploads/default_avatar.png`;

  if (name && email && username && address.country) {
    const newUser = {
      name, username, email, phone, gender, address, company,
      jobTitle, website, birthDate, experience, languages, skills,
      avatar: defaultAvatar
    }

    User.create(newUser, function (err, user) {
      if (err) return next(err);
      return res.json(user);
    });
  } else {
    res.json({ error: 'Name, username, email and country properties are required.' });
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
exports.update = (req, res, next) => {
  let updatedUser = { ...req.body };

  User
    .findByIdAndUpdate(req.params.id, updatedUser, {new: true})
    .exec( (err, user) => {
      if (err) return next(err);
      res.json(user);
    });
};

// Delete a user by id
exports.delete = (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    res.redirect(`/api/users/`);
  });
};

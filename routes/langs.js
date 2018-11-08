import Language from '../models/lang';

exports.getAll = (req, res, next) => {
  Language
    .find()
    .then( langs => res.json(langs))
    .catch( err => next(err));
};

exports.getById = (req, res, next) => {
  Language
    .findById(req.params.id)
    .then( lang => res.json(lang))
    .catch( err => next(err));
}

// Add a new language to the database
exports.add = (req, res, next) => {
  let { label } = req.body
  if (label) {
    Language.create({label}, (err, doc) => {
      if (err) return next(err);
      return res.json(doc);
    });
  }
};

exports.delete = (req, res, next) => {
  Language.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.json({message: 'Language successfully deleted.'});
  });
};
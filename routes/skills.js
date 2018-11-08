import Skill from '../models/skill';

exports.getAll = (req, res, next) => {
  Skill
    .find()
    .then( skills => res.json(skills))
    .catch( err => next(err));
};

exports.getById = (req, res, next) => {
  Skill
    .findById(req.params.id)
    .then( skill => res.json(skill))
    .catch( err => next(err));
}

exports.add = (req, res, next) => {
  let { type, label } = req.body;

  if (type && label) {
    let newSkill = { type, label };

    Skill.create(newSkill, (err, doc) => {
      if (err) return next(err);
      return res.json(doc);
    });
  }
};

// Delete a skill from db
exports.delete = (req, res, next) => {
  Skill.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.json({message: 'The skill was removed successfully'});
  });
};

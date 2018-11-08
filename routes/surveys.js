import Survey from '../models/survey';

exports.get = (req, res, next) => {
  Survey
    .find()
    .then( surveys => res.json(surveys))
    .catch( err => next(err));
};

exports.add = (req, res, next) => {
  let { header, elements } = req.body;

  let newSurvey = { header, elements };

  Survey.create(newSurvey, (err, doc) => {
    if (err) return next(err);
    return res.json(doc);
  });
};

exports.delete = (req, res, next) => {
  Survey.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.json({message: 'Survey entry successfully removed'});
  });
};
import Summary from '../models/summary';

// get all summaries
exports.get = (req, res, next) => {
  Summary
    .find()
    .then( summaries => res.json(summaries))
    .catch( err => next(err));
}

// get a summary by its origin survey
exports.getByOrigin = (req, res, next) => {
  console.log(req.params.origin);
  Summary
    .find({'origin': req.params.origin})
    .populate('origin')
    .then( summary => res.json(summary))
    .catch( err => next(err));
}

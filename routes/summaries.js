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
    .findOne({'origin': req.params.origin})
    .populate('origin')
    .then( summary => res.json(summary[0]))
    .catch( err => next(err));
}

exports.updateSummary = (req, res, next) => {
  let userRes = { ...req.body };
  console.log(userRes)

  Summary.find({origin: req.params.origin})
    .then( sum => {
      let { totalAnswers, answers } = sum[0];

      let questionsToUpdate = [];
      userRes.questions.forEach( (question) => {
        let coinc = answers.findIndex( answer => answer.question === question);
        questionsToUpdate.push(coinc);
      });

      let updatedAnswers = answers.slice(0);

      questionsToUpdate.forEach( (ans, index) => {
        updatedAnswers[ans].options.forEach( option => {
          if (option.value === userRes.answers[index]) {
            option.count += 1;
          }
        })
      });

      let updatedSummary = {
        totalAnswers: totalAnswers += 1,
        answers: updatedAnswers
      }

      Summary.update({origin: req.params.origin}, updatedSummary, {new: true})
        .then( summary => res.json(summary))
        .catch( err => next(err));
    })
    .catch( err => next(err));

}
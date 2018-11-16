import Survey from '../models/survey';
import Summary from '../models/summary';

exports.get = (req, res, next) => {
  Survey
    .find()
    .then( surveys => res.json(surveys))
    .catch( err => next(err));
};

exports.add = (req, res, next) => {
  let { header, elements } = req.body;

  let newSurvey = { header, elements };

  Survey.create(newSurvey, (err, survey) => {
    if (err) return next(err);

    let newSummary = {
      origin: survey._id,
      title: survey.header.title,
      totalAnswers: 0,
      answers: []
    }

    survey.elements.forEach( element => {
      let answer = {
        question: element.label,
        options: []
      }
      element.values.forEach( value => answer.options.push({
        value: value.label,
        count: 0
      }));

      newSummary.answers.push(answer);
    });

    Summary.create(newSummary, (err) => {
      if (err) return next(err);
      return res.json(survey);
    })
  });
};

exports.delete = (req, res, next) => {
  Survey.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    Summary
      .findOneAndDelete({origin: req.params.id})
      .then( () => res.json({message: 'Survey entry successfully removed'}))
      .catch( err => next(err));
  });
};
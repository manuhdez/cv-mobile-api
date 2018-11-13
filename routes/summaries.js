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
  // Recibir un objeto con las respuestas al formulario
  let userResponse = {...req.body}
  // Buscar a que valores corresponden esas respuestas y sumarles 1 al resultado
  Summary.find({origin: req.params.origin})
    .then( sum => {
      let { _id, origin, title, totalAnswers, answers, } = sum[0];

      let updatedAnswers = [];

      let updatedSummary = {
        _id,
        origin,
        title,
        totalAnswers: totalAnswers += 1,
        answers: updatedAnswers
      }
      // updatedSummary.totalAnswers = parseInt(updatedSummary.totalAnswers) + 1;
      res.json(updatedSummary);
      // updatedSummary.answers.forEach( answer => {

      // })
    })
    .catch( err => next(err));
  // Guardar el resumen actualizado en mongodb

}
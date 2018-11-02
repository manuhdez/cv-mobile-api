const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SurveySchema = new Schema({
  header: {
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    startDate: {type: Number, required: true},
    endDate: {type: Number, required: true},
    description: {type: String, required: true}
  },
  elements: [
    {
      type: {type: String, required: true},
      title: {type: String, required: true},
      values: {type: [String], required: true},
    }
  ]
});

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;

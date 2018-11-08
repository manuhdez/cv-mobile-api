const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SurveySchema = new Schema({
  header: {
    title: {type: String, required: true},
    subtitle: {type: String},
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date, required: true},
    description: {type: String, required: true}
  },
  elements: [
    {
      type: {type: String, required: true},
      label: {type: String, required: true},
      name: {type: String, required: true},
      placeholder: {type: String},
      values: [
        {
          name: {type: String, required: true},
          label: {type: String, required: true},
          value: {type: String, required: true}
        }
      ],
    }
  ]
});

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;

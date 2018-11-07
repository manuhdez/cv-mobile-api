import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SummarySchema = new Schema({
  fromSurvey: {type: String, required: true},
  totalAnswers: Number,
  answers: [{
    question: String,
    value: String,
    total: Number
  }]
});

const Summary = mongoose.model('Summary', SummarySchema);

export default Summary;
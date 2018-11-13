import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SummarySchema = new Schema({
  origin: {type: Schema.Types.ObjectId, ref: 'Survey', required: true},
  title: {type: String, required: true},
  totalAnswers: Number,
  answers: [{
    question: String,
    options: [
      {
        value: {type: String, required: true},
        count: Number
      }
    ]
  }]
});

const Summary = mongoose.model('Summary', SummarySchema);

export default Summary;
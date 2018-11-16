import mongoose, { Schema } from "mongoose";

const SummarySchema = new Schema({

  origin: {type: Schema.Types.ObjectId, ref: 'Survey', required: true},
  title: {type: String, required: true},
  totalAnswers: Number,
  answers: [
    {
      question: String,
      options: [
        {
          value: { type: String, required: true },
          count: Number
        }
      ]
    }
  ]
});

export default mongoose.model("Summary", SummarySchema);

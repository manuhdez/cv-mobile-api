import mongoose, { Schema } from "mongoose";

const SurveySchema = new Schema({
  header: {
    title: { type: String, required: true },
    subtitle: { type: String },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    description: { type: String, required: true }
  },
  elements: [
    {
      type: { type: String, required: true },
      label: { type: String, required: true },
      name: { type: String, required: true },
      values: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true }
        }
      ]
    }
  ]
});

export default mongoose.model("Survey", SurveySchema);

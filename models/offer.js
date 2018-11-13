import mongoose, { Schema } from "mongoose";

const OfferSchema = new mongoose.Schema({
  companyEmail: { type: String, required: true, trim: true },
  title: { type: String, required: true },
  position: { type: String, required: true },
  vacancies: { type: Number, required: true },
  description: String,
  publicationDate: { type: Date, default: Date.now }
});

export default mongoose.model("JobOffer", OfferSchema);

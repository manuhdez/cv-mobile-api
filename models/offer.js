import mongoose, { Schema } from "mongoose";

const OfferSchema = new mongoose.Schema({
  companyEmail: {type: String, required: true, trim: true},
  company: String,
  title: {type: String, required: true},
  contractType: {type: String, required: true},
  location: {type: String, required: true},
  description: String,
  responsabilities: [String],
  whatWeOffer: [{
    title: String,
    description: String
  }],
  whatWeLookFor: [{
    title: String,
    description: String
  }],
  publishDate: {type: Date, default: Date.now}
});

export default mongoose.model("JobOffer", OfferSchema);

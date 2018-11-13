import mongoose, { Schema } from "mongoose";

const CompanySchema = new Schema({
  name: { type: String, required: true, unique: true },
  docType: { type: String, required: true },
  docNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, trim: true },
  website: { type: String, trim: true, unique: true },
  address: {
    country: { type: String, required: true },
    street: { type: String },
    city: { type: String },
    zipcode: { type: Number }
  },
  socialUrls: [
    {
      platform: String,
      url: String
    }
  ],
  logo: { type: String, trim: true },
  bio: { type: String },
  employees: { type: Number },
  phone: { type: String },
  registeredDate: { type: Date, default: Date.now },
  jobOffers: [{ type: Schema.Types.ObjectId, ref: "JobOffer" }]
});

export default mongoose.model("Company", CompanySchema);

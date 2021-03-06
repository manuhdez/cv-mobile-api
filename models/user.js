import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, sparse: true },
  gender: String,
  address: {
    country: { type: String, required: true },
    city: { type: String },
    street: { type: String },
    zipcode: { type: Number },
  },
  company: String,
  jobTitle: String,
  languages: [{ type: [Schema.Types.ObjectId], ref: "Language" }],
  skills: [{ type: [Schema.Types.ObjectId], ref: "Skill" }],
  experience: String,
  birthDate: Date,
  website: { type: String, trim: true, unique: true, sparse: true },
  avatar: { type: String, trim: true },
  registeredDate: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);

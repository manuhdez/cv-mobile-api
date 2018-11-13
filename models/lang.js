import mongoose, { Schema } from "mongoose";

const LanguageSchema = new Schema({
  label: { type: String, required: true, unique: true }
});

export default mongoose.model("Language", LanguageSchema);

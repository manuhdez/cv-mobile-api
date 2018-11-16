import mongoose, { Schema } from "mongoose";

const SkillSchema = new Schema({
  type: { type: String, required: true },
  label: { type: String, required: true }
});

export default mongoose.model("Skill", SkillSchema);

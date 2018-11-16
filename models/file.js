import mongoose, { Schema } from "mongoose";

const FileSchema = new Schema({
  url: String,
  type: String,
  model: String
});

export default mongoose.model("File", FileSchema);

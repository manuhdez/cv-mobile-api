import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  url: String,
  type: String,
  model: String
});

const File = mongoose.model('File', FileSchema);

module.exports = File;
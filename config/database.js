import mongoose from "mongoose";
import { config } from "dotenv";

config();

mongoose.Promise = global.Promise;

let mongoURI = "";

if (process.env.NODE_ENV === "development") {
  mongoURI = "mongodb://localhost:27017/cv-mobile-api";
} else {
  mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.cif1i.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
}

console.log("MONGO URI: ", mongoURI);

const options = {
  autoIndex: process.env.NODE_ENV === "development",
  reconnectTries: Number.MAX_SAFE_INTEGER,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
};

export default mongoose.connect(mongoURI, options);

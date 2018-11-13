import mongoose from "mongoose";

mongoose.Promise = global.Promise;

let mongoURI = "";

if (process.env.NODE_ENV === "development") {
  mongoURI = "mongodb://localhost:27017/cv-mobile-api";
} else {
  mongoURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
    process.env.DB_HOST
  }:${process.env.DB_PORT}/${process.env.DB_NAME}`;
}

const options = {
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true
};

export default mongoose.connect(
  mongoURI,
  options
);

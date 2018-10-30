import express from "express";
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import path from 'path';

const app = express();

// Server configuration
app.use(helmet());
// Compress the coming requests
app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
}

// Middleware for logging http requests
const loggerFormat =
  process.env.NODE_ENV === "development" ? "dev" : "combined";
app.use(morgan(loggerFormat));

// Parsing requests
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// views settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

// Database connection
mongoose.connect(
  // "mongodb://localhost:27017/cv-mobile",
  "mongodb://manuhdez:cv-mobile-api-2018@ds225703.mlab.com:25703/cv-mobile-api",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on("error", err => {
  console.error("Mongodb connection error:", err);
});

db.on("open", () => {
  console.log("Mongodb connected successfully");
});

// CORS Managing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Server Routes
app.get("/", (req, res) => {
  res.render("index");
});

const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

// Middleware
// 404 Catching
app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  return next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

// Run server
const port = process.env.PORT || 3000;
app.listen(port, error => {
  error
    ? process.exit(error)
    : console.log(`App listening on 'http://localhost:${port}'...
           ---
           Running on ${process.env.NODE_ENV}
           ---
      `);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Server configuration
// Parsing requests
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database connection
// mongoose.connect('mongodb://localhost:27017/cv-mobile', {useNewUrlParser: true});
mongoose.connect('mongodb://manuhdez:cv-mobile-api-2018@ds225703.mlab.com:25703/cv-mobile-api', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Mongodb connection error:', err);
});

db.on('open', () => {
  console.log('Mongodb connected successfully');
});

// CORS Managing
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Server Routes
app.get('/', (req, res) => {
  res.send('hello world');
});
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Middleware
// 404 Catching
app.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  return next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message
  })
});

// Run server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
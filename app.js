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

// Server Routes
app.get('/', (req, res) => {
  res.send('hello world');
});
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Middleware
// 404 Catching
app.use((req, res, next) => {
  const err = new Error('File not found');
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
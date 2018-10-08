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
mongoose.connect('mongodb://localhost:27017/cv-mobile', {useNewUrlParser: true});

// Server Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// Run server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
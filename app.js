import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import expressGa from 'express-ga-middleware';
import cors from 'cors';
import apiRoutes from './routes/api';
import dbConnection from './config/database';

const app = express();

require('dotenv').config();
// Server configuration
app.use(helmet());
// CORS Managing
app.use(cors());
// Google analytics middleware
app.use(expressGa('UA-127831712-2'));
// Compress the coming requests
function shouldCompress(req) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  return true;
}

app.use(compression({ filter: shouldCompress }));

// Middleware for logging http requests
const loggerFormat =
  process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
app.use(morgan(loggerFormat));

// Parsing requests
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Server Routes
app.get('/', (req, res) => {
  res.redirect('/api');
});

app.use('/api', apiRoutes);

// 404 Catching
app.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  return next(err);
});

// Error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

// Run server
const port = process.env.PORT || 3000;

dbConnection
  .then(() => {
    console.log('CONNECTED TO MONGODB WITH SUCCESS!');

    app.listen(port, (error) => {
      if (error) process.exit(error);
      // eslint-disable-next-line no-console
      console.log(`
      ---
      App listening on 'http://localhost:${port}'...
      Running on ${process.env.NODE_ENV}
      ---
      `);
    });
  })
  .catch((err) => `AN ERROR HAPPENED ON CONNECTION: ${console.error(err)}`);

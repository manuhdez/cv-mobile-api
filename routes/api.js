import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Multer settings to store images into the database
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    if (req.params.type === 'user') {
      callback(null, 'uploads/avatars');
    } else if (req.params.type === 'company') {
      callback(null, 'uploads/logos');
    }
  },
  filename: function(req, file, callback) {

    let fileExtension = `.${file.mimetype.split('/')[1]}`;
    callback(null, req.params.id + fileExtension);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: function (req, file, callback) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('Not a valid file format'), false);
    }
  }
});

// Token verification middleware
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    const token = bearerHeader.split(' ')[1];
    // Add token to the request object
    req.token = token;
    // Pass to the next middleware
    next();
  } else {
    res.status(400).json({message: 'You are not logged in'});
  }
}

// API ROUTES
router.get('/', (req, res, next) => {
  return res.json({
    welcome: 'There is a list with useful links',
    links: {
      users: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/users`,
      skills: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/skills`,
      languages: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/langs`,
      companies: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/companies`,
      job_offers: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/offers`,
      surveys: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/surveys`,
      summaries: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/summaries`,
    }
  });
});

// USERS CRUD
import users from './users';
router.get('/users', users.getAll);
router.post('/users', users.add);
router.get('/users/pages/:pageId', users.getPage);
router.get('/users/:id', users.getById);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.delete);

// LANGS CRUD
import langs from './langs';
router.get('/langs', langs.getAll)
router.post('/langs', langs.add)
router.get('/langs/:id', langs.getById)
router.delete('/langs/:id', langs.delete)

// Skills CRUD
import skills from './skills';
router.get('/skills', skills.getAll)
router.post('/skills', skills.add)
router.get('/skills/:id', skills.getById)
router.delete('/skills/:id', skills.delete)

// COMPANIES CRUD
import companies from './companies';
router.get('/companies', companies.getAll)
router.post('/companies', companies.add)
router.get('/companies/:id', companies.getById)
router.put('/companies/:id', companies.update)
router.delete('/companies/:id', companies.delete)

// JOB OFFER CRUD
import offers from './offers';
router.get('/offers', verifyToken, offers.get);
router.post('/offers', verifyToken, offers.add);
router.get('/offers/:id', verifyToken, offers.getById);
router.delete('/offers/:id', verifyToken, offers.delete);

// SURVEYS CRUD
import surveys from './surveys';
router.get('/surveys', surveys.get)
router.post('/surveys', surveys.add)
router.delete('/surveys/:id', surveys.delete)

// SUMMARIES ROUTES
import summaries from './summaries';
router.get('/summaries', summaries.get);
router.get('/summaries/:origin', summaries.getByOrigin);
router.put('/summaries/:origin', summaries.updateSummary);

// FILES
import files from './files';
router.post('/files/upload/:type/:id', upload.single('img'), files.uploadFile);

// LOGIN AUTHENTICATION WITH JWT
import logs from './login';
router.post('/login', logs.login);

module.exports = router;

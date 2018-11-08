import express from 'express';
import multer from 'multer';
const router = express.Router();

// Multer settings to store images into the database
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '_') + file.originalname);
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

// API ROUTES
router.get('/', (req, res, next) => {
  return res.json({
    welcome: 'There is a list with useful links',
    links: {
      users: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/users`,
      skills: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/skills`,
      languages: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/langs`,
      companies: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/companies`,
      jobOffers: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/jobOffers`,
      surveys: `${req.protocol}://${(req.hostname === 'localhost' ? 'localhost:3000' : req.hostname)}/api/surveys`,
    }
  });
});

// USERS CRUD
import users from './users';
router.get('/users', users.getAll);
router.post('/users', upload.single('profilePicture'), users.add);
router.get('/users/pages/:pageId', users.getPage);
router.get('/users/:id', users.getById);
router.put('/users/:id', upload.single('profilePicture'), users.update);
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
router.post('/companies', upload.single('logoURL'), companies.add)
router.get('/companies/:id', companies.getById)
router.put('/companies/:id', upload.single('logoURL'), companies.update)
router.delete('/companies/:id', companies.delete)

// JOB OFFER CRUD
import offers from './offers';
router.get('/offers', offers.get);
router.post('/offers', offers.add);
router.get('/offers/:id', offers.getById);
router.delete('/offers/:id', offers.delete);

// SURVEYS CRUD
// TEST:
import surveys from './surveys';
router.get('/surveys', surveys.get)
router.post('/surveys', surveys.add)
router.delete('/surveys/:id', surveys.delete)

// SUMMARIES ROUTES
import summaries from './summaries';
router.get('/summaries', summaries.get);
router.get('/summaries/:origin', summaries.getByOrigin);

module.exports = router;

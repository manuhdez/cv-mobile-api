module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _compression = __webpack_require__(/*! compression */ \"compression\");\n\nvar _compression2 = _interopRequireDefault(_compression);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar _helmet2 = _interopRequireDefault(_helmet);\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _expressGaMiddleware = __webpack_require__(/*! express-ga-middleware */ \"express-ga-middleware\");\n\nvar _expressGaMiddleware2 = _interopRequireDefault(_expressGaMiddleware);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst app = (0, _express2.default)(); // Server configuration\n\napp.use((0, _helmet2.default)()); // Google analytics middleware\n\napp.use((0, _expressGaMiddleware2.default)('UA-127831712-2')); // Compress the coming requests\n\napp.use((0, _compression2.default)({\n  filter: shouldCompress\n}));\n\nfunction shouldCompress(req, res) {\n  if (req.headers[\"x-no-compression\"]) {\n    // don't compress responses with this request header\n    return false;\n  }\n} // Middleware for logging http requests\n\n\nconst loggerFormat =  true ? \"dev\" : undefined;\napp.use((0, _morgan2.default)(loggerFormat)); // Parsing requests\n\napp.use(\"/uploads\", _express2.default.static(\"uploads\"));\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({\n  extended: false\n})); // Database connection\n\nlet mongoURI =  true ? \"mongodb://localhost:27017/cv-mobile\" : undefined;\nconsole.log(\"development\", mongoURI);\n\n_mongoose2.default.connect(mongoURI, {\n  useNewUrlParser: true\n});\n\nconst db = _mongoose2.default.connection;\ndb.on(\"error\", err => {\n  console.error(\"Mongodb connection error:\", err);\n});\ndb.on(\"open\", () => {\n  console.log(\"Mongodb connected successfully\");\n}); // CORS Managing\n\napp.use((req, res, next) => {\n  res.header(\"Access-Control-Allow-Origin\", \"*\");\n  res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept\");\n\n  if (req.method === \"OPTIONS\") {\n    res.header(\"Access-Control-Allow-Methods\", \"GET, PUT, POST, DELETE\");\n    return res.status(200).json({});\n  }\n\n  next();\n}); // Server Routes\n\napp.get('/', (req, res) => {\n  res.redirect('/docs');\n});\napp.get(\"/docs\", (req, res) => {\n  res.sendfile(\"views/docs.html\");\n});\n\nconst apiRoutes = __webpack_require__(/*! ./routes/api */ \"./routes/api.js\");\n\napp.use(\"/api\", apiRoutes); // Middleware\n// 404 Catching\n\napp.use((req, res, next) => {\n  const err = new Error(\"Page not found\");\n  err.status = 404;\n  return next(err);\n}); // Error handler\n\napp.use((err, req, res, next) => {\n  res.status(err.status || 500);\n  res.json({\n    error: err.message\n  });\n}); // Run server\n\nconst port = process.env.PORT || 3000;\napp.listen(port, error => {\n  error ? process.exit(error) : console.log(`App listening on 'http://localhost:${port}'...\n           ---\n           Running on ${\"development\"}\n           ---\n      `);\n});\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./models/company.js":
/*!***************************!*\
  !*** ./models/company.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst CompanySchema = new Schema({\n  name: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  docType: {\n    type: String,\n    required: true\n  },\n  docNumber: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true,\n    trim: true\n  },\n  website: {\n    type: String,\n    trim: true,\n    unique: true\n  },\n  address: {\n    country: {\n      type: String,\n      required: true\n    },\n    street: {\n      type: String\n    },\n    city: {\n      type: String\n    },\n    zipcode: {\n      type: Number\n    }\n  },\n  socialUrls: [Object],\n  logoURL: {\n    type: String,\n    trim: true\n  },\n  bio: {\n    type: String\n  },\n  employees: {\n    type: Number\n  },\n  phone: {\n    type: Number\n  },\n  registeredDate: {\n    type: Date,\n    default: Date.now\n  },\n  jobOffers: [{\n    type: Schema.Types.ObjectId,\n    ref: 'JobOffer'\n  }]\n});\nconst Company = mongoose.model('Company', CompanySchema);\nmodule.exports = Company;\n\n//# sourceURL=webpack:///./models/company.js?");

/***/ }),

/***/ "./models/lang.js":
/*!************************!*\
  !*** ./models/lang.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst LanguageSchema = new Schema({\n  label: {\n    type: String,\n    required: true,\n    unique: true\n  }\n});\nconst Language = mongoose.model('Language', LanguageSchema);\nmodule.exports = Language;\n\n//# sourceURL=webpack:///./models/lang.js?");

/***/ }),

/***/ "./models/offer.js":
/*!*************************!*\
  !*** ./models/offer.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst OfferSchema = new _mongoose2.default.Schema({\n  companyEmail: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  title: {\n    type: String,\n    required: true\n  },\n  position: {\n    type: String,\n    required: true\n  },\n  vacancies: {\n    type: Number,\n    required: true\n  },\n  description: String,\n  publicationDate: {\n    type: Date,\n    default: Date.now\n  }\n});\n\nconst Offer = _mongoose2.default.model('JobOffer', OfferSchema);\n\nexports.default = Offer;\n\n//# sourceURL=webpack:///./models/offer.js?");

/***/ }),

/***/ "./models/skill.js":
/*!*************************!*\
  !*** ./models/skill.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst SkillSchema = new Schema({\n  type: {\n    type: String,\n    required: true\n  },\n  label: {\n    type: String,\n    required: true\n  }\n});\nconst Skill = mongoose.model('Skill', SkillSchema);\nmodule.exports = Skill;\n\n//# sourceURL=webpack:///./models/skill.js?");

/***/ }),

/***/ "./models/survey.js":
/*!**************************!*\
  !*** ./models/survey.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst SurveySchema = new Schema({\n  header: {\n    title: {\n      type: String,\n      required: true\n    },\n    subtitle: {\n      type: String\n    },\n    startDate: {\n      type: Date,\n      default: Date.now\n    },\n    endDate: {\n      type: Date,\n      required: true\n    },\n    description: {\n      type: String,\n      required: true\n    }\n  },\n  elements: [{\n    type: {\n      type: String,\n      required: true\n    },\n    label: {\n      type: String,\n      required: true\n    },\n    name: {\n      type: String,\n      required: true\n    },\n    placeholder: {\n      type: String\n    },\n    values: [{\n      name: {\n        type: String,\n        required: true\n      },\n      label: {\n        type: String,\n        required: true\n      },\n      value: {\n        type: String,\n        required: true\n      }\n    }]\n  }]\n});\nconst Survey = mongoose.model('Survey', SurveySchema);\nmodule.exports = Survey;\n\n//# sourceURL=webpack:///./models/survey.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst UserSchema = new Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  username: {\n    type: String,\n    required: true\n  },\n  email: {\n    type: String,\n    unique: true,\n    required: true\n  },\n  phoneNumber: {\n    type: Number,\n    unique: true\n  },\n  gender: String,\n  address: {\n    country: {\n      type: String,\n      required: true\n    },\n    city: {\n      type: String\n    },\n    street: {\n      type: String\n    },\n    zipcode: {\n      type: Number\n    }\n  },\n  company: String,\n  jobTitle: String,\n  languages: [{\n    type: [Schema.Types.ObjectId],\n    ref: 'Language'\n  }],\n  skills: [{\n    type: [Schema.Types.ObjectId],\n    ref: 'Skill'\n  }],\n  experience: String,\n  birthDate: Date,\n  website: {\n    type: String,\n    trim: true,\n    unique: true\n  },\n  profilePicture: {\n    type: String,\n    trim: true\n  },\n  registeredDate: {\n    type: Date,\n    default: Date.now\n  }\n});\nconst User = mongoose.model('User', UserSchema);\nmodule.exports = User;\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./routes/api.js":
/*!***********************!*\
  !*** ./routes/api.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _offer = __webpack_require__(/*! ../models/offer */ \"./models/offer.js\");\n\nvar _offer2 = _interopRequireDefault(_offer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n\nconst multer = __webpack_require__(/*! multer */ \"multer\"); // Multer settings to store images into the database\n\n\nconst storage = multer.diskStorage({\n  destination: function (req, file, callback) {\n    callback(null, 'uploads/');\n  },\n  filename: function (req, file, callback) {\n    callback(null, new Date().toISOString().replace(/:/g, '_') + file.originalname);\n  }\n});\nconst upload = multer({\n  storage: storage,\n  limits: {\n    fileSize: 1024 * 1024 * 3\n  },\n  fileFilter: function (req, file, callback) {\n    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {\n      callback(null, true);\n    } else {\n      callback(new Error('Not a valid file format'), false);\n    }\n  }\n}); // Import database models\n\nconst User = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n\nconst Skill = __webpack_require__(/*! ../models/skill */ \"./models/skill.js\");\n\nconst Language = __webpack_require__(/*! ../models/lang */ \"./models/lang.js\");\n\nconst Company = __webpack_require__(/*! ../models/company */ \"./models/company.js\");\n\nconst Survey = __webpack_require__(/*! ../models/survey */ \"./models/survey.js\");\n\nrouter.get('/', (req, res, next) => {\n  return res.json({\n    welcome: 'There is a list with useful links',\n    links: {\n      users: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/users`,\n      skills: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/skills`,\n      languages: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/langs`,\n      companies: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/companies`,\n      jobOffers: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/jobOffers`,\n      surveys: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/surveys`\n    }\n  });\n}); // Get all users\n\nrouter.get('/users', (req, res, next) => {\n  User.find().then(users => res.json(users));\n}); // Get a page with 10 users\n\nrouter.get('/users/pages/:pageId', (req, res, next) => {\n  User.find().skip((req.params.pageId - 1) * 10).limit(10).then(users => res.json(users));\n}); // Add a new user to the database\n\nrouter.post('/users', upload.single('profilePicture'), (req, res, next) => {\n  let {\n    name,\n    username,\n    email,\n    phoneNumber,\n    gender,\n    address,\n    company,\n    jobTitle,\n    website,\n    birthDate,\n    experience,\n    languages,\n    skills\n  } = req.body;\n\n  if (name && email && username) {\n    const newUser = {\n      name,\n      username,\n      email,\n      phoneNumber,\n      gender,\n      address,\n      company,\n      jobTitle,\n      website,\n      birthDate,\n      experience,\n      languages,\n      skills\n    };\n\n    if (req.file && req.file !== undefined) {\n      newUser.profilePicture = `${req.protocol}://${req.hostname}/${req.file.path}`;\n    } else if (req.file === undefined) {\n      newUser.profilePicture = `${req.protocol}://${req.hostname}/uploads/default_avatar.png`;\n    }\n\n    User.create(newUser, function (err, user) {\n      if (err) return next(err);\n      return res.json(user);\n    });\n  } else {\n    res.json({\n      error: 'Name, username and email properties are required.'\n    });\n  }\n}); // Get a users info by id\n\nrouter.get('/users/:id', (req, res, next) => {\n  User.findById(req.params.id).populate('skills').populate('languages').exec((err, user) => {\n    if (err) return next(err);\n    res.json(user);\n  });\n}); // Update a users info by its id\n\nrouter.put('/users/:id', upload.single('profilePicture'), (req, res, next) => {\n  let updatedUser = Object.assign({}, req.body);\n\n  if (req.file && req.file !== undefined) {\n    updatedUser.profilePicture = `${req.protocol}://${req.hostname}/${req.file.path}`;\n  }\n\n  User.findByIdAndUpdate(req.params.id, updatedUser).exec(err => {\n    if (err) return next(err);\n    res.redirect(`/api/users/${req.params.id}`);\n  });\n}); // Delete a user by id\n\nrouter.delete('/users/:id', (req, res, next) => {\n  User.findByIdAndRemove(req.params.id, function (err) {\n    if (err) return next(err);\n    res.redirect(`/api/users/`);\n  });\n}); // COMPANY ROUTES\n// Get all the companies from the database\n\nrouter.get('/companies', (req, res, next) => {\n  Company.find().then(companies => res.json(companies));\n}); // Get a company by its id\n\nrouter.get('/companies/:id', (req, res, next) => {\n  Company.findById(req.params.id).populate('jobOffers').exec((error, company) => {\n    if (error) return next(error);\n\n    if (!company) {\n      const err = new Error('Company not found');\n      err.status = 404;\n      return next(err);\n    }\n\n    res.json(company);\n  });\n}); // Add a new company to the database\n\nrouter.post('/companies', upload.single('logoURL'), (req, res, next) => {\n  let {\n    name,\n    docType,\n    docNumber,\n    email,\n    website,\n    address,\n    socialUrls,\n    bio,\n    employees,\n    phone,\n    jobOffers\n  } = req.body;\n\n  if (name && email && docType && docNumber && address.country) {\n    const newCompany = {\n      name,\n      docType,\n      docNumber,\n      email,\n      website,\n      address,\n      socialUrls,\n      bio,\n      employees,\n      phone,\n      jobOffers\n    };\n\n    if (req.file && req.file !== undefined) {\n      newCompany.logoURL = `${req.protocol}://${req.hostname}/${req.file.path}`;\n    }\n\n    Company.create(newCompany, (err, company) => {\n      if (err) return next(err);\n      return res.json(company);\n    });\n  } else {\n    res.json({\n      error: 'Not all required data was sent'\n    });\n  }\n}); // Update a company info by its id\n\nrouter.put('/companies/:id', upload.single('logoURL'), (req, res, next) => {\n  let updateData = Object.assign({}, req.body);\n\n  if (req.file) {\n    updateData.logoURL = `${req.protocol}://${req.hostname}/${req.file.path}`;\n  }\n\n  Company.findByIdAndUpdate(req.params.id, updateData).exec(err => {\n    if (err) return next(err);\n    return res.redirect(`/api/companies/${req.params.id}`);\n  });\n}); // Delete a company profile by its id\n\nrouter.delete('/companies/:id', (req, res, next) => {\n  Company.findByIdAndDelete(req.params.id, err => {\n    if (err) return next(err);\n    res.json({\n      message: 'Company profile succesfully deleted.'\n    });\n  });\n}); // Languages CRUD\n// Get all languages\n\nrouter.get('/langs', (req, res, next) => {\n  Language.find().then(langs => res.json(langs));\n}); // Add a new language to the database\n\nrouter.post('/langs', (req, res, next) => {\n  let {\n    label\n  } = req.body;\n\n  if (label) {\n    Language.create({\n      label\n    }, (err, doc) => {\n      if (err) return next(err);\n      return res.json(doc);\n    });\n  }\n});\nrouter.delete('/langs/:id', (req, res, next) => {\n  Language.findByIdAndDelete(req.params.id, err => {\n    if (err) return next(err);\n    return res.json({\n      message: 'Language successfully deleted.'\n    });\n  });\n}); // Skills CRUD\n// Get all skills\n\nrouter.get('/skills', (req, res, next) => {\n  Skill.find().then(skills => res.json(skills));\n}); // Add a new skill\n\nrouter.post('/skills', (req, res, next) => {\n  let {\n    type,\n    label\n  } = req.body;\n\n  if (type && label) {\n    let newSkill = {\n      type,\n      label\n    };\n    Skill.create(newSkill, (err, doc) => {\n      if (err) return next(err);\n      return res.json(doc);\n    });\n  }\n}); // Delete a skill from db\n\nrouter.delete('/skills/:id', (req, res, next) => {\n  Skill.findByIdAndDelete(req.params.id, err => {\n    if (err) return next(err);\n    return res.json({\n      message: 'The skill was removed successfully'\n    });\n  });\n}); // SURVEYS routes\n// Get all surveys\n\nrouter.get('/surveys', (req, res, next) => {\n  Survey.find({}, (err, doc) => {\n    if (err) return next(err);\n    return res.json(doc);\n  });\n}); // Add a new survey\n\nrouter.post('/surveys', (req, res, next) => {\n  let {\n    header,\n    elements\n  } = req.body;\n  let newSurvey = {\n    header,\n    elements\n  };\n  Survey.create(newSurvey, (err, doc) => {\n    if (err) return next(err);\n\n    if (!doc) {\n      const error = new Error('Something failed while trying to create the new survey');\n      error.status = 404;\n      return next(error);\n    }\n\n    return res.json(doc);\n  });\n}); // Delete a survey\n\nrouter.delete('/surveys/:id', (req, res, next) => {\n  Survey.findByIdAndDelete(req.params.id, err => {\n    if (err) return next(err);\n    return res.json({\n      message: 'Survey entry successfully removed'\n    });\n  });\n}); // JOB OFFER CRUD\n// Get all offers\n\nrouter.get('/offers', (req, res) => {\n  _offer2.default.find().then(offers => res.json(offers));\n});\nrouter.get('/offers/:id', (req, res, next) => {\n  _offer2.default.findById(req.params.id, (err, offer) => {\n    if (err) return next(err);\n    res.json(offer);\n  });\n});\nrouter.post('/offers', (req, res, next) => {\n  let {\n    title,\n    position,\n    vacancies,\n    description,\n    companyEmail\n  } = req.body;\n  const newOffer = {\n    title,\n    position,\n    vacancies,\n    description,\n    companyEmail\n  };\n\n  _offer2.default.create(newOffer, (err, offer) => {\n    if (err) return next(err); // Push the offer into the correspondant company\n\n    Company.findOneAndUpdate({\n      email: companyEmail\n    }, {\n      $push: {\n        jobOffers: offer._id\n      }\n    }).then(() => res.json(offer));\n  });\n});\nrouter.delete('/offers/:id', (req, res, next) => {\n  _offer2.default.findByIdAndDelete(req.params.id, (err, offer) => {\n    if (err) return next(err);\n    Company.findOneAndUpdate({\n      email: offer.companyEmail\n    }, {\n      $pull: {\n        jobOffers: offer._id\n      }\n    }).then(company => res.redirect(`/api/companies/${company._id}`)).catch(err => next(err));\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/api.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-ga-middleware":
/*!****************************************!*\
  !*** external "express-ga-middleware" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-ga-middleware\");\n\n//# sourceURL=webpack:///external_%22express-ga-middleware%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });
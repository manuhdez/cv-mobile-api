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
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _compression = __webpack_require__(/*! compression */ \"compression\");\n\nvar _compression2 = _interopRequireDefault(_compression);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar _helmet2 = _interopRequireDefault(_helmet);\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _expressGaMiddleware = __webpack_require__(/*! express-ga-middleware */ \"express-ga-middleware\");\n\nvar _expressGaMiddleware2 = _interopRequireDefault(_expressGaMiddleware);\n\nvar _cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar _cors2 = _interopRequireDefault(_cors);\n\nvar _api = __webpack_require__(/*! ./routes/api */ \"./routes/api.js\");\n\nvar _api2 = _interopRequireDefault(_api);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst app = (0, _express2.default)();\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config(); // Server configuration\n\n\napp.use((0, _helmet2.default)()); // CORS Managing\n\napp.use((0, _cors2.default)()); // Google analytics middleware\n\napp.use((0, _expressGaMiddleware2.default)('UA-127831712-2')); // Compress the coming requests\n\napp.use((0, _compression2.default)({\n  filter: shouldCompress\n}));\n\nfunction shouldCompress(req, res) {\n  if (req.headers[\"x-no-compression\"]) {\n    // don't compress responses with this request header\n    return false;\n  }\n} // Middleware for logging http requests\n\n\nconst loggerFormat =  true ? \"dev\" : undefined;\napp.use((0, _morgan2.default)(loggerFormat)); // Parsing requests\n\napp.use(\"/uploads\", _express2.default.static(\"uploads\"));\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({\n  extended: false\n})); // Database connection\n\nlet mongoURI =  true ? \"mongodb://localhost:27017/cv-mobile\" : undefined;\n\n_mongoose2.default.connect(mongoURI, {\n  useNewUrlParser: true\n});\n\nconst db = _mongoose2.default.connection;\ndb.on(\"error\", err => {\n  console.error(\"Mongodb connection error:\", err);\n});\ndb.on(\"open\", () => {\n  console.log(\"Mongodb connected successfully\");\n}); // Server Routes\n\napp.get('/', (req, res) => {\n  res.redirect('/docs');\n});\napp.get(\"/docs\", (req, res) => {\n  res.sendfile(\"views/docs.html\");\n});\napp.use(\"/api\", _api2.default); // Middleware\n// 404 Catching\n\napp.use((req, res, next) => {\n  const err = new Error(\"Page not found\");\n  err.status = 404;\n  return next(err);\n}); // Error handler\n\napp.use((err, req, res, next) => {\n  res.status(err.status || 500);\n  res.json({\n    error: err.message\n  });\n}); // Run server\n\nconst port = process.env.PORT || 3000;\napp.listen(port, error => {\n  error ? process.exit(error) : console.log(`App listening on 'http://localhost:${port}'...\n           ---\n           Running on ${\"development\"}\n           ---\n      `);\n});\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./models/company.js":
/*!***************************!*\
  !*** ./models/company.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst CompanySchema = new Schema({\n  name: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  docType: {\n    type: String,\n    required: true\n  },\n  docNumber: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true,\n    trim: true\n  },\n  website: {\n    type: String,\n    trim: true,\n    unique: true,\n    sparse: true\n  },\n  address: {\n    country: {\n      type: String,\n      required: true\n    },\n    street: {\n      type: String\n    },\n    city: {\n      type: String\n    },\n    zipcode: {\n      type: String\n    }\n  },\n  socialUrls: [{\n    platform: String,\n    url: String\n  }],\n  logo: {\n    type: String,\n    trim: true\n  },\n  bio: {\n    type: String\n  },\n  employees: {\n    type: Number\n  },\n  phone: {\n    type: String\n  },\n  registeredDate: {\n    type: Date,\n    default: Date.now\n  },\n  jobOffers: [{\n    type: Schema.Types.ObjectId,\n    ref: 'JobOffer'\n  }]\n});\nconst Company = mongoose.model('Company', CompanySchema);\nmodule.exports = Company;\n\n//# sourceURL=webpack:///./models/company.js?");

/***/ }),

/***/ "./models/file.js":
/*!************************!*\
  !*** ./models/file.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst Schema = _mongoose2.default.Schema;\nconst FileSchema = new Schema({\n  url: String,\n  type: String,\n  model: String\n});\n\nconst File = _mongoose2.default.model('File', FileSchema);\n\nmodule.exports = File;\n\n//# sourceURL=webpack:///./models/file.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst OfferSchema = new _mongoose2.default.Schema({\n  companyEmail: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  company: String,\n  title: {\n    type: String,\n    required: true\n  },\n  contractType: {\n    type: String,\n    required: true\n  },\n  location: {\n    type: String,\n    required: true\n  },\n  description: String,\n  responsabilities: [String],\n  whatWeOffer: [{\n    title: String,\n    description: String\n  }],\n  whatWeLookFor: [{\n    title: String,\n    description: String\n  }],\n  publishDate: {\n    type: Date,\n    default: Date.now\n  }\n});\n\nconst Offer = _mongoose2.default.model('JobOffer', OfferSchema);\n\nexports.default = Offer;\n\n//# sourceURL=webpack:///./models/offer.js?");

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

/***/ "./models/summary.js":
/*!***************************!*\
  !*** ./models/summary.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst Schema = _mongoose2.default.Schema;\nconst SummarySchema = new Schema({\n  origin: {\n    type: Schema.Types.ObjectId,\n    ref: 'Survey',\n    required: true\n  },\n  title: {\n    type: String,\n    required: true\n  },\n  totalAnswers: Number,\n  answers: [{\n    question: String,\n    options: [{\n      value: {\n        type: String,\n        required: true\n      },\n      count: Number\n    }]\n  }]\n});\n\nconst Summary = _mongoose2.default.model('Summary', SummarySchema);\n\nexports.default = Summary;\n\n//# sourceURL=webpack:///./models/summary.js?");

/***/ }),

/***/ "./models/survey.js":
/*!**************************!*\
  !*** ./models/survey.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst SurveySchema = new Schema({\n  header: {\n    title: {\n      type: String,\n      required: true\n    },\n    subtitle: {\n      type: String\n    },\n    startDate: {\n      type: Date,\n      default: Date.now\n    },\n    endDate: {\n      type: Date,\n      required: true\n    },\n    description: {\n      type: String,\n      required: true\n    }\n  },\n  elements: [{\n    type: {\n      type: String,\n      required: true\n    },\n    label: {\n      type: String,\n      required: true\n    },\n    name: {\n      type: String,\n      required: true\n    },\n    values: [{\n      label: {\n        type: String,\n        required: true\n      },\n      value: {\n        type: String,\n        required: true\n      }\n    }]\n  }]\n});\nconst Survey = mongoose.model('Survey', SurveySchema);\nmodule.exports = Survey;\n\n//# sourceURL=webpack:///./models/survey.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst UserSchema = new Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  username: {\n    type: String,\n    required: true\n  },\n  email: {\n    type: String,\n    unique: true,\n    required: true\n  },\n  phone: {\n    type: String,\n    unique: true,\n    sparse: true\n  },\n  gender: String,\n  address: {\n    country: {\n      type: String,\n      required: true\n    },\n    city: {\n      type: String\n    },\n    street: {\n      type: String\n    },\n    zipcode: {\n      type: Number\n    }\n  },\n  company: String,\n  jobTitle: String,\n  languages: [{\n    type: [Schema.Types.ObjectId],\n    ref: 'Language'\n  }],\n  skills: [{\n    type: [Schema.Types.ObjectId],\n    ref: 'Skill'\n  }],\n  experience: String,\n  birthDate: Date,\n  website: {\n    type: String,\n    trim: true,\n    unique: true,\n    sparse: true\n  },\n  avatar: {\n    type: String,\n    trim: true\n  },\n  registeredDate: {\n    type: Date,\n    default: Date.now\n  }\n});\nconst User = mongoose.model('User', UserSchema);\nmodule.exports = User;\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./routes/api.js":
/*!***********************!*\
  !*** ./routes/api.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _multer = __webpack_require__(/*! multer */ \"multer\");\n\nvar _multer2 = _interopRequireDefault(_multer);\n\nvar _users = __webpack_require__(/*! ./users */ \"./routes/users.js\");\n\nvar _users2 = _interopRequireDefault(_users);\n\nvar _langs = __webpack_require__(/*! ./langs */ \"./routes/langs.js\");\n\nvar _langs2 = _interopRequireDefault(_langs);\n\nvar _skills = __webpack_require__(/*! ./skills */ \"./routes/skills.js\");\n\nvar _skills2 = _interopRequireDefault(_skills);\n\nvar _companies = __webpack_require__(/*! ./companies */ \"./routes/companies.js\");\n\nvar _companies2 = _interopRequireDefault(_companies);\n\nvar _offers = __webpack_require__(/*! ./offers */ \"./routes/offers.js\");\n\nvar _offers2 = _interopRequireDefault(_offers);\n\nvar _surveys = __webpack_require__(/*! ./surveys */ \"./routes/surveys.js\");\n\nvar _surveys2 = _interopRequireDefault(_surveys);\n\nvar _summaries = __webpack_require__(/*! ./summaries */ \"./routes/summaries.js\");\n\nvar _summaries2 = _interopRequireDefault(_summaries);\n\nvar _files = __webpack_require__(/*! ./files */ \"./routes/files.js\");\n\nvar _files2 = _interopRequireDefault(_files);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst router = _express2.default.Router(); // Multer settings to store images into the database\n\n\nconst storage = _multer2.default.diskStorage({\n  destination: function (req, file, callback) {\n    if (req.params.type === 'user') {\n      callback(null, 'uploads/avatars');\n    } else if (req.params.type === 'company') {\n      callback(null, 'uploads/logos');\n    }\n  },\n  filename: function (req, file, callback) {\n    let fileExtension = `.${file.mimetype.split('/')[1]}`;\n    callback(null, req.params.id + fileExtension);\n  }\n});\n\nconst upload = (0, _multer2.default)({\n  storage: storage,\n  limits: {\n    fileSize: 1024 * 1024 * 3\n  },\n  fileFilter: function (req, file, callback) {\n    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {\n      callback(null, true);\n    } else {\n      callback(new Error('Not a valid file format'), false);\n    }\n  }\n}); // API ROUTES\n\nrouter.get('/', (req, res, next) => {\n  return res.json({\n    welcome: 'There is a list with useful links',\n    links: {\n      users: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/users`,\n      skills: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/skills`,\n      languages: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/langs`,\n      companies: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/companies`,\n      job_offers: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/offers`,\n      surveys: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/surveys`,\n      summaries: `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}/api/summaries`\n    }\n  });\n}); // USERS CRUD\n\nrouter.get('/users', _users2.default.getAll);\nrouter.post('/users', _users2.default.add);\nrouter.get('/users/pages/:pageId', _users2.default.getPage);\nrouter.get('/users/:id', _users2.default.getById);\nrouter.put('/users/:id', _users2.default.update);\nrouter.delete('/users/:id', _users2.default.delete); // LANGS CRUD\n\nrouter.get('/langs', _langs2.default.getAll);\nrouter.post('/langs', _langs2.default.add);\nrouter.get('/langs/:id', _langs2.default.getById);\nrouter.delete('/langs/:id', _langs2.default.delete); // Skills CRUD\n\nrouter.get('/skills', _skills2.default.getAll);\nrouter.post('/skills', _skills2.default.add);\nrouter.get('/skills/:id', _skills2.default.getById);\nrouter.delete('/skills/:id', _skills2.default.delete); // COMPANIES CRUD\n\nrouter.get('/companies', _companies2.default.getAll);\nrouter.post('/companies', _companies2.default.add);\nrouter.get('/companies/:id', _companies2.default.getById);\nrouter.put('/companies/:id', _companies2.default.update);\nrouter.delete('/companies/:id', _companies2.default.delete); // JOB OFFER CRUD\n\nrouter.get('/offers', _offers2.default.get);\nrouter.post('/offers', _offers2.default.add);\nrouter.get('/offers/:id', _offers2.default.getById);\nrouter.delete('/offers/:id', _offers2.default.delete); // SURVEYS CRUD\n\nrouter.get('/surveys', _surveys2.default.get);\nrouter.post('/surveys', _surveys2.default.add);\nrouter.delete('/surveys/:id', _surveys2.default.delete); // SUMMARIES ROUTES\n\nrouter.get('/summaries', _summaries2.default.get);\nrouter.get('/summaries/:origin', _summaries2.default.getByOrigin);\nrouter.put('/summaries/:origin', _summaries2.default.updateSummary); // FILES\n\nrouter.post('/files/upload/:type/:id', upload.single('img'), _files2.default.uploadFile);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/api.js?");

/***/ }),

/***/ "./routes/companies.js":
/*!*****************************!*\
  !*** ./routes/companies.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _company = __webpack_require__(/*! ../models/company */ \"./models/company.js\");\n\nvar _company2 = _interopRequireDefault(_company);\n\nvar _offer = __webpack_require__(/*! ../models/offer */ \"./models/offer.js\");\n\nvar _offer2 = _interopRequireDefault(_offer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Get all the companies from the database\nexports.getAll = (req, res, next) => {\n  _company2.default.find().then(companies => res.status(200).json(companies)).catch(err => next(err));\n}; // Get a company by its id\n\n\nexports.getById = (req, res, next) => {\n  _company2.default.findById(req.params.id).populate('jobOffers').then(company => res.status(200).json(company)).catch(err => next(err));\n}; // Add a new company to the database\n\n\nexports.add = (req, res, next) => {\n  let {\n    name,\n    docType,\n    docNumber,\n    email,\n    website,\n    address,\n    socialUrls,\n    bio,\n    employees,\n    phone\n  } = req.body;\n  let defaultLogo = `${req.protocol}://${req.hostname}/uploads/default_avatar.png`;\n\n  if (name && email && docType && docNumber && address.country) {\n    const newCompany = {\n      name,\n      docType,\n      docNumber,\n      email,\n      website,\n      address,\n      socialUrls,\n      bio,\n      employees,\n      phone,\n      jobOffers: [],\n      logo: defaultLogo\n    };\n\n    _company2.default.create(newCompany, (err, company) => {\n      if (err) return next(err);\n      return res.status(200).json(company);\n    });\n  } else {\n    res.status(401).json({\n      error: 'Not all required data was sent'\n    });\n  }\n}; // Update a company info by its id\n\n\nexports.update = (req, res, next) => {\n  let updateData = Object.assign({}, req.body);\n\n  _company2.default.findByIdAndUpdate(req.params.id, updateData).exec((err, company) => {\n    if (err) return next(err);\n\n    if (updateData.email) {\n      _offer2.default.update({\n        companyEmail: company.email\n      }, {\n        companyEmail: updateData.email\n      }).then(() => res.status(200).json(company)).catch(err => next(err));\n    }\n\n    res.json(company);\n  });\n}; // Delete a company profile by its id\n\n\nexports.delete = (req, res, next) => {\n  _company2.default.findByIdAndDelete(req.params.id, (err, company) => {\n    if (err) return next(err);\n\n    _offer2.default.deleteMany({\n      companyEmail: company.email\n    }).then(() => res.status(200).json({\n      message: 'Company successfuly deleted'\n    })).catch(err => next(err));\n  });\n};\n\n//# sourceURL=webpack:///./routes/companies.js?");

/***/ }),

/***/ "./routes/files.js":
/*!*************************!*\
  !*** ./routes/files.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _file = __webpack_require__(/*! ../models/file */ \"./models/file.js\");\n\nvar _file2 = _interopRequireDefault(_file);\n\nvar _user = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _company = __webpack_require__(/*! ../models/company */ \"./models/company.js\");\n\nvar _company2 = _interopRequireDefault(_company);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.uploadFile = (req, res, next) => {\n  let {\n    type,\n    id\n  } = req.params;\n  let newFile = {\n    model: id,\n    type\n  };\n\n  if (req.file) {\n    newFile.url = `${req.protocol}://${req.hostname}/${req.file.path}`;\n  }\n\n  _file2.default.deleteOne({\n    model: id\n  }).then(() => {\n    _file2.default.create(newFile, (err, doc) => {\n      if (err) return next(err);\n\n      if (type === 'user') {\n        _user2.default.findByIdAndUpdate(id, {\n          avatar: doc.url\n        }, {\n          new: true\n        }).exec((err, user) => {\n          if (err) return next(err);\n          res.json(user);\n        });\n      } else if (type === 'company') {\n        _company2.default.findByIdAndUpdate(id, {\n          logo: doc.url\n        }, {\n          new: true\n        }).exec((err, company) => {\n          if (err) return next(err);\n          res.json(company);\n        });\n      }\n    });\n  }).catch(err => res.json(err));\n};\n\n//# sourceURL=webpack:///./routes/files.js?");

/***/ }),

/***/ "./routes/langs.js":
/*!*************************!*\
  !*** ./routes/langs.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _lang = __webpack_require__(/*! ../models/lang */ \"./models/lang.js\");\n\nvar _lang2 = _interopRequireDefault(_lang);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.getAll = (req, res, next) => {\n  _lang2.default.find().then(langs => res.json(langs)).catch(err => next(err));\n};\n\nexports.getById = (req, res, next) => {\n  _lang2.default.findById(req.params.id).then(lang => res.json(lang)).catch(err => next(err));\n}; // Add a new language to the database\n\n\nexports.add = (req, res, next) => {\n  let {\n    label\n  } = req.body;\n\n  if (label) {\n    _lang2.default.create({\n      label\n    }, (err, doc) => {\n      if (err) return next(err);\n      return res.json(doc);\n    });\n  }\n};\n\nexports.delete = (req, res, next) => {\n  _lang2.default.findByIdAndDelete(req.params.id, err => {\n    if (err) return next(err);\n    return res.json({\n      message: 'Language successfully deleted.'\n    });\n  });\n};\n\n//# sourceURL=webpack:///./routes/langs.js?");

/***/ }),

/***/ "./routes/offers.js":
/*!**************************!*\
  !*** ./routes/offers.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _offer = __webpack_require__(/*! ../models/offer */ \"./models/offer.js\");\n\nvar _offer2 = _interopRequireDefault(_offer);\n\nvar _company = __webpack_require__(/*! ../models/company */ \"./models/company.js\");\n\nvar _company2 = _interopRequireDefault(_company);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Get all offers\nexports.get = (req, res) => {\n  _offer2.default.find().then(offers => res.json(offers)).catch(err => next(err));\n};\n\nexports.getById = (req, res, next) => {\n  _offer2.default.findById(req.params.id).then(offer => res.json(offer)).catch(err => next(err));\n};\n\nexports.add = (req, res, next) => {\n  let {\n    title,\n    contractType,\n    location,\n    description,\n    companyEmail,\n    company,\n    responsabilities,\n    whatWeOffer,\n    whatWeLookFor\n  } = req.body;\n  const newOffer = {\n    companyEmail,\n    company,\n    title,\n    contractType,\n    location,\n    description,\n    responsabilities,\n    whatWeOffer,\n    whatWeLookFor // Check if the email sent belong to an existing company\n\n  };\n\n  _company2.default.find({\n    email: companyEmail\n  }).then(doc => {\n    if (doc.length === 0) return res.json({\n      message: 'Please use an existing company email'\n    });\n\n    _offer2.default.create(newOffer, (err, offer) => {\n      if (err) return next(err);\n\n      if (!offer) {\n        const error = new Error('Something went wrong.');\n        error.status(500);\n        return next(error);\n      }\n\n      _company2.default.update({\n        email: companyEmail\n      }, {\n        $push: {\n          jobOffers: offer._id\n        }\n      }).then(() => res.json(offer)).catch(err => next(err));\n    });\n  }).catch(err => next(err));\n};\n\nexports.delete = (req, res, next) => {\n  _offer2.default.findByIdAndDelete(req.params.id, (err, offer) => {\n    if (err) return next(err);\n\n    _company2.default.findOneAndUpdate({\n      email: offer.companyEmail\n    }, {\n      $pull: {\n        jobOffers: offer._id\n      }\n    }).then(() => res.status(200).json({\n      message: 'Offer successfuly deleted'\n    })).catch(err => next(err));\n  });\n};\n\n//# sourceURL=webpack:///./routes/offers.js?");

/***/ }),

/***/ "./routes/skills.js":
/*!**************************!*\
  !*** ./routes/skills.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _skill = __webpack_require__(/*! ../models/skill */ \"./models/skill.js\");\n\nvar _skill2 = _interopRequireDefault(_skill);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.getAll = (req, res, next) => {\n  _skill2.default.find().then(skills => res.json(skills)).catch(err => next(err));\n};\n\nexports.getById = (req, res, next) => {\n  _skill2.default.findById(req.params.id).then(skill => res.json(skill)).catch(err => next(err));\n};\n\nexports.add = (req, res, next) => {\n  let {\n    type,\n    label\n  } = req.body;\n\n  if (type && label) {\n    let newSkill = {\n      type,\n      label\n    };\n\n    _skill2.default.create(newSkill, (err, doc) => {\n      if (err) return next(err);\n      return res.json(doc);\n    });\n  }\n}; // Delete a skill from db\n\n\nexports.delete = (req, res, next) => {\n  _skill2.default.findByIdAndDelete(req.params.id, err => {\n    if (err) return next(err);\n    return res.json({\n      message: 'The skill was removed successfully'\n    });\n  });\n};\n\n//# sourceURL=webpack:///./routes/skills.js?");

/***/ }),

/***/ "./routes/summaries.js":
/*!*****************************!*\
  !*** ./routes/summaries.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _summary = __webpack_require__(/*! ../models/summary */ \"./models/summary.js\");\n\nvar _summary2 = _interopRequireDefault(_summary);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// get all summaries\nexports.get = (req, res, next) => {\n  _summary2.default.find().then(summaries => res.json(summaries)).catch(err => next(err));\n}; // get a summary by its origin survey\n\n\nexports.getByOrigin = (req, res, next) => {\n  console.log(req.params.origin);\n\n  _summary2.default.findOne({\n    'origin': req.params.origin\n  }).populate('origin').then(summary => res.json(summary[0])).catch(err => next(err));\n};\n\nexports.updateSummary = (req, res, next) => {\n  let userRes = Object.assign({}, req.body);\n  console.log(userRes);\n\n  _summary2.default.find({\n    origin: req.params.origin\n  }).then(sum => {\n    let {\n      totalAnswers,\n      answers\n    } = sum[0];\n    let questionsToUpdate = [];\n    userRes.questions.forEach(question => {\n      let coinc = answers.findIndex(answer => answer.question === question);\n      questionsToUpdate.push(coinc);\n    });\n    let updatedAnswers = answers.slice(0);\n    questionsToUpdate.forEach((ans, index) => {\n      updatedAnswers[ans].options.forEach(option => {\n        if (option.value === userRes.answers[index]) {\n          option.count += 1;\n        }\n      });\n    });\n    let updatedSummary = {\n      totalAnswers: totalAnswers += 1,\n      answers: updatedAnswers\n    };\n\n    _summary2.default.update({\n      origin: req.params.origin\n    }, updatedSummary, {\n      new: true\n    }).then(summary => res.json(summary)).catch(err => next(err));\n  }).catch(err => next(err));\n};\n\n//# sourceURL=webpack:///./routes/summaries.js?");

/***/ }),

/***/ "./routes/surveys.js":
/*!***************************!*\
  !*** ./routes/surveys.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _survey = __webpack_require__(/*! ../models/survey */ \"./models/survey.js\");\n\nvar _survey2 = _interopRequireDefault(_survey);\n\nvar _summary = __webpack_require__(/*! ../models/summary */ \"./models/summary.js\");\n\nvar _summary2 = _interopRequireDefault(_summary);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.get = (req, res, next) => {\n  _survey2.default.find().then(surveys => res.json(surveys)).catch(err => next(err));\n};\n\nexports.add = (req, res, next) => {\n  let {\n    header,\n    elements\n  } = req.body;\n  let newSurvey = {\n    header,\n    elements\n  };\n\n  _survey2.default.create(newSurvey, (err, survey) => {\n    if (err) return next(err);\n    let newSummary = {\n      origin: survey._id,\n      title: survey.header.title,\n      totalAnswers: 0,\n      answers: []\n    };\n    survey.elements.forEach(element => {\n      let answer = {\n        question: element.label,\n        options: []\n      };\n      element.values.forEach(value => answer.options.push({\n        value: value.label,\n        count: 0\n      }));\n      newSummary.answers.push(answer);\n    });\n\n    _summary2.default.create(newSummary, err => {\n      if (err) return next(err);\n      return res.json(survey);\n    });\n  });\n};\n\nexports.delete = (req, res, next) => {\n  _survey2.default.findByIdAndDelete(req.params.id, err => {\n    if (err) return next(err);\n\n    _summary2.default.findOneAndDelete({\n      origin: req.params.id\n    }).then(() => res.json({\n      message: 'Survey entry successfully removed'\n    })).catch(err => next(err));\n  });\n};\n\n//# sourceURL=webpack:///./routes/surveys.js?");

/***/ }),

/***/ "./routes/users.js":
/*!*************************!*\
  !*** ./routes/users.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _user = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Fetch all stored users\nexports.getAll = (req, res, next) => {\n  _user2.default.find().then(users => res.status(200).json(users)).catch(err => next(err));\n}; // Fetch a group with 10 users\n\n\nexports.getPage = (req, res, next) => {\n  _user2.default.find().skip((req.params.pageId - 1) * 10).limit(10).then(users => res.status(200).json(users)).catch(err => next(err));\n}; // Add a new user to the database\n\n\nexports.add = (req, res, next) => {\n  let {\n    name,\n    username,\n    email,\n    phone,\n    gender,\n    address,\n    company,\n    jobTitle,\n    website,\n    birthDate,\n    experience,\n    languages,\n    skills\n  } = req.body;\n  let defaultAvatar = `${req.protocol}://${req.hostname}/uploads/default_avatar.png`;\n\n  if (name && email && username && address.country) {\n    const newUser = {\n      name,\n      username,\n      email,\n      phone,\n      gender,\n      address,\n      company,\n      jobTitle,\n      website,\n      birthDate,\n      experience,\n      languages,\n      skills,\n      avatar: defaultAvatar\n    };\n\n    _user2.default.create(newUser, function (err, user) {\n      if (err) return next(err);\n      return res.status(200).json(user);\n    });\n  } else {\n    res.status(500).json({\n      error: 'Name, username, email and country properties are required.'\n    });\n  }\n}; // Fetch a user by its id\n\n\nexports.getById = (req, res, next) => {\n  _user2.default.findById(req.params.id).populate('skills').populate('languages').exec((err, user) => {\n    if (err) return next(err);\n    res.status(200).json(user);\n  });\n}; // Update a user by its id\n\n\nexports.update = (req, res, next) => {\n  let updatedUser = Object.assign({}, req.body);\n\n  _user2.default.findByIdAndUpdate(req.params.id, updatedUser, {\n    new: true\n  }).exec((err, user) => {\n    if (err) return next(err);\n    res.status(200).json(user);\n  });\n}; // Delete a user by id\n\n\nexports.delete = (req, res, next) => {\n  _user2.default.findByIdAndRemove(req.params.id, err => {\n    if (err) return next(err);\n    res.status(200).json({\n      message: 'User successfuly deleted'\n    });\n  });\n};\n\n//# sourceURL=webpack:///./routes/users.js?");

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

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

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

/***/ })

/******/ });
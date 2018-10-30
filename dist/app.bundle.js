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
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _compression = __webpack_require__(/*! compression */ \"compression\");\n\nvar _compression2 = _interopRequireDefault(_compression);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar _helmet2 = _interopRequireDefault(_helmet);\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst app = (0, _express2.default)(); // Server configuration\n\napp.use((0, _helmet2.default)()); // Compress the coming requests\n\napp.use((0, _compression2.default)({\n  filter: shouldCompress\n}));\n\nfunction shouldCompress(req, res) {\n  if (req.headers[\"x-no-compression\"]) {\n    // don't compress responses with this request header\n    return false;\n  }\n} // Middleware for logging http requests\n\n\nconst loggerFormat =  true ? \"dev\" : undefined;\napp.use((0, _morgan2.default)(loggerFormat)); // Parsing requests\n\napp.use(\"/uploads\", _express2.default.static(\"uploads\"));\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({\n  extended: false\n})); // views settings\n\napp.set(\"view engine\", \"pug\");\napp.set(\"views\", _path2.default.join(__dirname, \"../views\")); // Database connection\n\n_mongoose2.default.connect( // \"mongodb://manuhdez:cv-mobile-api-2018@ds225703.mlab.com:25703/cv-mobile-api\",\n\"mongodb://localhost:27017/cv-mobile\", {\n  useNewUrlParser: true\n});\n\nconst db = _mongoose2.default.connection;\ndb.on(\"error\", err => {\n  console.error(\"Mongodb connection error:\", err);\n});\ndb.on(\"open\", () => {\n  console.log(\"Mongodb connected successfully\");\n}); // CORS Managing\n\napp.use((req, res, next) => {\n  res.header(\"Access-Control-Allow-Origin\", \"*\");\n  res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept\");\n\n  if (req.method === \"OPTIONS\") {\n    res.header(\"Access-Control-Allow-Methods\", \"PUT, POST, DELETE\");\n    return res.status(200).json({});\n  }\n\n  next();\n}); // Server Routes\n\napp.get(\"/\", (req, res) => {\n  res.render(\"index\");\n});\n\nconst apiRoutes = __webpack_require__(/*! ./routes/api */ \"./routes/api.js\");\n\napp.use(\"/api\", apiRoutes); // Middleware\n// 404 Catching\n\napp.use((req, res, next) => {\n  const err = new Error(\"Page not found\");\n  err.status = 404;\n  return next(err);\n}); // Error handler\n\napp.use((err, req, res, next) => {\n  res.status(err.status || 500);\n  res.json({\n    error: err.message\n  });\n}); // Run server\n\nconst port = process.env.PORT || 3000;\napp.listen(port, error => {\n  error ? process.exit(error) : console.log(`App listening on http://localhost:${port}...\n           ---\n           Running on ${\"development\"}\n           ---\n      `);\n});\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./models/company.js":
/*!***************************!*\
  !*** ./models/company.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst CompanySchema = new Schema({\n  name: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  CIF: {\n    type: Number,\n    required: true,\n    unique: true\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true,\n    trim: true\n  },\n  website: {\n    type: String,\n    trim: true\n  },\n  address: {\n    country: {\n      type: String,\n      required: true\n    },\n    street: {\n      type: String\n    },\n    city: {\n      type: String\n    },\n    zipcode: {\n      type: Number\n    }\n  },\n  socialUrls: {\n    type: Object\n  },\n  logoURL: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  bio: {\n    type: String\n  },\n  employees: {\n    type: Number\n  },\n  phone: {\n    type: Number\n  },\n  registeredDate: {\n    type: Number\n  }\n});\nconst Company = mongoose.model('Company', CompanySchema);\nmodule.exports = Company;\n/*\n{\n        \"id\": 1,\n        \"name\": \" Canarias Smart\",\n        \"CIF\": \"J1535131E\",\n        \"email\": \"Sincere@april.biz\",\n        \"address\": {\n            \"country\": \"Spain\",\n            \"street\": \"Kulas Light\",\n            \"city\": \"Lebsackbury\",\n            \"zipcode\": \"92998-3874\"\n        },\n        \"socialnetworks\": {\n            \"twitter\": \"https://www.google.com/\",\n            \"linkedin\": \"https://www.google.com/\",\n            \"youtube\": \"https://www.google.com/\"\n        },\n        \"logo\": \"/assets/images/kisspng-windows-7-windows-vista-logo-microsoft-windows-logos-5ab719c342adc2.6952612015219491232731.jpg\",\n        \"descripcion\": \"Software development services with a high standard\",\n        \"workersNumber\": 10,\n        \"phone\": \"1-770-736-806442\"\n    },\n    */\n\n//# sourceURL=webpack:///./models/company.js?");

/***/ }),

/***/ "./models/skill.js":
/*!*************************!*\
  !*** ./models/skill.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst SkillSchema = new Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  value: {\n    type: String,\n    required: true\n  },\n  label: {\n    type: String,\n    required: true\n  }\n});\nconst Skill = mongoose.model('Skill', SkillSchema);\nmodule.exports = Skill;\n\n//# sourceURL=webpack:///./models/skill.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst UserSchema = new Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  username: {\n    type: String,\n    required: true\n  },\n  email: {\n    type: String,\n    unique: true,\n    required: true\n  },\n  gender: String,\n  location: {\n    type: Object\n  },\n  company: String,\n  jobTitle: String,\n  languages: Array,\n  skills: Array,\n  experience: String,\n  birthDate: Date,\n  website: {\n    type: String,\n    trim: true\n  },\n  profilePicture: {\n    type: String,\n    trim: true\n  },\n  registeredDate: Number\n});\nconst User = mongoose.model('User', UserSchema);\nmodule.exports = User;\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./routes/api.js":
/*!***********************!*\
  !*** ./routes/api.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n\nconst multer = __webpack_require__(/*! multer */ \"multer\"); // Multer settings to store images into the database\n\n\nconst storage = multer.diskStorage({\n  destination: function (req, file, callback) {\n    callback(null, 'uploads/');\n  },\n  filename: function (req, file, callback) {\n    callback(null, new Date().toISOString().replace(/:/g, '_') + file.originalname);\n  }\n});\nconst upload = multer({\n  storage: storage,\n  limits: {\n    fileSize: 1024 * 1024 * 3\n  },\n  fileFilter: function (req, file, callback) {\n    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {\n      callback(null, true);\n    } else {\n      callback(new Error('Not a valid file format'), false);\n    }\n  }\n}); // Import database models\n\nconst User = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n\nconst Company = __webpack_require__(/*! ../models/company */ \"./models/company.js\");\n\nconst Skill = __webpack_require__(/*! ../models/skill */ \"./models/skill.js\");\n\nrouter.get('/', (req, res, next) => {\n  return res.json({\n    message: 'This is the api endpoint'\n  });\n}); // Get all users\n\nrouter.get('/users', (req, res, next) => {\n  User.find().then(users => res.json(users));\n}); // Get a page with 10 users\n\nrouter.get('/users/pages/:pageId', (req, res, next) => {\n  User.find().skip((req.params.pageId - 1) * 10).limit(10).then(users => res.json(users));\n}); // Add a new user to the database\n\nrouter.post('/users', upload.single('profilePicture'), (req, res, next) => {\n  if (req.body.name && req.body.email && req.body.username) {\n    const newUser = {\n      name: req.body.name,\n      username: req.body.username,\n      email: req.body.email,\n      gender: req.body.gender,\n      location: {\n        \"city\": req.body.city,\n        \"state\": req.body.state,\n        \"country\": req.body.country\n      },\n      company: req.body.company,\n      jobTitle: req.body.jobTitle,\n      website: req.body.website,\n      birthDate: req.body.birthDate,\n      experience: req.body.experience,\n      languages: JSON.parse(req.body.languages),\n      skills: JSON.parse(req.body.skills),\n      registeredDate: Date.now()\n    };\n\n    if (req.file) {\n      newUser.profilePicture = `${req.protocol}://${req.hostname}/${req.file.path}`;\n    }\n\n    User.create(newUser, function (err, doc) {\n      if (err) {\n        return next(err);\n      } else {\n        return res.json(doc);\n      }\n    });\n  } else {\n    res.json({\n      error: 'Not all required data was sent'\n    });\n  }\n}); // Get a users info by id\n\nrouter.get('/users/:id', (req, res, next) => {\n  User.findById(req.params.id, function (err, doc) {\n    if (err) return next(err);\n\n    if (!doc) {\n      const error = new Error('User not found');\n      error.status = 404;\n      return next(error);\n    }\n\n    res.json(doc);\n  });\n}); // Update a users info by its id\n\nrouter.put('/users/:id', upload.single('profilePicture'), (req, res, next) => {\n  const updatedUser = {\n    name: req.body.name,\n    username: req.body.username,\n    email: req.body.email,\n    gender: req.body.gender,\n    location: {\n      \"city\": req.body.city,\n      \"state\": req.body.state,\n      \"country\": req.body.country\n    },\n    company: req.body.company,\n    jobTitle: req.body.jobTitle,\n    website: req.body.website,\n    birthDate: req.body.birthDate,\n    experience: req.body.experience,\n    languages: req.body.languages.slice().split(', '),\n    skills: req.body.skills.slice().split(', ')\n  };\n\n  if (req.file) {\n    updatedUser.profilePicture = `${req.protocol}://${req.hostname}/${req.file.path}`; // localhost development url\n    // updatedUser.profilePicture = `${req.protocol}://${req.hostname}:${port}/${req.file.path}`;\n  }\n\n  User.findByIdAndUpdate(req.params.id, updatedUser, function (err, doc) {\n    if (err) return next(err);\n    res.json(updatedUser);\n  });\n}); // Delete a user by id\n\nrouter.delete('/users/:id', (req, res, next) => {\n  User.findByIdAndRemove(req.params.id, function (err) {\n    if (err) return next(err);\n    res.json({\n      message: 'The user was successfully removed'\n    });\n  });\n}); // COMPANY ROUTES\n// Get all the companies from the database\n\nrouter.get('/company', (req, res, next) => {\n  Company.find().then(companies => res.json(companies));\n}); // Get a company by its id\n\nrouter.get('/company/:id', (req, res, next) => {\n  Company.findById(req.params.id, function (error, doc) {\n    if (error) return next(error);\n\n    if (!doc) {\n      const err = new Error('Company not found');\n      err.status = 404;\n      return next(err);\n    }\n\n    res.json(doc);\n  });\n}); // Add a new company to the database\n\nrouter.post('/company', upload.single('logoURL'), (req, res, next) => {\n  // Validate the required fields have been sent\n  if (req.body.name && req.body.email && req.body.CIF && req.body.country) {\n    let {\n      name,\n      CIF,\n      email,\n      website,\n      country,\n      street,\n      city,\n      zipcode,\n      socialUrls,\n      bio,\n      employees,\n      phone\n    } = req.body;\n    const newCompany = {\n      name,\n      CIF,\n      email,\n      website,\n      address: {\n        country,\n        street,\n        city,\n        zipcode\n      },\n      socialUrls,\n      bio,\n      employees,\n      phone,\n      registeredDate: Date.now()\n    };\n\n    if (req.file) {\n      let port = process.env.PORT || 3000;\n      newCompany.logoURL = `${req.protocol}://${req.hostname}/${req.file.path}`; // localhost development url\n      // newCompany.logoURL = `${req.protocol}://${req.hostname}:${port}/${req.file.path}`;\n    }\n\n    Company.create(newCompany, (err, doc) => {\n      if (err) return next(err);\n      return res.json(doc);\n    });\n  } else {\n    res.json({\n      error: 'Not all required data was sent'\n    });\n  }\n}); // Update a company info by its id\n\nrouter.put('/company/:id', upload.single('logoURL'), (req, res, next) => {\n  // Download original company info\n  Company.findById(req.params.id, (err, doc) => {\n    if (err) return next(err);\n\n    if (!doc) {\n      const error = new Error('The user your trying to modify does not exist.');\n      error.status = 404;\n      return next(error);\n    }\n\n    let _req$body = req.body,\n        {\n      country,\n      city,\n      street,\n      zipcode\n    } = _req$body,\n        values = _objectWithoutProperties(_req$body, [\"country\", \"city\", \"street\", \"zipcode\"]);\n\n    let newAddress = {\n      country: country !== undefined ? country : doc.address.country,\n      city: city !== undefined ? city : doc.address.city,\n      street: street !== undefined ? street : doc.address.street,\n      zipcode: zipcode !== undefined ? zipcode : doc.address.zipcode\n    };\n    let updatedCompany = Object.assign({}, values, {\n      address: Object.assign({}, newAddress)\n    });\n\n    if (req.file) {\n      let port = process.env.PORT || 3000;\n      updatedCompany.logoURL = `${req.protocol}://${req.hostname}/${req.file.path}`; // localhost development url\n      // updatedCompany.logoURL = `${req.protocol}://${req.hostname}:${port}/${req.file.path}`;\n    }\n\n    Company.findByIdAndUpdate(req.params.id, updatedCompany, (err, doc) => {\n      if (err) return next(err);\n      return res.json({\n        status: 'Success',\n        fieldsUpdated: updatedCompany\n      });\n    });\n  });\n}); // Delete a company profile by its id\n\nrouter.delete('/company/:id', (req, res, next) => {\n  Company.findByIdAndDelete(req.params.id, err => {\n    if (err) return next(err);\n    res.json({\n      message: 'Company profile succesfully deleted.'\n    });\n  });\n}); // Languages json\n\nrouter.get('/langs', (req, res, next) => {\n  res.json([{\n    name: 'lang-es',\n    label: 'Spanish',\n    value: 'spanish',\n    default: 0\n  }, {\n    name: 'lang-en',\n    label: 'English',\n    value: 'english',\n    default: 1\n  }, {\n    name: 'lang-it',\n    label: 'Italian',\n    value: 'italian',\n    default: 0\n  }, {\n    name: 'lang-de',\n    label: 'German',\n    value: 'german',\n    default: 0\n  }]);\n}); // Skills CRUD\n// Get all skills\n\nrouter.get('/skills', (req, res, next) => {\n  Skill.find().then(skills => res.json(skills));\n}); // Add a new skill\n\nrouter.post('/skills', (req, res, next) => {\n  let {\n    name,\n    value,\n    label\n  } = req.body;\n\n  if (name && value && label) {\n    let newSkill = {\n      name,\n      value,\n      label\n    };\n    Skill.create(newSkill, (err, doc) => {\n      if (err) return next(err);\n      return res.json(doc);\n    });\n  }\n}); // Delete a skill from db\n\nrouter.delete('/skills/:id', (req, res, next) => {\n  Skill.findByIdAndDelete(req.params.id, err => {\n    if (err) return next(err);\n    return res.json({\n      message: 'The skill was removed successfully'\n    });\n  });\n});\nmodule.exports = router;\n/*\nres.json([\n    {\n      name: 'html',\n      value: 'html',\n      label: 'HTML'\n    },\n    {\n      name: 'css',\n      value: 'css',\n      label: 'CSS'\n    },\n    {\n      name: 'sass-less',\n      value: 'sass-less',\n      label: 'SASS / LESS'\n    },\n    {\n      name: 'javascript',\n      value: 'javascript',\n      label: 'Javascript'\n    },\n    {\n      name: 'jquery',\n      value: 'jquery',\n      label: 'jQuery'\n    },\n    {\n      name: 'nodejs',\n      value: 'nodejs',\n      label: 'Nodejs'\n    },\n    {\n      name: 'expressjs',\n      value: 'expressjs',\n      label: 'Express'\n    },\n    {\n      name: 'mongodb',\n      value: 'mongodb',\n      label: 'MongoDB'\n    },\n    {\n      name: 'react',\n      value: 'react',\n      label: 'React js'\n    },\n    {\n      name: 'angular',\n      value: 'angular',\n      label: 'Angular js'\n    },\n    {\n      name: 'vuejs',\n      value: 'vuejs',\n      label: 'Vue js'\n    },\n    {\n      name: 'php',\n      value: 'php',\n      label: 'PHP'\n    }\n    */\n\n//# sourceURL=webpack:///./routes/api.js?");

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
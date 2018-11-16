import Company from "../models/company";
import Offer from "../models/offer";

// Get all the companies from the database
exports.getAll = (req, res, next) => {
  Company.find()
    .then(companies => {
      if (companies.length > 0) {
        return res.status(200).json(companies);
      } else {
        return res
          .status(404)
          .json({
            success: false,
            error: "Not companies found in the database"
          });
      }
    })
    .catch(err => next(err));
};

// Get a company by its id
exports.getById = (req, res, next) => {
  Company.findById(req.params.id)
    .populate("jobOffers")
    .then(company => res.json(company))
    .catch(err => next(err));
};

// Add a new company to the database
exports.add = (req, res, next) => {
  let {
    name,
    docType,
    docNumber,
    email,
    website,
    address,
    socialUrls,
    bio,
    employees,
    phone,
    jobOffers
  } = req.body;
  let defaultLogo = `${req.protocol}://${
    req.hostname
  }/uploads/default_avatar.png`;

  if (name && email && docType && docNumber && address.country) {
    const newCompany = {
      name,
      docType,
      docNumber,
      email,
      website,
      address,
      socialUrls,
      bio,
      employees,
      phone,
      jobOffers,
      logo: defaultLogo
    };

    Company.create(newCompany, (err, company) => {
      if (err) return next(err);
      return res.json(company);
    });
  } else {
    res.json({ error: "Not all required data was sent" });
  }
};

// Update a company info by its id
exports.update = (req, res, next) => {
  let updateData = { ...req.body };

  Company.findByIdAndUpdate(req.params.id, updateData).exec((err, company) => {
    if (err) return next(err);
    if (updateData.email) {
      Offer.update(
        { companyEmail: company.email },
        { companyEmail: updateData.email }
      )
        .then(() => res.json(company))
        .catch(err => next(err));
    }
    res.json(company);
  });
};

// Delete a company profile by its id
exports.delete = (req, res, next) => {
  Company.findByIdAndDelete(req.params.id, (err, company) => {
    if (err) return next(err);
    Offer.deleteMany({ companyEmail: company.email })
      .then(() => res.redirect("/api/companies"))
      .catch(err => next(err));
  });
};

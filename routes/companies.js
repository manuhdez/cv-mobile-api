import Company from '../models/company';


// Get all the companies from the database
exports.getAll = (req, res, next) => {
  Company
    .find()
    .then( companies => res.json(companies))
    .catch( err => next(err));
};

// Get a company by its id
exports.getById = (req, res, next) => {

  Company
    .findById(req.params.id)
    .populate('jobOffers')
    .then( company => res.json(company))
    .catch( err => next(err));
};

// Add a new company to the database
exports.add = (req, res, next) => {

  let { name, docType, docNumber, email, website, address, socialUrls, bio, employees, phone, jobOffers } = req.body;

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
      jobOffers
    }

    if (req.file && req.file !== undefined) {
      newCompany.logoURL = `${req.protocol}://${req.hostname}/${req.file.path}`;
    }

    Company
      .create(newCompany, (err, company) => {
        if (err) return next(err);
        return res.json(company);
      });

  } else {
    res.json({error: 'Not all required data was sent'});
  }

}

// Update a company info by its id
exports.update = (req, res, next) => {
  let updateData = { ...req.body };

  if (req.file) {
    updateData.logoURL = `${req.protocol}://${req.hostname}/${req.file.path}`;
  }

  Company
    .findByIdAndUpdate(req.params.id, updateData)
    .exec((err) => {
      if (err) return next(err);
      return res.redirect(`/api/companies/${req.params.id}`);
    })

};

// Delete a company profile by its id
exports.delete = (req, res, next) => {
  Company.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({message: 'Company profile succesfully deleted.'})
  });
};
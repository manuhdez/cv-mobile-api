import Offer from '../models/offer';
import Company from '../models/company';

// Get all offers
exports.get = (req, res) => {
  Offer
    .find()
    .then( offers => res.json(offers))
    .catch( err => next(err));
};

exports.getById = (req, res, next) => {
  Offer
    .findById(req.params.id)
    .then( (offer) => res.json(offer) )
    .catch( err => next(err));
};

exports.add = (req, res, next) => {
  let { title, position, vacancies, description, companyEmail } = req.body;

  const newOffer = {
    title,
    position,
    vacancies,
    description,
    companyEmail
  }

  Offer.create(newOffer, (err, offer) => {
    if (err) return next(err);
    // Push the offer into the correspondant company
    Company
      .findOneAndUpdate({email: companyEmail}, {$push: {jobOffers: offer._id}})
      .then( () => res.json(offer));
  });
};

exports.delete = (req, res, next) => {

  Offer.findByIdAndDelete(req.params.id, (err, offer) => {
    if (err) return next(err);
    Company
      .findOneAndUpdate({email: offer.companyEmail}, {$pull: {jobOffers: offer._id}})
      .then( (company) => res.redirect(`/api/companies/${company._id}`))
      .catch( err => next(err));
  });
};
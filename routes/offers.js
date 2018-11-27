import Offer from '../models/offer';
import Company from '../models/company';
import jwt from 'jsonwebtoken'

// Get all offers
exports.get = (req, res, next) => {
  jwt.verify(req.token, 'secret_key', (err, tokenData) => {
    if (err) return next(err);

    Offer
      .find()
      .then( offers => res.status(200).json(offers))
      .catch( err => next(err));
  });
};

exports.getById = (req, res, next) => {
  Offer
    .findById(req.params.id)
    .then( (offer) => res.json(offer) )
    .catch( err => next(err));
};

exports.add = (req, res, next) => {
  let { title,
    contractType,
    location,
    description,
    companyEmail,
    company,
    responsabilities,
    whatWeOffer,
    whatWeLookFor } = req.body;

  const newOffer = {
    companyEmail,
    company,
    title,
    contractType,
    location,
    description,
    responsabilities,
    whatWeOffer,
    whatWeLookFor
  }

  // Check if the email sent belong to an existing company
  Company
    .find({email: companyEmail})
    .then( doc => {
      if (doc.length === 0) return res.json({message: 'Please use an existing company email'});

      Offer.create(newOffer, (err, offer) => {
        if (err) return next(err);
        if (!offer) {
          const error = new Error('Something went wrong.');
          error.status(500);
          return next(error);
        }

        Company
          .update({email: companyEmail}, {$push: {jobOffers: offer._id}})
          .then(() => res.json(offer))
          .catch( err => next(err));
      });
    })
    .catch( err => next(err));
};

exports.delete = (req, res, next) => {
  Offer.findByIdAndDelete(req.params.id, (err, offer) => {
    if (err) return next(err);
    Company
      .findOneAndUpdate({email: offer.companyEmail}, {$pull: {jobOffers: offer._id}})
      .then(() => res.status(200).json({message: 'Offer successfuly deleted'}))
      .catch( err => next(err));
  });
};
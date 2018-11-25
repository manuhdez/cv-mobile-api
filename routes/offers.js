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
  let { title,
    contractType,
    location,
    description,
    companyEmail,
    responsabilities,
    whatWeOffer,
    whatWeLookFor } = req.body;

  const newOffer = {
    companyEmail,
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
      console.log('doc: ', doc.length);
      if (doc.length === 0) return res.json({message: 'Please use an existing company email'});

      Offer.create(newOffer, (err, offer) => {
        if (err) return next(err);
        Company
          .findOneAndUpdate({email: companyEmail}, {$push: {jobOffers: offer._id}})
          .then((comp) => {
            Offer
              .findByIdAndUpdate(doc._id, {company: comp.name}, {new: true})
              .then((updatedOffer) => res.json(updatedOffer))
              .catch(err => next(err));
          })
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
      .then( (company) => res.redirect(`/api/companies/${company._id}`))
      .catch( err => next(err));
  });
};
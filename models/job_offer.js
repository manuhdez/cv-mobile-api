import mongoose from 'mongoose';

const JobOfferSchema = new mongoose.Schema({
  // title
  // position
  // vacancies
  // description
  // publicationDate
});

const JobOffer = mongoose.model('JobOffer', JobOfferSchema);

export default JobOffer;
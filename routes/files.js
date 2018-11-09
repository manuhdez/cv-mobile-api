import File from '../models/file';
import User from '../models/user';
import Company from '../models/company';

exports.uploadFile = (req, res, next) => {

  let { type, id } = req.params;
  let newFile = { model: id, type }

  if (req.file) {
    newFile.url = `${req.protocol}://${req.hostname}/${req.file.path}`;
  }

  File
    .findByIdAndDelete(id)
    .then( () => {

    File.create(newFile, (err, doc) => {
      if (err) return next(err);
      if (type === 'user') {

        User.findByIdAndUpdate(id, {avatar: doc.url}, {new: true})
        .exec( (err, user) => {
          if (err) return next(err);
          res.json(user);
        });

      } else if (type === 'company') {

        Company.findByIdAndUpdate(id, {logo: doc.url}, {new: true})
        .exec( (err, company) => {
          if (err) return next(err);
          res.json(company);
        });
      }
    });
  }).catch( err => res.json(err));
}

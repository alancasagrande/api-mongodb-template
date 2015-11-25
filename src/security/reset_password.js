import PasswordRequestToken from './password_request_token';


export default function (req, res, next) {
  PasswordRequestToken
    .findOne({ token: req.body.token })
    .populate('user')
    .populate('distributor')
    .populate('admin')
    .then(function (token) {
      if (!token) { return res.status(404).end(); }

      var user = token.user || token.distributor || token.admin;
      user.set('password', req.body.password);
      return user.save().then(() => {
        token.remove();
        res.status(200).end();
      });
    })
    .then(null, (err) => next(err, req, res));
}

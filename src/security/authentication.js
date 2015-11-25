import express from 'express';
import passport from 'passport';
import PasswordStrategy from './password_strategy';
import RememberMeStrategy from './remember_me_strategy';
import resetPassword from './reset_password';
import RememberMeToken from './remember_me_token';
import randomString from '../shared/random_string';


passport.use('remember-me', new RememberMeStrategy());
passport.use('password', new PasswordStrategy());

var authentication = express();

authentication.post('/reset_password', resetPassword);

authentication.get('/logout', function (req, res) {
  RememberMeToken.remove({ token: req.headers.authorization }).exec();
  req.logout();
  res.status(200).end();
});

authentication.use(passport.initialize());

authentication.use(function authenticate (req, res, next) {
  if (req.isAuthenticated() && !req.query.password) { return next(); }
  passport.authenticate(['remember-me', 'password'], { session: false })(req, res, function (err) {
    if (err) { return res.status(401).end(); }
    next();
  });
});

authentication.get('/login', function (req, res, next) {
  var authorization = req.headers.authorization;

  if (authorization) { RememberMeToken.remove({ token: authorization }).exec(); }

  generateToken(req.user).then((t) => res.json(t.token), (err) => next(err, req, res));
});


function generateToken (user) {
  return RememberMeToken.create({ token: randomString(64), user: user._id });
}


export default authentication;

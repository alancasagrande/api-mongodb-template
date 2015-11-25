import {check} from './password_hash';
import User from '../user/user';
import passport from 'passport-strategy';


class PasswordStrategy extends passport.Strategy {
  authenticate (req) {
    var self = this;

    var username = req.query.username;

    return User.findOne({ username: username }).select('+password').then(function (user) {
      if (user && check(req.query.password, user.password)) { return self.success(user); }
      return self.fail();
    }).then(null, function (err) {
      console.error(err.stack || err.message || err);
      self.error(err);
    });
  }
}


export default PasswordStrategy;

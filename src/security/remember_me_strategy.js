import RememberMeToken from './remember_me_token';
import passport from 'passport-strategy';
import util from 'util';


var Strategy = function () {};

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function (req) {
  var self = this;

  RememberMeToken
    .findOne({ token: req.headers.authorization || req.query.authorization })
    .populate('user')
    .then(function (token) {
      if (token) { return self.success(token.user); }
      return self.fail();
    });
};

export default Strategy;

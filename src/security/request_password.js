import PasswordRequestToken from '../security/password_request_token';
import randomString from '../shared/random_string';
import environment from '../environment';
var mailer = environment.mailer;


export default function (user) {
  return PasswordRequestToken.create({ token: randomString(64), user: user._id })
    .then((token) => sendEmail(user, token));
}


function sendEmail (user, token) {
  var message = 'Open this link to reset your password: ' + environment.config.resetPasswordUrl + '?token=' + token.token;

  mailer.sendMail({
    from: 'Admin <example@api-mongodb-template>',
    to: user.email,
    subject: 'Reset password',
    text: message
  }, function (err, info) {
    console.log('reset password', err, info);
  });
}

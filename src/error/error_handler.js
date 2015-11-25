import _ from 'lodash';
import environment from '../environment';


/* eslint no-unused-vars:0 */
// The middleware is not called if the 'next' argument is not declared
export default function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    var errors = {};
    _.forEach(err.errors, (e, attr) => errors[attr] = { kind: e.kind, value: e.value });
    return res.status(422).send({ errors: errors });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(422).send({ duplicated: true });
  }

  console.error(err.stack || err.message || err);
  res.status(500).end();
}

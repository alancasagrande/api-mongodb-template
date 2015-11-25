import supertest from 'supertest';
import _ from 'lodash';

export default function (api, username, password) {
  var functions = {};

  _.each(supertest(api), function (originalFunction, name, context) {
    functions[name] = function (url) {
      return originalFunction.call(context, url).query({
        username: username || 'root',
        password: password || username || 'root'
      });
    };
  });

  return functions;
}

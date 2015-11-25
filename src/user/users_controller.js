import {RestfulActionBuilder} from '../shared/restful_action_builder';
import User from './user';
import UserPolicy from './users_policy';
import express from 'express';
import requestPassword from  '../security/request_password';


var publicApi = express();

publicApi.get('/request_password', function (req, res, next) {
  User.findOne({ email: req.query.username }).then((user) => {
    if (!user) { return res.status(404).end(); }
    return requestPassword(user).then(() => res.status(200).end());
  }, (err) => next(err, req, res));
});

publicApi.post('/signup', function (req, res, next) {
  User.create(req.body).then(() => res.status(200).end(), (err) => next(err, req, res));
});

publicApi.get('/available', function (req, res, next) {
  User.count({ email: req.query.email }).then((count) => res.send(!count), (err) => next(err, req, res));
});


var privateApi = express();

privateApi.use(new RestfulActionBuilder(User, { Policy: UserPolicy }).build());


export {
  privateApi as privateApi,
  publicApi as publicApi
};

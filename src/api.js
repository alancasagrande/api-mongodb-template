import express from 'express';
import bodyParser from 'body-parser';
import * as crossDomain from './security/cross_domain';
import errorHandler from './error/error_handler';
import authentication from './security/authentication';
import * as users from './user/users_controller';


var api = express();

api.use(bodyParser.json());
api.use(crossDomain.allow);
api.options('*', crossDomain.handleOptions);
api.use('/users', users.publicApi);
api.use(authentication);
api.use('/users', users.privateApi);
api.use(errorHandler);

export default api;

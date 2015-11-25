import express from 'express';
import DefaultPolicy from '../security/default_policy';
import _ from 'lodash';


/*
 * Helper class to build REST actions for a given Model (resource).
 *
 * All actions are validated against a Policy. If a Policy is not provided, the
 * DefaultPolicy is used.
 *
 * If an action from the Policy is rejected, HTTP 401 is returned (Unauthorized).
 *
 * Policy calls are wrapped into a Promise as they may or may not involve
 * async operations.
 *
 * All uncaught errors after Policy validations are handled by the next
 * middleware.
 */
export class RestfulActionBuilder {
  constructor (Model, opts) {
    if (!opts) { opts = {}; }

    this.Model = Model;
    this.Policy = opts.Policy;
  }

  build () {
    var api = express();
    api.get('/', this.list());
    api.post('/', this.create());
    api.get('/:id', this.get());
    api.patch('/:id', this.update());
    api.delete('/:id', this.delete());
    return api;
  }

  list () {
    return (req, res, next) => {
      var policy = this.policy(req);

      return authorize(policy.canList(), res, () => {
        var projection = policy.listProjection();
        var query = this.Model.find({}, projection);

        return promise(policy.scope(query))
          .then((scope) => paginate(req, scope.query))
          .then((result) => policy.beforeSendList(req, result))
          .then((result) => res.json(result))
          .then(null, (err) => next(err, req, res));
      });
    };
  }

  create () {
    return (req, res, next) => {
      var policy = this.policy(req);

      return authorize(policy.canCreate(), res, () => {
        return promise(policy.sanitize())
          .then((data) => this.Model.create(data))
          .then((model) => policy.beforeSendModel(req, model))
          .then((data) => res.json(data), (err) => next(err, req, res));
      });
    };
  }

  get () {
    return (req, res) => {
      return this.find(req, res, (model) => {
        var policy = this.policy(req, model);

        return authorize(policy.canGet(), res, () => {
          return promise(policy.beforeSendModel(req, model)).then((data) => res.json(data));
        });
      });
    };
  }

  update () {
    return (req, res, next) => {
      return this.find(req, res, (model) => {
        var policy = this.policy(req, model);

        return authorize(policy.canUpdate(), res, () => {
          return promise(policy.sanitize())
            .then((data) => model.set(data))
            .then(() => model.save())
            .then(() => res.send(policy.sendUpdatedData() ? model : true), (err) => next(err, req, res));
        });
      });
    };
  }

  delete () {
    return (req, res, next) => {
      return this.find(req, res, (model) => {
        var policy = this.policy(req, model);

        return authorize(policy.canDelete(), res, () => {
          return model.remove().then(() => res.send(true), (err) => next(err, req, res));
        });
      });
    };
  }

  policy (req, model) {
    var data = _.isEmpty(req.body) ? req.query : req.body;
    return this.Policy ?
      new this.Policy(req.user, data, model) :
      new DefaultPolicy(this.Model.modelName, req.user, req.body || req.query, model);
  }

  find (req, res, fn) {
    var id = req.params.id === 'current' ? req.user._id : req.params.id;
    return this.Model.findById(id).then((model) => {
      if (model) { return fn(model); }
      res.status(404).end();
    }, () => res.status(404).end());
  }
}

/* Wraps the Policy call into a Promise and return 401 if it is rejected. */
function authorize (policyCall, res, fn) {
  return promise(policyCall).then(fn, () => res.status(401).end());
}

/* Wraps value into a Promise. False is considered a rejected Promise. */
function promise (value) {
  if (value instanceof Promise) { return value; }
  if (value === false) { return Promise.reject(); }
  return Promise.resolve(value);
}

/* Paginates query according to request params. */
function paginate (req, query) {
  if (req.query.page) {
    var page = parseInt(req.query.page);
    var perPage = parseInt(req.query.per_page) || 20;
    query.limit(perPage).skip((page - 1) * perPage);
  }
  return query;
}

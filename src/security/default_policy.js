export default class DefaultPolicy {

  /**
   * @param resourceName - Model name (e.g User)
   * @param user - User that will have the permission checked
   * @param (optional) data - Incoming data from the client
   * @param (optional) model - Original model involved on the request
   */
  constructor (resourceName, user, data, model) {
    this.resourceName = resourceName;
    this.user = user;
    this.data = data;
    this.model = model;
  }

  canCreate () {
    return false;
  }

  canList () {
    return false;
  }

  canGet () {
    return false;
  }

  canUpdate () {
    return false;
  }

  canDelete () {
    return false;
  }

  sendUpdatedData () {
    return false;
  }

  sanitize () {
    return this.data;
  }

  scope (query) {
    // Need to wrap the query in a object as the .then() method now executes it
    // See https://github.com/Automattic/mongoose/issues/2995
    return { query: query };
  }

  modelProjection () {
    return {};
  }

  listProjection () {
    return {};
  }

  beforeSendModel (req, model) {
    return model;
  }

  beforeSendList (req, list) {
    return list;
  }
}

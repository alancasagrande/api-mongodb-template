import DefaultPolicy from '../security/default_policy';


export default class extends DefaultPolicy {

  constructor (user, data, model) {
    super('User', user, data, model);
  }

  canGet () {
    return this.user.id === this.model.id;
  }

  canUpdate () {
    return this.user.id === this.model.id;
  }

  sendUpdatedData () {
    return true;
  }
}

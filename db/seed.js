import '../src/environment';
import User from '../src/user/user';


function createIfEmpty (Model, criteria, data) {
  return Model.findOne(criteria).exec().then(function (result) {
    if (result) { return result; }
    return Model.create(data);
  });
}


export default function () {
  return createIfEmpty(User, { username: 'root' }, { username: 'root', name: 'root', password: 'root'});
}

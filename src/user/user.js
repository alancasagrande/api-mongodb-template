import mongoose from 'mongoose';
import {hash} from '../security/password_hash';


var schema = mongoose.Schema({
  username: { type: String, unique: true, index: true, required: true },
  name: { type: String, required: true },
  password: { type: String, select: false, required: true }
});

schema.path('password').set(function (password) {
  return password ? hash(password) : this.password;
});

export default mongoose.model('User', schema);

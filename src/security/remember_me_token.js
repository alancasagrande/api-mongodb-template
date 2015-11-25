import mongoose from 'mongoose';
import '../user/user';


var schema = mongoose.Schema({
  token: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('RememberMeToken', schema);

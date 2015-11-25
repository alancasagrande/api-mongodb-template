import mongoose from 'mongoose';
import environment from '../src/environment';
import seed from '../db/seed';


// Need to clear mongoose models so it does not conflict with mocha watch (https://github.com/Automattic/mongoose/issues/1251)
mongoose.models = {};
mongoose.modelSchemas = {};


before(function (done) {
  // We don't want to accidentaly run tests in production and mess with the database
  if (environment.name === 'test') { return done(); }
  done('Specs must run in test environment.');
});


beforeEach(function (done) {
  mongoose.connection.db.dropDatabase(function (err) {
    if (err) { return done(err); }
    seed().then(() => done(), done);
  });
});


after(function () {
  mongoose.disconnect();
});

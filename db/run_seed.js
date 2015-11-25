require('babel-core/register');

var seed = require('./seed').default;

seed().then(function () {
  console.log('Database seeded');
  process.exit(0);
}, function (err) {
  console.error(err);
  process.exit(1);
});

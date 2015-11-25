require('babel-core/register');

require('./api').default.listen(3000);

console.log('API started at port 3000');

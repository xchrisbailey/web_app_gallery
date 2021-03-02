const app = require('./app');

const server = app.listen(app.get('port'), function () {
  console.log(`listening on port ${app.get('port')}`);
});

module.exports = server;

const app = require('./app');
const db = require('./utils/db');

// connect to mongodb
db.connect()
  .then(() => {
    console.log('🥭 mongo connected');
  })
  .catch((e) => {
    console.log(e);
  });

const server = app.listen(app.get('port'), function () {
  console.log(`🚀 listening on port ${app.get('port')}`);
});

module.exports = server;

const app = require('./app');
const db = require('./utils/db');

const start = async () => {
  try {
    await db.connect();
    console.log('🥭 mongo connected');
    app.listen(app.get('port'), function () {
      console.log(`🚀 listening on port ${app.get('port')}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

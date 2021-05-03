require('dotenv').config();

const db = require('../src/utils/db');
const User = require('../src/user/user.model');
const WebApp = require('../src/webapp/webapp.model');

db.connect()
  .then(() => {
    console.log('🥭 mongo connected');
  })
  .catch((e) => {
    console.log(e);
  });

User.deleteMany({})
  .then(() => console.log('User collection cleared'))
  .catch((e) => console.error(e));

WebApp.deleteMany({})
  .then(() => {
    console.log('WebApp collection cleared');
    process.exit(1);
  })
  .catch((e) => console.error(e));

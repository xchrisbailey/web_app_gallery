const moment = require('moment');

// stores provided JWT in httpOnly cookie
const authCookie = (res, token) => {
  const exp = moment().add(5, 'days').toDate();
  res.cookie('token', token, {
    expires: new Date(exp), // set cookie expiration to 5 days
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true, // not accessible by JS
  });
};

module.exports = authCookie;

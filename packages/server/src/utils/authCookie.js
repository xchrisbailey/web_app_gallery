// stores provided JWT in httpOnly cookie
const authCookie = (res, token) => {
  res.cookie('token', token, {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // set cookie expiration to 1 day
    secure: false, // true if https
    httpOnly: true, // not accessible by JS
  });
};

module.exports = authCookie;

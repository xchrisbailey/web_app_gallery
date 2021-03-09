const jwt = require('jsonwebtoken');
const User = require('../user/user.model');

const auth = async (req, res, next) => {
  const token = req.cookies.token || null;
  try {
    if (!token) throw new Error()
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Must be authenticate' });
  }
};

module.exports = auth;

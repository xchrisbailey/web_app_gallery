const userService = require('./user.service');
const authCookie = require('../utils/authCookie');

const createUser = async (req, res) => {
  try {
    const { token, user } = await userService.createUser(req.body);
    authCookie(res, token); // set auth cookie
    res.status(201).json({ status: 'ok', data: user });
  } catch (e) {
    res.status(400).json({ status: 'error', data: { message: e.message } });
  }
};

const loginUser = async (req, res) => {
  try {
    const { token, user } = await userService.loginUser(
      req.body.email,
      req.body.password,
    );
    authCookie(res, token);
    res.status(200).json({ status: 'ok', data: user });
  } catch (e) {
    res.status(400).json({ status: 'error', data: { message: e.message } });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ status: 'ok' });
  } catch (e) {
    res.status(400).json({ status: 'error', data: { message: e.message } });
  }
};

const getProfile = (req, res) => {
  res.status(200).json({
    status: 'ok',
    data: req.user,
  });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getProfile,
};

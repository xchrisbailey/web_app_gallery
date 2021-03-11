const userService = require('./user.service');
const authCookie = require('../utils/authCookie');

const r = require('../utils/resHelpers.js');

const createUser = async (req, res) => {
  try {
    const { token, user } = await userService.create(req.body);
    authCookie(res, token); // set auth cookie
    r.data(res, 201, user);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userService.login(req.body.email, req.body.password);
    authCookie(res, await user.genAuthToken());
    r.data(res, 200, user);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie('token');
    r.data(res, 200, {});
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const getProfile = (req, res) => {
  res.status(200).json({
    status: 'ok',
    data: req.user,
  });
};

const deleteUser = async (req, res) => {
  try {
    (await userService.remove(req.user._id)) &&
      r.data(res, 200, { message: 'Account successfully removed' });
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.update(req.user._id, req.body);
    r.data(res, 201, updatedUser);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    await userService.updatePass(req.user._id, req.body.newPassword);
    r.data(res, 200, { message: 'Password successfully updated' });
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

module.exports = {
  getProfile,
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
  updateUser,
  updatePassword,
};

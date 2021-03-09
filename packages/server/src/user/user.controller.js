const userService = require('./user.service');
const authCookie = require('../utils/authCookie')

const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);
    authCookie(res, data.token)
    res.status(201).json(data.user)
  } catch (e) {
    res.status(400).json(e);
  }
};

const loginUser = async (req, res) => {
  try {
    const data = await userService.loginUser(req.body.email, req.body.password);
    authCookie(res, data.token)
    res.status(200).json(data.user);
  } catch (e) {
    console.log(e)
    res.status(400).json(e);
  }
};

module.exports = {
  createUser,
  loginUser,
};

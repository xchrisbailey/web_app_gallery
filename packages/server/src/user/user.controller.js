const userService = require('./user.service')

const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body)
    res.status(201).json(data)
  } catch (e) {
    res.status(400).json(e)
  }
}

const loginUser = async (req, res) => {
  try {
    const data = await userService.loginUser(req.body.email, req.body.password)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).json(e)
  }
}

module.exports = {
  createUser,
  loginUser
}

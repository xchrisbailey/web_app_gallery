const User = require('./user.model')

const createUser = async (data) => {
  const user = new User(req.body)
  await user.save()
  const token = await user.genAuthToken()
  return {
    user,
    token
  }
}

const loginUser = async (email, password) => {
  const user = await User.findByCred(email, password) // authorize and get requested user
  if (!user) throw new Error('User not found')
  const token = await user.genAuthToken() //generate new jwt
  return {
    user,
    token
  }
}

module.exports = {
  createUser,
  loginUser
}

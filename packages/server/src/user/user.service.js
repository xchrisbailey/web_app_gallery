const User = require('./user.model');

const create = async (data) => {
  const user = new User(data);
  if (!user) throw new Error('Account creation failed')
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findByCred(email, password); // authorize and get requested user
  if (!user) throw new Error('User not found');
  return user;
};

const remove = async (user) => {
  const res = await user.remove();
  if (res) return true;
  throw new Error('User could not be removed');
};

const update = async (user, updates) => {
  const allowedUpdates = ['firstName', 'lastName', 'email']; // user updatable fields
  const validUpdates = {};

  // sanitize incoming updates to those allowed by system
  for (k in updates) {
    if (allowedUpdates.includes(k)) validUpdates[k] = updates[k];
  }

  if (!Object.keys(validUpdates).length)
    throw new Error('No valid updates provided');

  for (u in validUpdates) user[u] = validUpdates[u]; // assign new fields to user object
  await user.save();
  return user;
};

const updatePass = async (user, newPassword) => {
  user.password = newPassword;
  await user.save();
};

module.exports = {
  create,
  login,
  remove,
  update,
  updatePass,
};

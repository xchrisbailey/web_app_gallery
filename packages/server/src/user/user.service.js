const User = require('./user.model');

const create = async (data) => {
  const user = new User(data);
  await user.save();
  const token = await user.genAuthToken();
  return {
    token,
    user,
  };
};

const login = async (email, password) => {
  const user = await User.findByCred(email, password); // authorize and get requested user
  if (!user) throw new Error('User not found');
  return user;
};

const remove = async (uid) => {
  const user = await User.findById(uid);
  if (!user) throw new Error('User could not be found');
  const res = await user.remove();
  if (res) return true;
  throw new Error('User could not be removed');
};

const update = async (uid, updates) => {
  const allowedUpdates = ['firstName', 'lastName', 'email'];
  const validUpdates = {};
  for (k in updates) {
    if (allowedUpdates.includes(k)) validUpdates[k] = updates[k];
  }
  if (!Object.keys(validUpdates).length) throw new Error('No valid updates provided');

  const data = await User.findByIdAndUpdate(uid, { ...validUpdates }, { new: true });
  return data;
};

module.exports = {
  create,
  login,
  remove,
  update,
};

const User = require('./user.model');

const createUser = async (data) => {
  const user = new User(data);
  await user.save();
  const token = await user.genAuthToken();
  return {
    token,
    user,
  };
};

const loginUser = async (email, password) => {
  const user = await User.findByCred(email, password); // authorize and get requested user
  if (!user) throw new Error('User not found');
  const token = await user.genAuthToken(); //generate new jwt
  return {
    token,
    user,
  };
};

const deleteUser = async (uid) => {
  const user = await User.findById(uid);
  if (!user) throw new Error('User could not be found');
  await user.delete();
  return true;
};

module.exports = {
  createUser,
  loginUser,
  deleteUser,
};

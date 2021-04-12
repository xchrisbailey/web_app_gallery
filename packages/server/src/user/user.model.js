const mongoose = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// sanitize sensitive info before returning json
userSchema.methods.toJSON = function () {
  const user = this;
  const uo = user.toObject();

  delete uo.password;
  delete uo.createdAt;
  delete uo.updatedAt;
  delete uo.__v;

  return uo;
};

// generate new jwt
userSchema.methods.genAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });
  return token;
};

// find user by email and check for valid password
userSchema.statics.findByCred = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email not found');

  const passwordMatch = await argon2.verify(user.password, password);
  if (!passwordMatch) throw new Error('Invalid login credentials');

  return user;
};

// hash user password
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await argon2.hash(user.password);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

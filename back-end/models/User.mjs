
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isAlphanumeric,
      message: props => `${props.value} is not a valid username. It should be alphanumeric.`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} is not a valid email address.`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        // Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
      },
      message: props => `${props.value} is not a valid password. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.`,
    },
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'administrator', 'receptionist'],
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

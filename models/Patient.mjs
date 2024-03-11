// src/models/patientModel.mjs
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const patientSchema = new mongoose.Schema({
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
});

patientSchema.pre('save', async function (next) {
  const patient = this;
  if (patient.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(patient.password, salt);
  }
  next();
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;

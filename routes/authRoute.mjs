// src/routes/authRoutes.mjs
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Patient, Doctor, Administrator, Receptionist } from '../db/conn.mjs';
import validator from 'validator';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    let User;

    // Choose the appropriate model based on the role
    switch (role) {
      case 'patient':
        User = Patient;
        break;
      case 'doctor':
        User = Doctor;
        break;
      case 'administrator':
        User = Administrator;
        break;
      case 'receptionist':
        User = Receptionist;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: `User already registered with this ${existingUser.role}` });
    }

    const newUser = new User({ username, email, password , role});
    await newUser.save();
    res.status(201).json({ message: `User registered successfully as ${role}` });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let User;

    // Choose the appropriate model based on the role
    switch (role) {
      case 'patient':
        User = Patient;
        break;
      case 'doctor':
        User = Doctor;
        break;
      case 'administrator':
        User = Administrator;
        break;
      case 'receptionist':
        User = Receptionist;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token using environment variable
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export default router;

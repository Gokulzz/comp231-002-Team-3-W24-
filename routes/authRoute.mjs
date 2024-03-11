// src/routes/authRoutes.mjs
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Patient from '../models/Patient.mjs';
import validator from 'validator';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const existingPatient = await Patient.findOne({ $or: [{ username }, { email }] });

    if (existingPatient) {
      return res.status(400).json({ message: 'Patient already registered with this username or email' });
    }

    const newPatient = new Patient({ username, email, password });
    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, patient.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token using environment variable
    const token = jwt.sign({ patientId: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export default router;

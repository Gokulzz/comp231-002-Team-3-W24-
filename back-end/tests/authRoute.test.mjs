// authRoute.test.mjs

import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose'; // Import mongoose
import authRouter from '../routes/authRoute.mjs';

// Import your MongoDB connection functions and models
import { connectToMongoDB } from '../db/conn.mjs';
import UserModel from '../models/User.mjs';

// Initialize an express app and use the authRouter
const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('Authentication API Endpoints', () => {
  // Connect to MongoDB before running tests
  beforeAll(async () => {
    await connectToMongoDB(); // Connect to your MongoDB database
  });

  // Clear the database after all tests
  afterAll(async () => {
    await UserModel.deleteMany(); // Clear the database after all tests
    await mongoose.connection.close(); // Close the MongoDB connection
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        username: 'testUser12',
        email: 'test20@gmail.com',
        password: 'Password123!@#', // Ensure the password meets the validation criteria
        role: 'patient',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully as patient');
    });
    it('should register a new doctor', async () => {
      const userData = {
        username: 'doctorUser12',
        email: 'doctor@gmail.com',
        password: 'DoctorPass123!@#', // Ensure the password meets the validation criteria
        role: 'doctor',
      };
  
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully as doctor');
    });
  
    it('should register a new administrator', async () => {
      const userData = {
        username: 'adminUser12',
        email: 'admin@gmail.com',
        password: 'AdminPass123!@#', // Ensure the password meets the validation criteria
        role: 'administrator',
      };
  
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully as administrator');
    });
  

    // Add more test cases for different scenarios (e.g., invalid data, existing user, etc.)
  });

  describe('POST /api/auth/login', () => {
    it('should log in a user with valid credentials', async () => {
      const userData = {
        email: 'test20@gmail.com',
        password: 'Password123!@#',
        role: 'patient',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('userId');
    });

    // Add more test cases for different scenarios (e.g., invalid credentials, non-existing user, etc.)
  });
});

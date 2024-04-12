import request from 'supertest';
import express from 'express';
import { connectToMongoDB } from '../db/conn.mjs'; // Import your MongoDB connection function
import appointmentRouter from '../routes/appointmentRoute.mjs'; // Import your appointmentRouter
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

// Initialize an express app and use the appointmentRouter
const app = express();
app.use(express.json());
app.use('/api/appointments', appointmentRouter);

describe('GET /api/appointments', () => {
  // Connect to MongoDB before running tests
  beforeAll(async () => {
    await connectToMongoDB();
  });

  it('should get all appointments', async () => {
    // Manually create a token for an authenticated user (replace with actual user data if needed)
    const userId = 'userId123';
    const token = jwt.sign({ userId, role: 'patient' }, 'doctorappointmentwebproject'); // Replace 'doctorappointmentwebproject' with your actual secret key

    // Make a request to the endpoint with the token in the Authorization header
    const response = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // Assertions
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    // Add more specific assertions based on your response data
  });

  // Add more test cases for different scenarios (e.g., filtering appointments, unauthorized access, etc.)

  // Clear the database after all tests

});

// src/app.mjs
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.mjs';
import { connectToMongoDB } from './db/conn.mjs';

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    // Connected to MongoDB, start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/api/auth', authRoutes);

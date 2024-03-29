// src/app.mjs
import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.mjs";
import appointmentRoute from "./routes/appointmentRoute.mjs";
import receptionistRoute from "./routes/receptionistRoute.mjs"; 
import doctorRoute from "./routes/doctorRoute.mjs";

import { connectToMongoDB } from "./db/conn.mjs";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    // Connected to MongoDB, start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/auth", authRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/receptionist", receptionistRoute);
app.use("/api/doctor", doctorRoute);

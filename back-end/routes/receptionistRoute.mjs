// routes/receptionistRoute.mjs

import express from "express";
import Receptionist from "../models/receptionist.mjs";
import { verifyToken } from "./authRoute.mjs";
import appointmentModel from "../models/appointment.mjs";

const router = express.Router();
const receptionist = new Receptionist();

// Middleware to verify token
router.use(verifyToken, (req, res, next) => {
  if (req.user.role !== "receptionist") {
    return res.status(403).json({ message: "Forbidden: Access denied" });
  }
  next();
});

// Get all appointment requests
router.get("/requests", async (req, res) => {
  try {
    const appointmentRequests = await receptionist.getAppointmentRequests();
    res.status(200).json(appointmentRequests);
  } catch (error) {
    console.error("Error fetching appointment requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Find Apointemnt
router.get("/requests/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const appointment = await appointmentModel.findById(id);
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Handle appointment Update
router.put("/requests/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;

    const result = await appointmentModel.findByIdAndUpdate(appointmentId, {
      status: status,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error handling appointment request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Handle appointment request (accept, reject)
router.put("/requests/action/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { action } = req.body;

    const result = await receptionist.handleAppointment(appointmentId, action);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error("Error handling appointment request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

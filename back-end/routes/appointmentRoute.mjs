// appointmentRoute.mjs

import express from "express";
import appointmentModel from "../models/appointment.mjs";
import { verifyToken } from "./authRoute.mjs";

const router = express.Router();

// Create a new appointment
router.post("/", verifyToken, async (req, res) => {
  try {
    // The user is authenticated, proceed with appointment creation
    const { userId, doctorId, doctorInfo, userInfo, date, time } = req.body;

    const appointment = new appointmentModel({
      userId,
      doctorId,
      doctorInfo,
      userInfo,
      date,
      time,
    });

    await appointment.save();
    res
      .status(201)
      .json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await appointmentModel.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const appointment = await appointmentModel.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update appointment status
router.put("/:id/status", async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointment.save();

    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

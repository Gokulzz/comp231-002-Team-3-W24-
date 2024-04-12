// appointmentRoute.mjs

import express from "express";
import appointmentModel from "../models/appointment.mjs";
import { verifyToken } from "./authRoute.mjs";
import doctorModel from "../models/doctor.mjs";
import userModel from "../models/User.mjs";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(verifyToken, (req, res, next) => {
  if (req.user.role !== "patient") {
    return res.status(403).json({ message: "Forbidden: Access denied" });
  }
  next();
});

// Create a new appointment
router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { doctorUsername, userInfo, date, time } = req.body;

    // Find the user associated with the doctor's username from the userModel
    const doctorUser = await userModel.findOne({ username: doctorUsername, role: 'doctor' }); // Ensure the user is a doctor
    if (!doctorUser) {
      return res.status(404).json({ message: "Doctor user not found" });
    }
    console.log("doctorUser:", doctorUser); 

    // Get the associated doctor's information from the doctorModel using the doctorId from the user document
    const doctor = await doctorModel.findOne({ doctorId: doctorUser._id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    console.log("doctor:", doctor); 

    // Extract doctorId, speciality, and experience from the fetched doctor
    const { doctorId, speciality, experience } = doctor;

    // Construct the doctorInfo object with speciality included
    const doctorInfo = JSON.stringify({
      speciality,
      experience
    });

    // Create the appointment
    const appointment = new appointmentModel({
      userId,
      doctorId,
      doctorInfo,
      userInfo,
      date,
      time,
    });

    // Save the appointment
    await appointment.save();

    // Send the response
    res.status(201).json({ message: "Appointment created successfully", appointment });

  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//Get the appointment for specific user
router.get("/patientAppointment", verifyToken, async (req, res) => {
  try {
    // Get the user ID from the token
    const userId = req.user.userId;

    // Find appointments for the logged-in user (patient)
    const appointments = await appointmentModel.find({ userId });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
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

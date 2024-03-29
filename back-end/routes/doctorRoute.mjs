// doctorRoute.mjs
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import DoctorInfo  from "../models/doctor.mjs";
import UserModel from "../models/User.mjs";

const router = express.Router();

// Role-based authentication middleware

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (decoded.role !== "administrator") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  });
};


// Update endpoint for doctor info
//only system administrator can add this role....
router.post("/:id/update-info", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { speciality, experience } = req.body;

    // Check if the doctor exists
    const doctor = await UserModel.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if doctor info exists
    let doctorInfo = await DoctorInfo.findOne({ doctorId: id });

    // If doctor info exists, update it. Otherwise, create a new entry
    if (doctorInfo) {
      doctorInfo.speciality = speciality;
      doctorInfo.experience = experience;
      await doctorInfo.save();
    } else {
      doctorInfo = new DoctorInfo({ doctorId: id, speciality, experience });
      await doctorInfo.save();
    }

    res.json({ message: "Doctor info updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/search", async (req, res) => {
    try {
      const { name, username } = req.query;
  
      if (!name && !username) {
        return res.status(400).json({ message: "Please provide either name or username as a query parameter" });
      }
  
      let query = {};
  
      if (name) {
        query = { ...query, name: { $regex: new RegExp(name, "i") } };
      }
  
      if (username) {
        const user = await UserModel.findOne({ username });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        query = { ...query, doctorId: user._id };
      }
  
      const doctorInfo = await DoctorInfo.findOne(query);
      if (!doctorInfo) {
        return res.status(404).json({ message: "Doctor info not found" });
      }
  
      res.json(doctorInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
 
  
  router.get("/all", async (req, res) => {
    try {
      // Fetch all doctors from the DoctorInfo model and populate the 'doctorId' field with the 'username' field from the UserModel
      const allDoctors = await DoctorInfo.find()
        .populate({
          path: "doctorId",
          select: "username",
          model: UserModel,
        })
        .select("-_id -__v");
  
      if (allDoctors.length === 0) {
        return res.status(404).json({ message: "No doctors found" });
      }
  
      res.json(allDoctors);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
  





export default router;

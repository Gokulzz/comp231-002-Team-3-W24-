// adminRoute.js
import express from "express";
import jwt from "jsonwebtoken";
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

// Get all users in table form
router.get("/users", authenticateAdmin, async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Delete a user
router.delete("/users/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;

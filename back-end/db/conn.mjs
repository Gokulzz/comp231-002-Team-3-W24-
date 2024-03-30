// src/db/conn.mjs
import mongoose from "mongoose";
import UserModel from "../models/User.mjs";

//const uri = "mongodb+srv://gokulkhatri:Gokul123%21%40%23@cluster0.agpzzga.mongodb.net/?retryWrites=true&w=majority";

 const uri = "mongodb://127.0.0.1:27017/test";

const connectToMongoDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, { dbName: "Appointment" });

    const db = mongoose.connection;

    db.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      reject(error);
    });

    db.once("open", () => {
      console.log("Connected to MongoDB");
      console.log("Connected to the appointment database");
      resolve();
    });
  });
};
const Patient = UserModel.discriminator("Patient", new mongoose.Schema({}));
const Doctor = UserModel.discriminator("Doctor", new mongoose.Schema({}));
const Administrator = UserModel.discriminator(
  "Administrator",
  new mongoose.Schema({})
);
const Receptionist = UserModel.discriminator(
  "Receptionist",
  new mongoose.Schema({})
);

export { connectToMongoDB, Patient, Doctor, Administrator, Receptionist };

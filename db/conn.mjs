// src/db/conn.mjs
import mongoose from 'mongoose';

const uri = "mongodb+srv://gokulkhatri:Gokul123%21%40%23@cluster0.agpzzga.mongodb.net/?retryWrites=true&w=majority";

const connectToMongoDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, { dbName: 'Appointment' });

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

export { connectToMongoDB };

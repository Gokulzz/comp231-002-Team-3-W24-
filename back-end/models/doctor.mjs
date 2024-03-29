
import mongoose from "mongoose";

const doctorInfoSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor', // Reference to the Doctor model
      required: true,
      unique: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DoctorInfo = mongoose.model("DoctorInfo", doctorInfoSchema);

export default DoctorInfo;

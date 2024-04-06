
import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for the doctor
      required: true
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for the patient
      required: true
    },
    medication: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const PrescriptionModel = mongoose.model("Prescription", prescriptionSchema);

export default PrescriptionModel;

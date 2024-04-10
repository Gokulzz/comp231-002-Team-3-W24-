// medicalReport.mjs

import mongoose from "mongoose";

const { Schema } = mongoose;

const medicalReportSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  report: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update updatedAt field before saving the document
medicalReportSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

const MedicalReport = mongoose.model("MedicalReport", medicalReportSchema);

export default MedicalReport;

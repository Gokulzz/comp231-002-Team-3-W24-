import mongoose from "mongoose";

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Reschedule", value: "reschedule" },
  { label: "Reject", value: "reject" },
  { label: "Confirm", value: "confirm" },
  { label: "Cancel", value: "cancel" },
  { label: "Visit", value: "visit" },
  { label: "All", value: "all" },
];

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: statusOptions[0].value,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

export default appointmentModel;

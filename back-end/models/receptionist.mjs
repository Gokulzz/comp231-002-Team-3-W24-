

import appointmentModel from "../models/appointment.mjs";

class Receptionist {
  constructor() {}

  async getAppointmentRequests() {
    try {
      // Fetch all appointment requests that are not yet handled by the receptionist
      const appointmentRequests = await appointmentModel.find({ status: "pending" });
      return appointmentRequests;
    } catch (error) {
      console.error("Error fetching appointment requests:", error);
      throw error;
    }
  }

  async handleAppointment(appointmentId, action) {
    try {
      let message;
      let appointment;

      // Fetch the appointment by ID
      appointment = await appointmentModel.findById(appointmentId);

      if (!appointment) {
        return { success: false, message: "Appointment not found" };
      }

      switch (action) {
        case "accept":
          appointment.status = "accepted";
          message = "Appointment accepted successfully";
          break;
        case "reject":
          appointment.status = "rejected";
          message = "Appointment rejected";
          break;
        case "change":
          
          break;
        default:
          return { success: false, message: "Invalid action" };
      }

      // Save the updated appointment
      await appointment.save();

      return { success: true, message, appointment };
    } catch (error) {
      console.error("Error handling appointment:", error);
      throw error;
    }
  }
}

export default Receptionist;

import Mongoose from "mongoose";
import validator from "validator";

const messageSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide a Valid Email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number must contain exact 10 digits!"],
        maxLength: [10, "Phone Number must contain exact 10 digits!"]
    },
    message: {
        type: String,
        required: true,
    }
});

export const Message = Mongoose.model("Message", messageSchema);
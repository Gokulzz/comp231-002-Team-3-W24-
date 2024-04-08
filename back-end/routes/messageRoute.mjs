import express from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.mjs";
import ErrorHandler from "../middlewares/errorMiddleware.mjs";

import { Message } from "../models/messageSchema.mjs";

const router = express.Router();

//Router for send message :

router.post("/send", catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Send Successfully",
  });
}));


export default router;
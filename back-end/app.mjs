// src/app.mjs
import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import connectToMongoDB from "./db/conn.mjs";

import messageRoute from "./routes/messageRoute.mjs"
import userRoute from "./routes/userRoute.mjs"

// import authRoute from "./routes/authRoute.mjs";
// import appointmentRoute from "./routes/appointmentRoute.mjs";
// import receptionistRoute from "./routes/receptionistRoute.mjs"; 
// import doctorRoute from "./routes/doctorRoute.mjs";

import {errorMiddleware} from "./middlewares/errorMiddleware.mjs"





const app = express();
config({ path: "./config/config.env" });
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/appointment", appointmentRoute);
// app.use("/api/receptionist", receptionistRoute);
// app.use("/api/doctor", doctorRoute);

connectToMongoDB();

app.use(errorMiddleware);
export default app;

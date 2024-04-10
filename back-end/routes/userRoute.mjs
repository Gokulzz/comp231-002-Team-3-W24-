import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.mjs"
import ErrorHandler from "../middlewares/errorMiddleware.mjs"
import  {generateToken} from "../utils/jwtToken.mjs"
import {User} from "../models/userSchema.mjs"
import express from "express";


const router = express.Router();

// Router for Patient Registration

router.post("/patient/register", catchAsyncErrors(async(req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob, role} = req.body;

    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !role){
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    let user = await User.findOne({ email });
    if(user) {
        return next(new ErrorHandler("User Already Registered!", 400));
    }

    user = await User.create({firstName, lastName, email, phone, password, gender, dob, role});

    generateToken(user, "user Registered!", 200, res);
}));


// Route for Patient Login :

router.post("/login", catchAsyncErrors(async(req, res, next) => {
    
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }

    if(password !== confirmPassword){
        return next(new ErrorHandler("Passwords do not matches!", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password!", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password!", 400));
    }

    if(role !== user.role) {
        return next(new ErrorHandler("User with this role not found!", 400));
    }

    generateToken(user, "user logged in successfully!", 200, res);

}))


// Registeration for Admin :

router.post("/admin/addnew", catchAsyncErrors(async(req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob} = req.body;

    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob ){
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this Email alreday Exists!`));
    }

    const admin = await User.create({firstName, lastName, email, phone, password, gender, dob, role: "Admin",});

    res.status(200).json({
        success: true,
        message: "New Admin Registered!",
    });
})
);


export default router;
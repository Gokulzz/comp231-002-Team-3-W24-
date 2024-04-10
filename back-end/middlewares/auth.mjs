import { User } from "../models/userSchema.mjs";
import { catchAsyncErrors } from "./catchAsyncErrors.mjs";
import ErrorHandler from "./errorMiddleware.mjs";
import jwt from "jsonwebtoken"

// for checking : if new admin is added by new admin or by anyone else.

export const isAdminAuthenticated = catchAsyncErrors(async(req, res, next) => {
    
    // Authentication:
    const token = req.cookies.adminToken;

    if(!token){
        return next(new ErrorHandler("Admin Not Authenticated!", 400));
    }

    // Authorization :
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403))
    }

    next();
});
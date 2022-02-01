import { CookieOptions, NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";
import ApiError from "../utils/apiError";
import catchAsyncError from "../utils/error";
import sendToken from "../utils/cookie";
import isEmail from "validator/lib/isEmail";

//------------------- USER -------------------//

//register user
export const createUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email, profilePic } = req.body;
    const user = await userModel.create({
      name,
      password,
      email,
      profilePic,
    });

    const token = user.getJWTToken();
    console.log(token);
    res.status(201).json({ success: true, token, user });
  }
);

//login user
export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    //check for both inputs
    if (!password || !email) {
      return next(ApiError.badRequest("Please Enter Your Email and Password"));
    }

    if (!isEmail(email))
      return next(ApiError.badRequest("Please Enter a valid Email"));

    //get user
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(ApiError.badRequest("No User Found"));
    }
    //check password
    const valid = await user.isValidPassword(password);

    if (!valid) return next(ApiError.badRequest("Invalid Email or Password"));

    sendToken(user, res);
  }
);

//logout user
export const logoutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const options: CookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now()),
    };
    res.cookie("access_token", null, options);

    res.status(200).json({ success: true, message: "User Logged Out" });
  }
);

//get current user detailes
export const getCurrentUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //user needs to be logged to ask
    if (!res.locals.user._id) return next(ApiError.badRequest("Please loggin"));

    //get updated data
    const user = await userModel.findById(res.locals.user._id);

    res.status(200).json({ success: true, user });
  }
);

//update user profile
export const updateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    const id = res.locals.user._id;
    //get updated data
    const user = await userModel.findByIdAndUpdate(
      id,
      { name, email },
      { runValidators: true, new: true }
    );

    res.status(200).json({ success: true, user });
  }
);

//update user profile pic
export const updateUserPicture = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body;
    const id = res.locals.user._id;
    //get updated data
    const user = await userModel.findByIdAndUpdate(
      id,
      { profilePic: url },
      { runValidators: true, new: true }
    );

    res.status(200).json({ success: true, user });
  }
);

//------------------- ADMIN -------------------//

//get all users - admin
export const getAllUsers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //get all users
    const users = await userModel.find();

    res.status(200).json({ success: true, users });
  }
);

//get a users - admin
export const getaUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //get all users
    const users = await userModel.findById(req.params.id);

    res.status(200).json({ success: true, users });
  }
);

//update user - admin
export const updateUserRole = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, role } = req.body;

    const id = req.params.id;
    //get updated data
    const user = await userModel.findByIdAndUpdate(
      id,
      { name, email, role },
      { runValidators: true, new: true }
    );

    res.status(200).json({ success: true, user });
  }
);

//delete user - admin
export const deleteUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.findById(req.params.id);
    if (!user)
      return next(
        ApiError.badRequest(`User with id: ${req.params.id} was not found`)
      );

    await userModel.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  }
);

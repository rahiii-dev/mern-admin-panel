import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import { clearToken, generateToken } from "../utils/jwtUtils.js";

export const authenticateUser = asyncHandler(async (req, res) => {
  /*  
        Route: POST api/auth/login
        Purpose: Authenticate user
  */
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(user, res);
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const createUser = asyncHandler(async (req, res) => {
  /*  
        Route: POST api/auth/register
        Purpose: Create user
    */
  const { fullName, email, password, profileImage, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = new User({
    fullName,
    email,
    password,
    profileImage,
    isAdmin,
  });

  if (await user.save()) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const usersList = asyncHandler(async (req, res) => {
  /*  
        Route: GET api/users/
        Purpose: Listing users
    */
  const users = await User.find({});
  res.json(users);
});

export const userProfile = asyncHandler(async (req, res) => {
  /*  
        Route: GET api/user/
        Purpose: user Profile
    */
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const editUser = asyncHandler(async (req, res) => {
  /*  
        Route: PUT api/user/
        Purpose: edit user Profile
    */
  const { id, fullName, email, profileImage, isAdmin } = req.body;

  const user = await User.findById(id);

  if (user) {
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.profileImage = profileImage || user.profileImage;
    user.isAdmin = isAdmin || user.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  /*  
        Route: DELETE api/user/
        Purpose: edit user Profile
    */
  const user = await User.findById(req.body.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
    /*  
        Route: POST api/auth/logout
        Purpose: Logout user
    */
    clearToken(res)
    res.status(200).json({ message: 'Logged out successfully' });
  });

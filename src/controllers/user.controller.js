import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user data from request body
  // validation
  //check if user already exists
  // files existes, check for avatar
  // upload avatar to cloudinary, avatar
  //create user object - create user in database
  // remove password and refresh token from response
  //check for user creation
  // send response with user data

  const { username, email, fullname, password } = req.body;
  //   if (fullname === "") {
  //     throw new ApiError(400, "Fullname is required");
  //   }
  if (
    [fullname, email, username, password].some((field) => {
      field?.trim() === "" || field === undefined || field === null;
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = User.findOne({ $or: [{ username }, [email]] }).then(
    (user) => {}
  );
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }
  const avataLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avataLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatar = await uploadOnCloudinary(avataLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;
  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar");
  }
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    fullname,
    password,
    avatar: avatar.secure_url,
    coverImage: coverImage ? coverImage.secure_url : null,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }

  // .then((user) => {
  //   user.password = undefined;
  //   user.refreshToken = undefined;
  //   res.status(201).json(user);
  // })
  // .catch((error) => {
  //   console.error("Error creating user:", error);
  //   throw new ApiError(500, "Internal Server Error");
  // });

  res.status(200).json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { registerUser };

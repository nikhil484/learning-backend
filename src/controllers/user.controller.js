import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; 
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser= asyncHandler(async(req,res)=>{
//    return res.status(200).json({
//         message:"Ok"
//     })
//get user details from frontend
//validation not empty 
const {fullName,username,email,password}=req.body
console.log("email:",email);

// if(fullName===""){
//     throw new ApiError(400,"fullName is required ")
// }

if(!fullName || !username || !email || !password){
    throw new ApiError(400,"All fields ar e required")}

    //check if user already exists

    const existedUser=User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"Username or email already in Use")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required ")
    }

    const avatar=  await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError (400, "Avatar file is required ")
    }

   const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()

    })

   const createdUser=await  User.findById(user._id).select(
    "-password -refreshToken"
   )
   if (!createdUser){
    throw new ApiError(500, "Something went Wrong while registering the user ")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully")
   )

 })



export {registerUser}
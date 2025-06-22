import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { uploadOnCloudinary } from '../utils/Cloudinary.js'
import { User } from '../../shared/models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { verifyJWTToken } from '../../shared/config/jwt.js'

export const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
      
        user.refreshToken = refreshToken
      
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
      
      } catch (err) {
        throw new ApiError(err.status || 500, err.message)
      }
}

export const registerUser = asyncHandler(async(req,res) => {
  const { username, fullName, email, password } = req.body
  
  if ([username, fullName, email, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400,'All Credenetials are required')
  }

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  if (!validateEmail(email)) {
    throw new ApiError(400, 'Please provide a valid Gmail address');
  }
  

  const existedUser = await User.find({
    $or: [{ username }, { email}]
  })

  if (existedUser?.length > 0) {
    throw new ApiError(400, 'username or email already taken')
  }

  const avatarLocalPath = req.file?.path
  let avatar;
  if (avatarLocalPath) { 
    const response = await uploadOnCloudinary(avatarLocalPath, 'avatars')
    if (!response) {
      throw new ApiError(500, 'Error occured while uploading the image')
    }
    avatar = response?.url
  }
  
  const user = await User.create({
    username: username?.toLowerCase(),
    fullName: fullName,
    email: email?.toLowerCase(),
    password,
    avatar : avatar || null
  })

  const createdUser = await User.findById(user?._id).select('-password -refrehToken')

  if (!createdUser) {
    throw new ApiError(500, 'Error occured while registering the user')
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(createdUser?._id).select('-password -refreshToken')

  // cookie settings
    const cookieOptions = {
      httpOnly : true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  }

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .cookie('accessToken', accessToken, cookieOptions)
    .json(new ApiResponse(
      200,
      loggedInUser,
      'User Registered Successfully'
  ))
})
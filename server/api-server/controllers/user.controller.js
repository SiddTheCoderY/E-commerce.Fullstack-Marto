import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { uploadOnCloudinary } from '../utils/Cloudinary.js'
import { User } from '../../shared/models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import crypto from 'crypto'
import sendMail from '../utils/sendMail.js'

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
    throw new ApiError(400,'All credenetials are required')
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

  
  const createdUser = await User.findById(user?._id).select('-password -refreshToken')
  
  if (!createdUser) {
    throw new ApiError(500, 'Error occured while registering the user')
  }
  // for email sending
  const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // expires in 15 minutes

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  // 🔗 Create verification link and send mail
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?email=${user.email}&otp=${otp}`;
  await sendMail({
  to: user.email,
  subject: 'Verify your Email - Anbari',
  html: `
  <div style="max-width:600px;margin:auto;font-family:'Segoe UI',sans-serif;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
    <!-- Header with gradient, logo -->
    <div style="background:linear-gradient(135deg,#7C3AED,#3B82F6);padding:20px;text-align:center;color:white;">
      <h1 style="margin:0;">Verify Your Email</h1>
    </div>

    <!-- Illustration -->
    <div style="text-align:center;padding:20px 0;">
      <img src="https://cdn-icons-png.flaticon.com/512/270/270798.png" alt="Email Verification Illustration" width="150" style="opacity:0.8;" />
    </div>

    <!-- Body content -->
    <div style="padding:30px;text-align:center;">
      <p style="font-size:16px;color:#4B5563;">Hello <strong>${user.fullName}</strong>,</p>
      <p style="font-size:15px;color:#6B7280;">Use the OTP below to verify your email address or click the button to verify directly.</p>
      <h2 style="margin:20px auto;font-size:28px;color:#7C3AED;background:#F3F4F6;padding:10px 20px;display:inline-block;border-radius:8px;">${otp}</h2>
      <a href="${verificationLink}" style="display:inline-block;margin-top:20px;background:#3B82F6;color:white;padding:12px 25px;text-decoration:none;border-radius:6px;font-weight:bold;">Verify Email</a>
      <p style="font-size:13px;color:#9CA3AF;margin-top:30px;">This OTP/link expires in 15 minutes. If you didn't request this, please ignore.</p>
    </div>

    <!-- Footer with social links -->
    <div style="background:#F9FAFB;padding:20px;text-align:center;font-size:14px;color:#6B7280;">
      <p style="margin-bottom:10px;">Connect with us:</p>
      <a href="https://facebook.com/siddthecoder" style="margin: 0 8px; display:inline-block;" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24" />
      </a>
      <a href="https://instagram.com/siddhant_.ydv" style="margin: 0 8px; display:inline-block;" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" width="24" />
      </a>
      <a href="https://github.com/siddthecoder" style="margin: 0 8px; display:inline-block;" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" width="24" />
      </a>
      <a href="https://linkedin.com/in/siddthecoder" style="margin: 0 8px; display:inline-block;" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" width="24" />
      </a>
      <p style="margin-top:15px;font-size:12px;color:#9CA3AF;">&copy; ${new Date().getFullYear()} Anbari. All rights reserved.</p>
    </div>
  </div>
  `
  });


  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = createdUser

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

export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.query;

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, 'User not found');
  if (user.verified) throw new ApiError(400, 'User already verified');
  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    throw new ApiError(400, 'Invalid or expired OTP');
  }

  user.verified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.status(200).json(new ApiResponse(200, null, 'Email verified successfully'));
});

export const reSendEmailForVerification = asyncHandler(async(req,res) => {
  
  const user = await User.findById(req.user?._id)
  // for email sending
  const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // expires in 15 minutes

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  // 🔗 Create verification link and send mail
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?email=${user.email}&otp=${otp}`;
  await sendMail({
  to: user.email,
  subject: 'Verify your Email - Anbari',
  html: `
  <div style="max-width:600px;margin:auto;font-family:'Segoe UI',sans-serif;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
    <!-- Header with gradient, logo -->
    <div style="background:linear-gradient(135deg,#7C3AED,#3B82F6);padding:20px;text-align:center;color:white;">
      <h1 style="margin:0;">Verify Your Email</h1>
    </div>

    <!-- Illustration -->
    <div style="text-align:center;padding:20px 0;">
      <img src="https://cdn-icons-png.flaticon.com/512/270/270798.png" alt="Email Verification Illustration" width="150" style="opacity:0.8;" />
    </div>

    <!-- Body content -->
    <div style="padding:30px;text-align:center;">
      <p style="font-size:16px;color:#4B5563;">Hello <strong>${user.fullName}</strong>,</p>
      <p style="font-size:15px;color:#6B7280;">Use the OTP below to verify your email address or click the button to verify directly.</p>
      <h2 style="margin:20px auto;font-size:28px;color:#7C3AED;background:#F3F4F6;padding:10px 20px;display:inline-block;border-radius:8px;">${otp}</h2>
      <a href="${verificationLink}" style="display:inline-block;margin-top:20px;background:#3B82F6;color:white;padding:12px 25px;text-decoration:none;border-radius:6px;font-weight:bold;">Verify Email</a>
      <p style="font-size:13px;color:#9CA3AF;margin-top:30px;">This OTP/link expires in 15 minutes. If you didn't request this, please ignore.</p>
    </div>

    <!-- Footer with social links -->
    <div style="background:#F9FAFB;padding:20px;text-align:center;font-size:14px;color:#6B7280;">
      <p style="margin-bottom:10px;">Connect with us:</p>
      <a href="https://facebook.com/siddthecoder" style="margin: 0 8px; display:inline-block;" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24" />
      </a>
      <a href="https://instagram.com/siddhant_.ydv" style="margin: 0 8px; display:inline-block;" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" width="24" />
      </a>
      <a href="https://github.com/siddthecoder" style="margin: 0 8px; display:inline-block;" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" width="24" />
      </a>
      <a href="https://linkedin.com/in/siddthecoder" style="margin: 0 8px; display:inline-block;" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" width="24" />
      </a>
      <p style="margin-top:15px;font-size:12px;color:#9CA3AF;">&copy; ${new Date().getFullYear()} Anbari. All rights reserved.</p>
    </div>
  </div>
  `
  });

  return res.status(200).json(new ApiResponse(200, null, 'Verification email sent again'));
})
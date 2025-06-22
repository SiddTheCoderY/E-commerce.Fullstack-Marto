import axios from 'axios';
import { User } from '../../shared/models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const googleOAuth = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code) throw new ApiError(400, 'Authorization code is required');

  const { data } = await axios.post('https://oauth2.googleapis.com/token', null, {
    params: {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { access_token, id_token } = data;

  if (!id_token) throw new ApiError(401, 'Invalid Google ID token');

  const userInfo = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());
  const { email, name, picture, sub: googleId } = userInfo;

  if (!email) throw new ApiError(400, 'Email not found in Google token');

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      email,
      fullName: name,
      username: email.split('@')[0],
      avatar: picture,
      password: googleId,
      verified: true,
    });
    await user.save();
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

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
         {
            accessToken : accessToken
         },
        'User Registered Successfully via Google'
    ))
});



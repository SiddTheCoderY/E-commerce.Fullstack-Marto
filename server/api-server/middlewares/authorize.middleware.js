import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../../shared/models/user.model.js";
import { verifyJWTToken } from "../../shared/config/jwt.js";

// auth midlleware
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      throw new ApiError(400,'Unauthorized Request')
    }
    const decodedToken = verifyJWTToken(token, process.env.ACCESS_TOKEN_SECRET)
    
    const user = await User.findById(decodedToken?._id).select('-password -refreshToken')
  
    if (!user) {
      throw new ApiError(403,'Invalid Access Token')
    }
  
    req.user = user
    next()
  } catch (err) {
    throw new ApiError(401,'Unauthorized Access Token ...')
  }
})

// role middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      try {
        if (!req.user || !roles.includes(req.user.role)) {
          console.warn(`❌ Unauthorized access attempt by user ${req.user?._id || 'Unknown'} with role ${req.user?.role || 'none'}`);
          throw new ApiError(403, `Access denied for role: ${req.user?.role || 'unknown'}`);
        }
        next();
      } catch (error) {
        next(error); // Passes error to the global error handler
      }
    };
  };
  

export { verifyJWT, authorizeRoles }

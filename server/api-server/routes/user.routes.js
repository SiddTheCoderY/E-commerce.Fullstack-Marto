import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authorize.middleware.js";

import { 
  registerUser,
  loginUser,
  logoutUser,
  promoteUserToSeller,
  getCurrentUser,
  updateUserCredentials,
 } from "../controllers/user.controller.js";

const router = Router()

// unsecured routes
router.route('/register-user').post(upload.single('avatar'),registerUser) // /api/v1/user/...
router.route('/login-user').post(loginUser)

//secured routes
router.route('/logout-user').post(verifyJWT, logoutUser)
router.route('/promote-user-to-seller').post(verifyJWT, authorizeRoles('consumer'), promoteUserToSeller)
router.route('/get-current-user').get(verifyJWT,getCurrentUser)


router.route('/update-user-credentials').post(verifyJWT,updateUserCredentials)



//for private route check (in frontend)
router.route('/verify-user').get(verifyJWT, (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'User is authenticated',
      isAuthenticated: true
    })
})



export default router  
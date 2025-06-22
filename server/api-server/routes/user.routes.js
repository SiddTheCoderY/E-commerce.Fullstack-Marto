import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authorize.middleware.js";

import { 
  registerUser,
   verifyEmail,
   reSendEmailForVerification,

 } from "../controllers/user.controller.js";

const router = Router()

// unsecured routes
router.route('/register-user').post(upload.single('avatar'),registerUser)
router.get('/verify-email', verifyEmail);
router.get('/re-send-email-for-verification',reSendEmailForVerification)

//secured routes



//for private route check (in frontend)
router.route('/verify-user').get(verifyJWT, (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'User is authenticated',
      isAuthenticated: true
    })
})


export default router  
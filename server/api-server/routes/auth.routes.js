import express from 'express';
import { googleOAuth,refreshAccessToken,verifyEmail,reSendEmailForEmailVerification } from '../controllers/auth.controller.js';

const router = express.Router();

// normal auth --------
router.post('/refresh-token', refreshAccessToken)
router.get('/verify-email', verifyEmail);
router.get('/re-send-email-for-verification', reSendEmailForEmailVerification)


// OAuth ------
router.post('/google-auth', googleOAuth); // POST /api/auth/google

export default router;

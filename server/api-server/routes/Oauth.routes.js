import express from 'express';
import { googleOAuth } from '../controllers/Oauth.controller.js';

const router = express.Router();

router.post('/google', googleOAuth); // POST /api/auth/google

export default router;

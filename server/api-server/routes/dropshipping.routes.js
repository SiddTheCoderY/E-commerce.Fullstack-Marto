// routes/testCJ.js
import express from "express";
import { getCJAccessToken } from "../service/dropshipping/seatedService.js";

const router = express.Router();

router.get("/test-cj-token", async (req, res) => {
  const token = await getCJAccessToken();
  res.json({ token });
});

export default router;

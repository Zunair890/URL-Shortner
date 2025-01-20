import express from "express";
import { GenerateNewShortUrl } from "../controllers/url.js";
import { handleGetAnalytics } from "../controllers/url.js";
const router= express.Router();
router.post("/",GenerateNewShortUrl);
router.get("/analytics/:shortId",handleGetAnalytics);
export default router;

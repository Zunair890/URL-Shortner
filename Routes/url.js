import express from "express";
import { handleGenerateShortURL } from "../controllers/url.js";
import { handleGetAnalytics } from "../controllers/url.js";
const router= express.Router();
router.post("/",handleGenerateShortURL);
router.get("/analytics/:shortId",handleGetAnalytics);
export default router;

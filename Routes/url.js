import express from "express";
import { GenerateNewShortUrl } from "../controllers/url";

const router= express.Router();
router.post("/",GenerateNewShortUrl);
export default router;

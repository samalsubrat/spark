import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { createHotspot, listHotspots } from "../controllers/hotspotController.js";

const router = express.Router();

router.get("/", isLoggedIn, listHotspots);
router.post("/", isLoggedIn, createHotspot);

export default router;



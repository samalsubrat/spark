import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { createWaterTest } from "../controllers/waterTestController.js";

const router = express.Router();

router.post("/", isLoggedIn, createWaterTest);

export default router;



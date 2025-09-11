import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { createUser, listReports, listWaterTests } from "../controllers/adminController.js";

const router = express.Router();

router.post("/users", isLoggedIn, createUser);
router.get("/reports", isLoggedIn, listReports);
router.get("/water-tests", isLoggedIn, listWaterTests);

export default router;



import express from "express";
import { createReport, listLeaderReports, updateReport } from "../controllers/reportController.js";
import { isLoggedIn } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", createReport);
router.get("/", isLoggedIn, listLeaderReports);
router.patch("/:id", isLoggedIn, updateReport);

export default router;



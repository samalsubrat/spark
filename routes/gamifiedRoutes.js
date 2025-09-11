import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { createPlaybook, listPlaybooks, createStory, listStories, createTestimonial, listTestimonials } from "../controllers/gamifiedController.js";

const router = express.Router();

// Public lists
router.get("/playbooks", listPlaybooks);
router.get("/stories", listStories);
router.get("/testimonials", listTestimonials);

// endpoints (logged-in; admin/leader)
router.post("/playbooks", isLoggedIn, createPlaybook);
router.post("/stories", isLoggedIn, createStory);
router.post("/testimonials", isLoggedIn, createTestimonial);

export default router;



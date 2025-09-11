import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({message: "Health Check!"})
})

import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import waterTestRoutes from "./routes/waterTestRoutes.js";
import hotspotRoutes from "./routes/hotspotRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import gamifiedRoutes from "./routes/gamifiedRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/water-tests", waterTestRoutes);
app.use("/api/v1/hotspots", hotspotRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/gamified", gamifiedRoutes);
app.use("/api/v1/admin", adminRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}/`)
})
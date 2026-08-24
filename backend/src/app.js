import express from "express";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import quizRoute from "./routes/quiz.route.js";
import leaderboardRoute from "./routes/leaderboard.route.js";
import historyRoute from "./routes/history.route.js";

const app = express();

app.use(cors());

app.use(express.json());

// Simple health check - useful for API testing
app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "API is running" });
});

app.use("/api/auth", authRoute);

app.use("/api/quiz", quizRoute);

app.use("/api/leaderboard", leaderboardRoute);

app.use("/api/history", historyRoute);

// 404 handler for unknown API routes
app.use("/api", (req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
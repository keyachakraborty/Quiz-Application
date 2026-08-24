import express from "express";

import {
    saveScore,
    getGlobalLeaderboard,
    getCategoryLeaderboard,
} from "../controllers/leaderboard.controller.js";

import Score from "../models/Score.model.js";
import { optionalAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/save", optionalAuth, saveScore);

router.get("/global", getGlobalLeaderboard);

router.get("/category/:category", getCategoryLeaderboard);

// Temporary Route to Clear All Scores
router.get("/clear", async (req, res) => {
    await Score.deleteMany({});
    res.json({
        success: true,
        message: "All scores deleted"
    });
});

export default router;

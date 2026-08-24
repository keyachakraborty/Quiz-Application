import express from "express";

import {
    getMyHistory,
    getMyHistoryByCategory,
    getAttemptById,
    deleteAttempt
} from "../controllers/history.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyHistory);

router.get("/category/:category", authMiddleware, getMyHistoryByCategory);

router.get("/:id", authMiddleware, getAttemptById);

router.delete("/:id", authMiddleware, deleteAttempt);

export default router;

import express from "express";

import {
    getAllQuestions,
    getQuestionsByCategory,
    submitQuiz
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/", getAllQuestions);

router.get("/:category", getQuestionsByCategory);

router.post("/submit", submitQuiz);

export default router;

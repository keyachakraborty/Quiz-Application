import Question from "../models/Question.model.js";

// Get all questions
export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();

        res.status(200).json({
            success: true,
            total: questions.length,
            data: questions
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get questions by category
export const getQuestionsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const questions = await Question.find({ category });

        res.status(200).json({
            success: true,
            total: questions.length,
            data: questions
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Submit Quiz & Calculate Score
export const submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body;

        let score = 0;

        for (const item of answers) {

            const question = await Question.findById(item.questionId);

            if (question && question.answer === item.answer) {
                score++;
            }
        }

        res.status(200).json({
            success: true,
            message: "Quiz submitted successfully",
            score,
            totalQuestions: answers.length
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


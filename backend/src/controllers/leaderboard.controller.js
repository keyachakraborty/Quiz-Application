import Score from "../models/Score.model.js";

// Save Score
export const saveScore = async (req, res) => {
    try {
        console.log("BODY RECEIVED:", req.body);

        const { name, category, score, totalQuestions } = req.body;

        const userId = req.user ? req.user._id : null;

        console.log(name, category, score, totalQuestions, "userId:", userId);

        const existingScore = await Score.findOne({
            name,
            category,
            score,
            totalQuestions,
            userId
        });

        if (existingScore) {
            return res.status(200).json({
                success: true,
                message: "Score already exists",
                data: existingScore
            });
        }

        const newScore = await Score.create({
            userId,
            name,
            category,
            score,
            totalQuestions
        });

        res.status(201).json({
            success: true,
            message: "Score Saved Successfully",
            data: newScore
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Global Top 10
export const getGlobalLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Score.find()
            .sort({ score: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            leaderboard
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Category Top 10
export const getCategoryLeaderboard = async (req, res) => {
    try {
        const { category } = req.params;

        const leaderboard = await Score.find({ category })
            .sort({ score: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            leaderboard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


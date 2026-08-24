import Score from "../models/Score.model.js";

export const getMyHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        const attempts = await Score.find({ userId })
            .sort({ createdAt: -1 });

        const totalAttempts = attempts.length;

        const bestScore = totalAttempts
            ? Math.max(...attempts.map((a) => a.score))
            : 0;

        const averageScore = totalAttempts
            ? Math.round(
                attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts
            )
            : 0;

        const categoriesTried = [...new Set(attempts.map((a) => a.category))];

        res.status(200).json({
            success: true,
            stats: {
                totalAttempts,
                bestScore,
                averageScore,
                categoriesTried
            },
            attempts
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getMyHistoryByCategory = async (req, res) => {
    try {
        const userId = req.user._id;
        const { category } = req.params;

        const attempts = await Score.find({ userId, category })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: attempts.length,
            attempts
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAttemptById = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const attempt = await Score.findOne({ _id: id, userId });

        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "Attempt not found"
            });
        }

        res.status(200).json({
            success: true,
            attempt
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteAttempt = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const attempt = await Score.findOneAndDelete({ _id: id, userId });

        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "Attempt not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Attempt deleted successfully"
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        name: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        score: {
            type: Number,
            required: true
        },

        totalQuestions: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Score = mongoose.model("Score", scoreSchema);

export default Score;
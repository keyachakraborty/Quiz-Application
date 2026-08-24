import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        console.log("Authorization Header:", authHeader);

        const token = authHeader.split(" ")[1];

        console.log("Received Token:", token);
        console.log("JWT Secret:", process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:", decoded);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("JWT Error:", error);

        return res.status(401).json({
            message: error.message
        });
    }
};

// Optional Auth: does NOT block the request if there is no/invalid token.
// If a valid token is present, req.user is attached (used to link quiz
// scores/history to a logged-in user). Guests can still submit/save scores.
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next();
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (user) {
            req.user = user;
        }

        next();

    } catch (error) {
        // Invalid/expired token -> just continue as a guest
        next();
    }
};

export default authMiddleware;
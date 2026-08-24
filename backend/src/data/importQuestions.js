import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import Question from "../models/Question.model.js";

dotenv.config();

const importQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Database Connected");

        const questions = JSON.parse(
            fs.readFileSync("./src/data/questions.json", "utf-8")
        );

        await Question.deleteMany();

        await Question.insertMany(questions);

        console.log("Questions Imported Successfully");

        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

importQuestions();
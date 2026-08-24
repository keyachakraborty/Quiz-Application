import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/DB/db.connect.js";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Database Connection Failed");
        console.log(error);
    });


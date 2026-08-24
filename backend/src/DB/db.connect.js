import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database Connected Successfully");
  } 
  catch (error) {
    console.log("Database Connection Failed");
    process.exit(1);
  }
};

export default connectDB;

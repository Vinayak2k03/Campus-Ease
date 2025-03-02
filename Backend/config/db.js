import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("DB connected"));
}
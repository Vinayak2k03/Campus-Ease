import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vinayaknagar:!devil!177@cluster0.rwsjs0i.mongodb.net/CampusEase').then(()=>console.log("DB connected"));
}
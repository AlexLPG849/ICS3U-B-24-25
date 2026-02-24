// db.js
import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected");
}
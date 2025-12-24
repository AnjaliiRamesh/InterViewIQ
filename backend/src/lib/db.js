
// import mongoose from "mongoose"
// import {ENV} from "./env.js"

// export const connectDB = async()=>{
//     try {
//         const conn = await mongoose.connect(ENV.DB_URL)
//         console.log("Connected to MongoDB: ", conn.connection.host);
        
//     } catch (error) {
//         console.log("Error connecting to MongoDB", error);
//         process.exit(1)//
        
//     }
// }


// lib/db.js
import mongoose from "mongoose";
import { ENV } from "./env.js";

// Cached connection for serverless environments
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    // Return existing connection if already connected
    return cached.conn;
  }

  if (!cached.promise) {
    // Create new connection if not already connecting
    cached.promise = mongoose
      .connect(ENV.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Connected to MongoDB:", cached.conn.connection.host);
    return cached.conn;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error; // Let Vercel handle the function failure
  }
};

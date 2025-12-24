// // console.log("hey from the server");
// import express from "express"
// import path from "path";
// import { ENV } from "./lib/env.js";
// import { connectDB } from "./lib/db.js";
// import cors from "cors";
// import { functions, inngest } from "./lib/inngest.js";
// import {serve} from "inngest/express";

// const app = express();


// // console.log(ENV.PORT);
// // console.log(ENV.DB_URL);

// const __dirname = path.resolve();


// //middleware
// app.use(express.json())
// //credentials:true => server allows a browser to include cookies on request
// app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))

// app.use("/api/inngest", serve({client:inngest, functions}))

// app.get("/health", (req, res) =>{
//     res.status(200).json({msg:"success from backend health"})
// })
// app.get("/books", (req, res) =>{
//     res.status(200).json({msg:"success from backend book"})
// })

// // APP READY FOR DEPLOYMENT
// if(ENV.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "../frontend/dist")))

//     app.get("/{*any}", (req,res)=>{
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }



// const startServer = async() =>{
//     try {
//     await connectDB();
//     app.listen(ENV.PORT, ()=> 
//     console.log("Server is running on port:", ENV.PORT)
// )
//     } catch (error) {
//        console.log("error starting the server", error);
        
//     }
// }
// startServer();

// backend/index.js
import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { functions, inngest } from "./lib/inngest.js";
import { serve } from "inngest/express";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// Connect to DB (serverless-friendly)
await connectDB(); // Ensure connectDB handles connection caching for serverless

// Inngest endpoint
app.use("/api/inngest", serve({ client: inngest, functions }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ msg: "Backend is live" });
});

app.get("/api/books", (req, res) => {
  res.status(200).json({ msg: "Books endpoint working" });
});

// Optional: Serve frontend if needed
if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/(.*)", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Export app for Vercel serverless
export default app;

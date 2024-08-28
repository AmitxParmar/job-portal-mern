import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";

import authRouter from "./routes/auth.routes.js";
import jobsRouter from "./routes/job.routes.js";
import userRouter from "./routes/user.routes.js";
import inviteCodeRouter from "./routes/invitecode.routes.js";

dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS setup
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Test route (can be removed later)
app.get("/", (req, res) => {
  res.json({ status: "Server is running!" });
});

// Route handlers
app.use("/api/auth", authRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/invitecode", inviteCodeRouter);
app.use("/api/user", userRouter);

// Connect to MongoDB
connectDB();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

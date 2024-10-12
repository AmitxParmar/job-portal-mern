import applicationRouter from "./routes/application.routes.js";
import authRouter from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import connectDB from "./db/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import inviteCodeRouter from "./routes/invitecode.routes.js";
import jobsRouter from "./routes/job.routes.js";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { protect } from "./middleware/auth.middleware.js";

dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// CORS setup
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8000"], // Allow requests from your frontend URL
    credentials: true, // Enable credentials (cookies)
  })
);
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(req.cookie);
  next(err);
});

// Test route (can be removed later)
app.get("/", (req, res) => {
  res.json({ status: "Server is running!" });
});

// Route handlers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/invitecode", inviteCodeRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/company", companyRoutes);

// Connect to MongoDB
connectDB();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

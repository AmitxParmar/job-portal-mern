import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// NOTE: just for testing purposes, remove it later.
app.get("/", (req, res) => {
  console.log("test get home api route");
  res.send({ status: "PORT FORWARDING TEST!" });
});

app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);

connectDB();

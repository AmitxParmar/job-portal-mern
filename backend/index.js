import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
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
  res.send({ status: "ok" });
});

app.post("/post", (req, res) => {
  console.log("post invoked", req.body.idk);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);

connectDB();

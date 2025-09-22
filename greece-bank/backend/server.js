import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";   // make sure path is correct
import usersRouter from "./routes/users.js"; // optional, for profile routes

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.listen(5000, () => console.log("Server running on port 5000"));

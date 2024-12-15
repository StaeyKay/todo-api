import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_router.js";
import { taskRouter } from "./routes/task_router.js";

const app = express();

// Apply middleware
app.use(express.json());
app.use(cors({ Credentials: true, origin: "*" }));

// Use routes
app.use("/api/v1", userRouter);
app.use("/api/v1", taskRouter);

// Connect to database
dbConnection();

const PORT = process.env.PORT || 5040;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

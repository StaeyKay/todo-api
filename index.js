import express from "express";
import "dotenv/config";
import { dbConnection } from "./config/db.js";

const app = express();

// Connect to database
dbConnection();

const PORT = process.env.PORT || 5040;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

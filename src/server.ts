// This starts everything.

import express from "express";
import taskRoutes from "./routes/task.routes";
import { AppDataSource } from "./config/database";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);

app.use(errorMiddleware); // Register Middleware

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed");
    console.error(error);
  });
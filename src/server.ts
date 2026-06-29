// This starts everything.

import "dotenv/config";
import express from "express";
import taskRoutes from "./routes/task.routes";
import { AppDataSource } from "./config/database";
import { errorMiddleware } from "./middlewares/error.middleware";
import { env } from "./config/env";

const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);

app.use(errorMiddleware); // Register Middleware

const PORT = Number(process.env.PORT) || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");

    app.listen(env.port, () => {
      console.log(`🚀 Server running on port ${env.port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed");
    console.error(error);
  });
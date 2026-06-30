// This starts everything.

import "dotenv/config";
import express from "express";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";
import { AppDataSource } from "./config/database";
import { errorMiddleware } from "./middlewares/error.middleware";
import { env } from "./config/env";

const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use(errorMiddleware); // Register Middleware

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");

    console.log(
      `📦 Connected to database: ${AppDataSource.options.database}`
    );

    app.listen(env.port, () => {
      console.log(`🚀 Server running on port ${env.port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed");
    console.error(error);
  });

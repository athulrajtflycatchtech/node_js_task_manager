// This starts everything.

import "dotenv/config";
import express from "express";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";
import { AppDataSource } from "./config/database";
import { errorMiddleware } from "./middlewares/error.middleware";
import { env } from "./config/env";

const app = express(); // Create an Express application instance

app.use(express.json()); // This allows the server to parse JSON request bodies.

app.use("/tasks", taskRoutes); // Register Routes
app.use("/auth", authRoutes); // Register Routes
app.use(errorMiddleware); // Register Middleware

AppDataSource.initialize() // Initialize the database connection
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

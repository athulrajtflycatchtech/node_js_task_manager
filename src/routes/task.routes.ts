// The route decides which controller function runs.

import { Router } from "express";
import { validateCreateTask } from "../validations/task.validation";

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getTasks);

router.get("/:id", getTaskById);

router.post( "/", authMiddleware, validateCreateTask, createTask );

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
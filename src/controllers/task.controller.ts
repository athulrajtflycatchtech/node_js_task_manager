import { Request, Response } from "express";

import * as taskService from "../services/task.service"; // "Import everything that task.service.ts exports and put it inside an object called taskService."


export const getTasks = async ( req: Request, res: Response ) => {
  const tasks = await taskService.getAllTasks();

  res.json(tasks);
};

export const getTaskById = async ( req: Request, res: Response ) => {
  const taskId = Number(req.params.id);

  const task = await taskService.getTaskById(taskId);

  res.json(task);
};

export const createTask = async ( req: Request, res: Response ) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const task = await taskService.createTask(title);

  res.status(201).json(task);
};

export const updateTask = async (
  req: Request,
  res: Response
) => {
  const taskId = Number(req.params.id);
  const { title } = req.body;

  const updatedTask = await taskService.updateTask(
    taskId,
    title
  );

  res.json(updatedTask);
};

export const deleteTask = async (
  req: Request,
  res: Response
) => {
  const taskId = Number(req.params.id);

  await taskService.deleteTask(taskId);

  res.json({
    message: "Task deleted successfully",
  });
};
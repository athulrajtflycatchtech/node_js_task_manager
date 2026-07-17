// This file contains validation logic for creating a new task.

import { Request, Response, NextFunction } from "express";

export const validateCreateTask = ( req: Request, res: Response, next: NextFunction ) => {
  const { title } = req.body;

  // if (!title) {
  //   return res.status(400).json({
  //     message: "Title is required",
  //   });
  // }

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required and must be a non-empty string",
    });
  }

  next(); // Continue to the next middleware/controller.
};
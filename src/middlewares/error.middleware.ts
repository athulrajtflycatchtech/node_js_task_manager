import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal Server Error",
  });
};
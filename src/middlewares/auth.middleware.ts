// this file is used to verify the token sent by the client in the request headers. If the token is valid, it allows the request to proceed to the next middleware or route handler. If the token is invalid or not provided, it throws an UnauthorizedError.

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { AuthPayload } from "../types/auth";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization; // Get the Authorization header from the request headers

  if (!authHeader) {
    throw new UnauthorizedError("Token not provided");
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, env.jwtSecret)as AuthPayload; // Verify the token using the secret key

    req.user = decoded;

    // If you don't call next() and you don't send a response, the request just hangs because Express doesn't know what to do next.
    next(); // Call the next middleware or route handler if the token is valid.
  } catch {
    throw new UnauthorizedError("Invalid token");
  }
};
import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response
) => {
  const { name, email, password } = req.body;

  const user = await authService.register(
    name,
    email,
    password
  );

  res.status(201).json(user);
};
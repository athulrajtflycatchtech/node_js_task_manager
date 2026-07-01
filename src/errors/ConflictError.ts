// Used to handle conflict errors, such as when a resource already exists.

import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}
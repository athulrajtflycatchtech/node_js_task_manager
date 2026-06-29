export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
  }
}

// Note:

// error.middleware.ts is created to keep error handling in one common place.

// In your project, service functions throw errors like:
// throw new NotFoundError("Task not found");
// That NotFoundError extends AppError and contains a statusCode like 404.
// Then this middleware catches it:

// if (error instanceof AppError) {
//   return res.status(error.statusCode).json({
//     message: error.message,
//   });
// }

// So instead of writing this in every controller:
// try {
//   ...
// } catch (error) {
//   res.status(500).json(...)
// }
// you register one global error handler in [src/server.ts (line 14)](/home/flycatch/Athulraj/Node_JS/node_js_task_manager/src/server.ts:14):
// app.use(errorMiddleware);

// It is placed after routes, because Express checks routes first, and if any route/service throws an error, Express sends it to this middleware.
// So the purpose is:
// -> Convert custom app errors like NotFoundError into proper HTTP responses
// -> Avoid repeated try/catch code in every controller
// -> Hide unexpected internal errors behind "Internal Server Error"
// -> Keep controller/service code cleaner
// Since your project uses Express 5.2.1, async errors thrown inside controllers/services can be forwarded to this error middleware automatically.
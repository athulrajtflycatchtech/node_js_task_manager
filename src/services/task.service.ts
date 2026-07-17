// We use task.service.ts to keep the task business/database logic separate from the controller.
// In short: task.service.ts keeps your task logic clean, reusable, and easier to test.

import { AppDataSource } from "../config/database";
import { Task } from "../entities/Task";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../entities/User";

const taskRepository = AppDataSource.getRepository(Task);
const userRepository = AppDataSource.getRepository(User);

//-----------------------helper functions-------------------------------------------

const findTaskById = async (id: number) => {
  return await taskRepository.findOne({
    where: {
      id,
    },
  });
};

//-------------------------helper functions-----------------------------------------

export const getAllTasks = async () => {
  return await taskRepository.find(); // Get all tasks from PostgreSQL
};

export const createTask = async (title: string, userId: number) => {
  const user = await userRepository.findOne({ // Find the user by ID
    where: { // Find the user by ID
      id: userId, // Find the user by ID
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const task = taskRepository.create({ // Create a new task instance
    title, // Set the title of the task
    user,// Associate the task with the user  
  });

  return await taskRepository.save(task); // Save the task to PostgreSQL
};

export const getTaskById = async (id: number) => {
  const task = await findTaskById(id);

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  return task;
};

export const updateTask = async (
  id: number,
  title: string
) => {
  const task = await findTaskById(id);

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  task.title = title;

  return await taskRepository.save(task);
};

export const deleteTask = async (id: number) => {
  const task = await findTaskById(id);

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  await taskRepository.remove(task);

  return task;
};
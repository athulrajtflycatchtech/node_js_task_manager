import { AppDataSource } from "../config/database";
import { Task } from "../entities/Task";
import { NotFoundError } from "../errors/NotFoundError";

const taskRepository = AppDataSource.getRepository(Task);

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

export const createTask = async (title: string) => {
  const task = taskRepository.create({
    title,
  });

  return await taskRepository.save(task);
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
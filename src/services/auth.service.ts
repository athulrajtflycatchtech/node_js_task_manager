import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { ConflictError } from "../errors/ConflictError";

const userRepository = AppDataSource.getRepository(User);

export const register = async (
  name: string,
  email: string,
  password: string
) => {

  const existingUser = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ConflictError("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  return await userRepository.save(user);
};
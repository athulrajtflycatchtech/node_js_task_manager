import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const user = userRepository.create({
    name,
    email,
    password,
  });

  return await userRepository.save(user);
};
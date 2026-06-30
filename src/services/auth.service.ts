import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export const register = async (
  name: string,
  email: string,
  password: string
) => {

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  return await userRepository.save(user);
};
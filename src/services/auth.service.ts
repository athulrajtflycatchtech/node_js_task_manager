import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { ConflictError } from "../errors/ConflictError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

const userRepository = AppDataSource.getRepository(User); // Get the repository for the User entity


// Register a new user
export const register = async (
  name: string,
  email: string,
  password: string
) => {

  const existingUser = await userRepository.findOne({
    where: { // Check if a user with the given email already exists
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

export const login = async (
  email: string,
  password: string
) => {
  const user = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

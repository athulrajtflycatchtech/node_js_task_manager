import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { ConflictError } from "../errors/ConflictError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const userRepository = AppDataSource.getRepository(User); // Get the repository for the User entity

// Register a new user
export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await userRepository.findOne({
    where: {
      // Check if a user with the given email already exists
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

  const savedUser = await userRepository.save(user);

  return {
    id: savedUser.id,
    name: savedUser.name,
    email: savedUser.email,
  };
};

export const login = async (email: string, password: string) => {
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

  const token = jwt.sign(
    {
      userId: user.id, // This is the information stored inside the token.
    },
    env.jwtSecret, // This is the secret key used to sign the token. It should be kept private and not shared with anyone.
    {
      expiresIn: "1d", // This is the expiration time for the token. After this time, the token will no longer be valid and the user will need to log in again to get a new token.
    },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

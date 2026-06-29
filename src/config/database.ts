// "Here is my PostgreSQL configuration."

import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Task } from "../entities/Task";
import { env } from "./env";
import { User } from "../entities/User";

dotenv.config(); // This loads everything from your .env file into process.env.

export const AppDataSource = new DataSource({ // new DataSource({ -> This creates a connection configuration ( A DataSource is responsible for connecting your backend application to the database and managing that connection. )
  type: "postgres",

  host: env.dbHost, // Meaning: "The database is running on this computer."
  port: env.dbPort,

  username: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,

  synchronize: true, // "Compare my Entity classes with PostgreSQL and automatically create/update tables."
  logging: false, // .If you change it to "logging: true" every SQL query will appear in the terminal.

  entities: [Task, User], // "These are the classes that represent database tables."

  migrations: [],

  subscribers: [],
});
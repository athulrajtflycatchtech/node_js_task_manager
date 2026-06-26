// "Here is my PostgreSQL configuration."

import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Task } from "../entities/Task";

dotenv.config(); // This loads everything from your .env file into process.env.

export const AppDataSource = new DataSource({ // new DataSource({ -> This creates a connection configuration ( A DataSource is responsible for connecting your backend application to the database and managing that connection. )
  type: "postgres",

  host: process.env.DB_HOST, // Meaning: "The database is running on this computer."
  port: Number(process.env.DB_PORT), 

  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  synchronize: true, // "Compare my Entity classes with PostgreSQL and automatically create/update tables."
  logging: false, // .If you change it to "logging: true" every SQL query will appear in the terminal.

  entities: [Task], // "These are the classes that represent database tables."

  migrations: [],

  subscribers: [],
});
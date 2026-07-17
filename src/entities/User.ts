import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

import { Task } from "./Task";

@Entity() // "Create a PostgreSQL table called user."
export class User {
  @PrimaryGeneratedColumn() // "Create a primary key column called id that auto-increments."
  id!: number;

  @Column() // "Create a column called name."
  name!: string;

  @Column({
    unique: true, // "Create a column called email that must be unique."
  })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Task, (task) => task.user) // "Create a one-to-many relationship with the Task entity."
  tasks!: Task[]; // "This property will hold an array of Task objects associated with this User."
}
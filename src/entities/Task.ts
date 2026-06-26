// This file defines what a Task looks like: Here creating a table named task with these columns.

// it is same like,

// CREATE TABLE task (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR
// );

import {Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;
}
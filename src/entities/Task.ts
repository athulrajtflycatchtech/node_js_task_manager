// This file defines what a Task looks like: Here creating a table named task with these columns.

// it is same like,

// CREATE TABLE task (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR
// );

// what is ! mean in typescript?
//the `!` operator,for example in case of id: "You declared id, but you never assigned a value, Don't worry. This property will be assigned later.".

import {Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;
}
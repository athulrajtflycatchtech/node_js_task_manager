import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

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
}
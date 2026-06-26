1) Open PostgreSQL

sudo -u postgres psql

2) See Databases

\l

3) Create Database

CREATE DATABASE task_manager;
You should see: CREATE DATABASE

4) Connect to Database

\c task_manager

5) List Tables

\dt

Output:

Did not find any relations because we haven't created any tables yet.

6) Create First Table

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

7) Check Tables

\dt

8) Insert Data

INSERT INTO tasks(title)
VALUES ('Learn PostgreSQL');

9) Read Data

SELECT * FROM tasks;

Output:

 id |       title
----+------------------
  1 | Learn PostgreSQL
 

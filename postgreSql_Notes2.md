1) Step 1 - Open PostgreSQL

sudo -u postgres psql

2) Step 2 - Connect to your database

\c task_manager

3) Step 3 - Show all tables

\dt

4) Step 4 - Show the structure of the user table

\d "user"

5) Step 5 - Show all users

SELECT * FROM "user";
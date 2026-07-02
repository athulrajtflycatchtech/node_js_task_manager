1) Register Flow

A) Simple Flow 

POST /auth/register
      │
      ├── Check duplicate email
      ├── Hash password
      └── Save user


B) Elaborated Flow  

Check email
      │
      ▼
Already exists?
      │
 ┌────┴─────┐
 │          │
Yes         No
 │           │
Throw      Hash Password
409          │
             ▼
         Save User
             │
             ▼
     Return id,name,email


2) Login Flow

A) Simple flow

POST /auth/login
      │
      ├── Find user
      ├── Compare password
      ├── Generate JWT
      └── Return token

B) Elaborated flow 

Find User
    │
    ▼
Found?
    │
 ┌──┴───┐
 │      │
No     Yes
 │      │
401   Compare Password
          │
     ┌────┴────┐
     │         │
   Wrong     Correct
     │         │
    401     Generate JWT
                 │
                 ▼
          Return Token
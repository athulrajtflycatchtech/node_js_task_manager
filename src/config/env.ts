// Why env.ts : It's shorter, cleaner, and if you ever decide to rename a variable, you only change it in one place.

// The ! tells TypeScript: "Trust me, this value exists."
export const env = {
  port: Number(process.env.PORT),
  dbHost: process.env.DB_HOST!,
  dbPort: Number(process.env.DB_PORT),
  dbUser: process.env.DB_USERNAME!,
  dbPassword: process.env.DB_PASSWORD!,
  dbName: process.env.DB_NAME!,
  jwtSecret: process.env.JWT_SECRET!,
};
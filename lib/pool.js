import { Pool } from "pg";

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_DB_NAME,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  port: process.env.NEXT_PUBLIC_DB_PORT,
});

export default pool;

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";



// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL environment variable is required");
// }


const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres.bszouzrifbnexmuukeex:56RsirUPBtlNGKcZ@aws-0-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true",
  ssl: {
    rejectUnauthorized: false, // Set to true in production with a valid certificate
  },
});
pool.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

export const db = drizzle(pool);

